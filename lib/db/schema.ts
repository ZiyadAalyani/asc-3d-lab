import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 64 }).primaryKey(),
  email: text('email').notNull().unique(),
  username: varchar('username', { length: 64 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name').notNull(),
  role: varchar('role', { length: 24 }).notNull().default('student'),
  rollNumber: varchar('roll_number', { length: 32 }),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const circuits = pgTable('circuits', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  circuitData: jsonb('circuit_data').notNull(),
  thumbnail: text('thumbnail'),
  isPublic: boolean('is_public').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const labReports = pgTable('lab_reports', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull(),
  userName: text('user_name').notNull(),
  experimentId: varchar('experiment_id', { length: 64 }).notNull(),
  experimentTitle: text('experiment_title').notNull(),
  hypothesis: text('hypothesis'),
  apparatusUsed: text('apparatus_used'),
  observations: jsonb('observations').notNull(),
  calculations: jsonb('calculations'),
  graphData: jsonb('graph_data'),
  conclusion: text('conclusion'),
  grade: varchar('grade', { length: 16 }).default('Pending'),
  instructorFeedback: text('instructor_feedback'),
  status: varchar('status', { length: 24 }).default('submitted').notNull(),
  pdfUrl: text('pdf_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const chatMessages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 64 }),
  sessionId: varchar('session_id', { length: 64 }).notNull(),
  role: varchar('role', { length: 16 }).notNull(),
  content: text('content').notNull(),
  language: varchar('language', { length: 8 }).default('en'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const quizResults = pgTable('quiz_results', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull(),
  topicId: varchar('topic_id', { length: 64 }).notNull(),
  score: integer('score').notNull(),
  totalQuestions: integer('total_questions').notNull(),
  answers: jsonb('answers'),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Circuit = typeof circuits.$inferSelect;
export type LabReport = typeof labReports.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type QuizResult = typeof quizResults.$inferSelect;
