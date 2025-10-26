/**
 * Recordings Repository
 * Database operations for recordings
 */

import {eq, desc, like, and} from 'drizzle-orm';
import {getDatabase} from '../init';
import {recordings, Recording, NewRecording} from '../schema';
import {v4 as uuidv4} from 'uuid';

export class RecordingsRepository {
  private db = getDatabase();

  /**
   * Create a new recording
   */
  async create(data: Omit<NewRecording, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recording> {
    const now = new Date();
    const recording: NewRecording = {
      id: uuidv4(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    await this.db.insert(recordings).values(recording);
    return recording as Recording;
  }

  /**
   * Get recording by ID
   */
  async getById(id: string): Promise<Recording | undefined> {
    const result = await this.db
      .select()
      .from(recordings)
      .where(eq(recordings.id, id))
      .limit(1);

    return result[0];
  }

  /**
   * Get all recordings, sorted by creation date
   */
  async getAll(limit?: number): Promise<Recording[]> {
    let query = this.db.select().from(recordings).orderBy(desc(recordings.createdAt));

    if (limit) {
      query = query.limit(limit);
    }

    return query;
  }

  /**
   * Get recordings by folder
   */
  async getByFolder(folder: string | null): Promise<Recording[]> {
    return this.db
      .select()
      .from(recordings)
      .where(eq(recordings.folder, folder))
      .orderBy(desc(recordings.createdAt));
  }

  /**
   * Get starred recordings
   */
  async getStarred(): Promise<Recording[]> {
    return this.db
      .select()
      .from(recordings)
      .where(eq(recordings.isStarred, true))
      .orderBy(desc(recordings.createdAt));
  }

  /**
   * Search recordings by title
   */
  async search(query: string): Promise<Recording[]> {
    return this.db
      .select()
      .from(recordings)
      .where(like(recordings.title, `%${query}%`))
      .orderBy(desc(recordings.createdAt));
  }

  /**
   * Update recording
   */
  async update(id: string, data: Partial<Omit<Recording, 'id' | 'createdAt'>>): Promise<void> {
    await this.db
      .update(recordings)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(recordings.id, id));
  }

  /**
   * Toggle starred status
   */
  async toggleStar(id: string): Promise<void> {
    const recording = await this.getById(id);
    if (recording) {
      await this.update(id, {isStarred: !recording.isStarred});
    }
  }

  /**
   * Delete recording
   */
  async delete(id: string): Promise<void> {
    await this.db.delete(recordings).where(eq(recordings.id, id));
  }

  /**
   * Get total duration of all recordings
   */
  async getTotalDuration(): Promise<number> {
    const result = await this.db.select().from(recordings);
    return result.reduce((sum, r) => sum + r.duration, 0);
  }

  /**
   * Get total storage used by recordings
   */
  async getTotalSize(): Promise<number> {
    const result = await this.db.select().from(recordings);
    return result.reduce((sum, r) => sum + r.fileSize, 0);
  }

  /**
   * Get recording count
   */
  async getCount(): Promise<number> {
    const result = await this.db.select().from(recordings);
    return result.length;
  }
}

// Singleton instance
export const recordingsRepository = new RecordingsRepository();
