import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

export const isNeonConfigured = Boolean(connectionString && connectionString.startsWith('postgres'));

export const db = isNeonConfigured
  ? drizzle(neon(connectionString!), { schema })
  : null;

export { schema };
