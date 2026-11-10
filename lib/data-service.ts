import fs from 'node:fs';
import path from 'node:path';
import { db, schema, isNeonConfigured } from './db';
import { eq, or } from 'drizzle-orm';
import type { User, NewUser } from './db/schema';

const STORE_PATH = path.join(process.cwd(), 'data', 'db-store.json');

interface LocalStore {
  users: User[];
  circuits: any[];
  labReports: any[];
  chatMessages: any[];
  quizResults: any[];
}

function readLocalStore(): LocalStore {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      const initial: LocalStore = {
        users: [
          {
            id: 'user_student_demo_01',
            email: 'student@asc.edu',
            username: 'student',
            passwordHash: 'e6988849b2521f37e4c63740d58852da0e25413009772c68612ca43015fbe29f:a99d428fa693951f00a5dbeee8b105d1',
            fullName: 'Student Researcher',
            role: 'student',
            rollNumber: 'B001',
            avatarUrl: null,
            createdAt: new Date('2025-01-01'),
            updatedAt: new Date('2025-01-01'),
          },
          {
            id: 'user_instructor_demo_01',
            email: 'instructor@asc.edu',
            username: 'instructor',
            passwordHash: '8b7f7300c3d9804e760be8507b69c4c59a35e36ffcc5ebfae72dc4bbd5140ecb:99a8428fa693951f00a5dbeee8b105e4',
            fullName: 'Prof. S. K. Tiwari (SKT Sir)',
            role: 'instructor',
            rollNumber: 'FAC-PHY-01',
            avatarUrl: null,
            createdAt: new Date('2025-01-01'),
            updatedAt: new Date('2025-01-01'),
          },
        ],
        circuits: [],
        labReports: [],
        chatMessages: [],
        quizResults: [],
      };
      const dir = path.dirname(STORE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading local db-store.json:', e);
    return {
      users: [],
      circuits: [],
      labReports: [],
      chatMessages: [],
      quizResults: [],
    };
  }
}

function writeLocalStore(store: LocalStore) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing local db-store.json:', e);
  }
}

export async function findUserByIdentifier(identifier: string): Promise<User | null> {
  const norm = identifier.trim().toLowerCase();

  if (isNeonConfigured && db) {
    try {
      const results = await db
        .select()
        .from(schema.users)
        .where(
          or(
            eq(schema.users.email, norm),
            eq(schema.users.username, norm)
          )
        )
        .limit(1);

      if (results.length > 0) return results[0];
    } catch (err) {
      console.warn('Neon DB query failed, falling back to local store:', err);
    }
  }

  const store = readLocalStore();
  const found = store.users.find(
    (u) =>
      u.email.toLowerCase() === norm ||
      u.username.toLowerCase() === norm
  );
  return found || null;
}

export async function findUserById(id: string): Promise<User | null> {
  if (isNeonConfigured && db) {
    try {
      const results = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .limit(1);

      if (results.length > 0) return results[0];
    } catch (err) {
      console.warn('Neon DB query failed, falling back to local store:', err);
    }
  }

  const store = readLocalStore();
  return store.users.find((u) => u.id === id) || null;
}

export async function createUser(data: {
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  role?: string;
  rollNumber?: string;
}): Promise<User> {
  const newUser: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    fullName: data.fullName.trim(),
    username: data.username.trim().toLowerCase(),
    email: data.email.trim().toLowerCase(),
    passwordHash: data.passwordHash,
    role: data.role || 'student',
    rollNumber: data.rollNumber || 'B001',
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (isNeonConfigured && db) {
    try {
      await db.insert(schema.users).values(newUser as any);
      return newUser;
    } catch (err) {
      console.warn('Neon DB insert failed, falling back to local store:', err);
    }
  }

  const store = readLocalStore();
  store.users.push(newUser);
  writeLocalStore(store);
  return newUser;
}

export async function saveChatMessage(entry: {
  userId?: string;
  sessionId: string;
  role: string;
  content: string;
  language?: string;
  metadata?: any;
}) {
  if (isNeonConfigured && db) {
    try {
      await db.insert(schema.chatMessages).values(entry as any);
      return;
    } catch (err) {
      console.warn('Neon DB chat insert failed, falling back to local store:', err);
    }
  }

  const store = readLocalStore();
  store.chatMessages.push({
    ...entry,
    id: store.chatMessages.length + 1,
    createdAt: new Date(),
  });
  writeLocalStore(store);
}

export async function getChatHistory(sessionId: string) {
  if (isNeonConfigured && db) {
    try {
      return await db
        .select()
        .from(schema.chatMessages)
        .where(eq(schema.chatMessages.sessionId, sessionId));
    } catch (err) {
      console.warn('Neon DB fetch failed, using local store:', err);
    }
  }

  const store = readLocalStore();
  return store.chatMessages.filter((m) => m.sessionId === sessionId);
}
