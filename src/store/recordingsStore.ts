/**
 * Recordings Store - Zustand
 * Manages recordings state and operations
 */

import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {Recording} from '../database/schema';
import {recordingsRepository} from '../database/repositories/RecordingsRepository';

interface RecordingState {
  id: string;
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  startTime: number | null;
}

interface RecordingsStore {
  // State
  recordings: Recording[];
  currentRecording: RecordingState | null;
  selectedRecordingId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadRecordings: () => Promise<void>;
  addRecording: (recording: Recording) => void;
  updateRecording: (id: string, updates: Partial<Recording>) => Promise<void>;
  deleteRecording: (id: string) => Promise<void>;
  toggleStar: (id: string) => Promise<void>;
  selectRecording: (id: string | null) => void;

  // Recording control
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => Promise<Recording | null>;
  updateRecordingDuration: (duration: number) => void;

  // Filters
  searchRecordings: (query: string) => Promise<void>;
  filterByFolder: (folder: string | null) => Promise<void>;
  getStarredRecordings: () => Promise<void>;

  // Utility
  clearError: () => void;
}

export const useRecordingsStore = create<RecordingsStore>()(
  immer((set, get) => ({
    // Initial state
    recordings: [],
    currentRecording: null,
    selectedRecordingId: null,
    isLoading: false,
    error: null,

    // Load recordings from database
    loadRecordings: async () => {
      set({isLoading: true, error: null});
      try {
        const recordings = await recordingsRepository.getAll();
        set({recordings, isLoading: false});
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to load recordings',
          isLoading: false,
        });
      }
    },

    // Add new recording
    addRecording: (recording) => {
      set((state) => {
        state.recordings.unshift(recording);
      });
    },

    // Update recording
    updateRecording: async (id, updates) => {
      try {
        await recordingsRepository.update(id, updates);
        set((state) => {
          const index = state.recordings.findIndex((r) => r.id === id);
          if (index !== -1) {
            state.recordings[index] = {...state.recordings[index], ...updates};
          }
        });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to update recording',
        });
      }
    },

    // Delete recording
    deleteRecording: async (id) => {
      try {
        await recordingsRepository.delete(id);
        set((state) => {
          state.recordings = state.recordings.filter((r) => r.id !== id);
          if (state.selectedRecordingId === id) {
            state.selectedRecordingId = null;
          }
        });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to delete recording',
        });
      }
    },

    // Toggle starred status
    toggleStar: async (id) => {
      try {
        await recordingsRepository.toggleStar(id);
        set((state) => {
          const recording = state.recordings.find((r) => r.id === id);
          if (recording) {
            recording.isStarred = !recording.isStarred;
          }
        });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to toggle star',
        });
      }
    },

    // Select recording
    selectRecording: (id) => {
      set({selectedRecordingId: id});
    },

    // Start recording
    startRecording: () => {
      set({
        currentRecording: {
          id: '',
          isRecording: true,
          isPaused: false,
          duration: 0,
          startTime: Date.now(),
        },
      });
    },

    // Pause recording
    pauseRecording: () => {
      set((state) => {
        if (state.currentRecording) {
          state.currentRecording.isPaused = true;
        }
      });
    },

    // Resume recording
    resumeRecording: () => {
      set((state) => {
        if (state.currentRecording) {
          state.currentRecording.isPaused = false;
        }
      });
    },

    // Stop recording
    stopRecording: async () => {
      const current = get().currentRecording;
      set({currentRecording: null});
      return null; // Recording creation handled by RecorderScreen
    },

    // Update recording duration
    updateRecordingDuration: (duration) => {
      set((state) => {
        if (state.currentRecording) {
          state.currentRecording.duration = duration;
        }
      });
    },

    // Search recordings
    searchRecordings: async (query) => {
      set({isLoading: true, error: null});
      try {
        const recordings = await recordingsRepository.search(query);
        set({recordings, isLoading: false});
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to search recordings',
          isLoading: false,
        });
      }
    },

    // Filter by folder
    filterByFolder: async (folder) => {
      set({isLoading: true, error: null});
      try {
        const recordings = await recordingsRepository.getByFolder(folder);
        set({recordings, isLoading: false});
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to filter recordings',
          isLoading: false,
        });
      }
    },

    // Get starred recordings
    getStarredRecordings: async () => {
      set({isLoading: true, error: null});
      try {
        const recordings = await recordingsRepository.getStarred();
        set({recordings, isLoading: false});
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to load starred recordings',
          isLoading: false,
        });
      }
    },

    // Clear error
    clearError: () => {
      set({error: null});
    },
  }))
);
