/**
 * Navigation Types
 * TypeScript definitions for React Navigation
 */

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';

// Root Stack Navigator
export type RootStackParamList = {
  MainTabs: undefined;
  RecordingDetail: {recordingId: string};
  TranscriptEditor: {recordingId: string};
  Settings: undefined;
  FolderManagement: undefined;
  Export: {recordingId: string};
};

// Tab Navigator
export type MainTabsParamList = {
  Recorder: undefined;
  Library: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabsScreenProps<T extends keyof MainTabsParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabsParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

// Navigation Prop Types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
