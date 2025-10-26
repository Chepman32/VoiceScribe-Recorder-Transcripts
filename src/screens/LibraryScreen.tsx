/**
 * Library Screen
 * Displays list of recordings with search and filter
 */

import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppTheme} from '../theme';
import {useRecordingsStore} from '../store/recordingsStore';
import type {RootStackParamList} from '../navigation/types';
import {Recording} from '../database/schema';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LibraryScreen = () => {
  const theme = useAppTheme();
  const navigation = useNavigation<NavigationProp>();
  const {recordings, isLoading, loadRecordings, toggleStar} = useRecordingsStore();

  useEffect(() => {
    loadRecordings();
  }, []);

  const handleRecordingPress = (recording: Recording) => {
    navigation.navigate('RecordingDetail', {recordingId: recording.id});
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const recordingDate = new Date(date);
    const diffMs = now.getTime() - recordingDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return recordingDate.toLocaleDateString();
  };

  const renderRecordingItem = ({item}: {item: Recording}) => (
    <TouchableOpacity
      style={[styles.recordingItem, {backgroundColor: theme.colors.surface}]}
      onPress={() => handleRecordingPress(item)}>
      <View style={styles.recordingInfo}>
        <Text
          style={[styles.recordingTitle, {color: theme.colors.textPrimary}, theme.typography.body]}
          numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.recordingMeta}>
          <Text
            style={[
              styles.recordingMetaText,
              {color: theme.colors.textSecondary},
              theme.typography.caption1,
            ]}>
            {formatDate(item.createdAt)}
          </Text>
          <Text
            style={[
              styles.recordingMetaText,
              {color: theme.colors.textSecondary},
              theme.typography.caption1,
            ]}>
            {formatDuration(item.duration)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.starButton}
        onPress={() => toggleStar(item.id)}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Text style={{fontSize: 20}}>{item.isStarred ? '⭐' : '☆'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyTitle, {color: theme.colors.textPrimary}, theme.typography.title2]}>
        No Recordings Yet
      </Text>
      <Text
        style={[
          styles.emptyMessage,
          {color: theme.colors.textSecondary},
          theme.typography.body,
        ]}>
        Tap the Record tab to create your first recording
      </Text>
    </View>
  );

  if (isLoading && recordings.length === 0) {
    return (
      <View style={[styles.loadingContainer, {backgroundColor: theme.colors.background}]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.textPrimary}, theme.typography.title1]}>
          Library
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Text style={{fontSize: 24}}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recordings}
        renderItem={renderRecordingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, {backgroundColor: theme.colors.separator}]} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {},
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  recordingInfo: {
    flex: 1,
  },
  recordingTitle: {
    marginBottom: 4,
  },
  recordingMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  recordingMetaText: {},
  starButton: {
    padding: 8,
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  emptyTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
  },
});
