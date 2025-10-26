/**
 * Database Schema - SQLite with Drizzle ORM
 * Offline-first data model for recordings and transcripts
 */

import {sqliteTable, text, integer, real} from 'drizzle-orm/sqlite-core';

/**
 * Recordings Table
 * Stores voice recordings metadata and file paths
 */
export const recordings = sqliteTable('recordings', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  duration: real('duration').notNull(), // in seconds
  fileUri: text('file_uri').notNull(),
  fileSize: integer('file_size').notNull(), // in bytes
  format: text('format').notNull().default('m4a'), // m4a, wav, etc.
  sampleRate: integer('sample_rate').default(44100),
  createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp'}).notNull(),
  isStarred: integer('is_starred', {mode: 'boolean'}).default(false),
  folder: text('folder'), // optional folder/category
  tags: text('tags'), // JSON array of tags
});

/**
 * Transcripts Table
 * Stores transcription data for recordings
 */
export const transcripts = sqliteTable('transcripts', {
  id: text('id').primaryKey(),
  recordingId: text('recording_id')
    .notNull()
    .references(() => recordings.id, {onDelete: 'cascade'}),
  content: text('content').notNull(),
  language: text('language').default('en'),
  confidence: real('confidence'), // 0-1 transcription confidence
  isManuallyEdited: integer('is_manually_edited', {mode: 'boolean'}).default(false),
  createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp'}).notNull(),
});

/**
 * Bookmarks Table
 * Time-based bookmarks within recordings
 */
export const bookmarks = sqliteTable('bookmarks', {
  id: text('id').primaryKey(),
  recordingId: text('recording_id')
    .notNull()
    .references(() => recordings.id, {onDelete: 'cascade'}),
  timestamp: real('timestamp').notNull(), // seconds into recording
  title: text('title').notNull(),
  note: text('note'),
  createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
});

/**
 * Folders Table
 * Organizational structure for recordings
 */
export const folders = sqliteTable('folders', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  color: text('color').default('#007AFF'),
  icon: text('icon'),
  parentId: text('parent_id'),
  sortOrder: integer('sort_order').default(0),
  createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp'}).notNull(),
});

/**
 * Settings Table
 * User preferences and app configuration
 */
export const settings = sqliteTable('settings', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp'}).notNull(),
});

/**
 * Export History Table
 * Track exported files
 */
export const exportHistory = sqliteTable('export_history', {
  id: text('id').primaryKey(),
  recordingId: text('recording_id')
    .notNull()
    .references(() => recordings.id, {onDelete: 'cascade'}),
  format: text('format').notNull(), // pdf, markdown, json
  fileUri: text('file_uri').notNull(),
  exportedAt: integer('exported_at', {mode: 'timestamp'}).notNull(),
});

// Type exports
export type Recording = typeof recordings.$inferSelect;
export type NewRecording = typeof recordings.$inferInsert;
export type Transcript = typeof transcripts.$inferSelect;
export type NewTranscript = typeof transcripts.$inferInsert;
export type Bookmark = typeof bookmarks.$inferSelect;
export type NewBookmark = typeof bookmarks.$inferInsert;
export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;
export type ExportHistoryItem = typeof exportHistory.$inferSelect;
export type NewExportHistoryItem = typeof exportHistory.$inferInsert;
