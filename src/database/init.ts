/**
 * Database Initialization and Migrations
 */

import {drizzle} from 'drizzle-orm/expo-sqlite';
import {openDatabaseSync} from 'expo-sqlite/next';
import * as schema from './schema';

const DATABASE_NAME = 'voicescribe.db';
const DATABASE_VERSION = 1;

let dbInstance: ReturnType<typeof drizzle> | null = null;

/**
 * Get or create database instance
 */
export const getDatabase = () => {
  if (!dbInstance) {
    const expoDb = openDatabaseSync(DATABASE_NAME);
    dbInstance = drizzle(expoDb, {schema});
  }
  return dbInstance;
};

/**
 * Initialize database with tables
 */
export const initializeDatabase = async (): Promise<void> => {
  const db = getDatabase();

  try {
    // Create recordings table
    await db.run(`
      CREATE TABLE IF NOT EXISTS recordings (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        duration REAL NOT NULL,
        file_uri TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        format TEXT NOT NULL DEFAULT 'm4a',
        sample_rate INTEGER DEFAULT 44100,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        is_starred INTEGER DEFAULT 0,
        folder TEXT,
        tags TEXT
      )
    `);

    // Create transcripts table
    await db.run(`
      CREATE TABLE IF NOT EXISTS transcripts (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        content TEXT NOT NULL,
        language TEXT DEFAULT 'en',
        confidence REAL,
        is_manually_edited INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      )
    `);

    // Create bookmarks table
    await db.run(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        timestamp REAL NOT NULL,
        title TEXT NOT NULL,
        note TEXT,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      )
    `);

    // Create folders table
    await db.run(`
      CREATE TABLE IF NOT EXISTS folders (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT DEFAULT '#007AFF',
        icon TEXT,
        parent_id TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);

    // Create settings table
    await db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);

    // Create export_history table
    await db.run(`
      CREATE TABLE IF NOT EXISTS export_history (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        format TEXT NOT NULL,
        file_uri TEXT NOT NULL,
        exported_at INTEGER NOT NULL,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      )
    `);

    // Create indexes for better query performance
    await db.run(`
      CREATE INDEX IF NOT EXISTS idx_recordings_created_at
      ON recordings(created_at DESC)
    `);

    await db.run(`
      CREATE INDEX IF NOT EXISTS idx_recordings_folder
      ON recordings(folder)
    `);

    await db.run(`
      CREATE INDEX IF NOT EXISTS idx_transcripts_recording_id
      ON transcripts(recording_id)
    `);

    await db.run(`
      CREATE INDEX IF NOT EXISTS idx_bookmarks_recording_id
      ON bookmarks(recording_id)
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

/**
 * Clear all data (for testing/reset)
 */
export const clearDatabase = async (): Promise<void> => {
  const db = getDatabase();

  try {
    await db.run('DELETE FROM export_history');
    await db.run('DELETE FROM bookmarks');
    await db.run('DELETE FROM transcripts');
    await db.run('DELETE FROM recordings');
    await db.run('DELETE FROM folders');
    await db.run('DELETE FROM settings');

    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Database clear error:', error);
    throw error;
  }
};
