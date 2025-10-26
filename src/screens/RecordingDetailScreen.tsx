/**
 * Recording Detail Screen
 * Displays recording details and playback controls
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppTheme} from '../theme';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RecordingDetail'>;

export const RecordingDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const theme = useAppTheme();
  const {recordingId} = route.params;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, {color: theme.colors.textPrimary}, theme.typography.title1]}>
          Recording Detail
        </Text>
        <Text
          style={[styles.subtitle, {color: theme.colors.textSecondary}, theme.typography.body]}>
          ID: {recordingId}
        </Text>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.colors.primary}]}
          onPress={() => navigation.navigate('TranscriptEditor', {recordingId})}>
          <Text style={[styles.buttonText, theme.typography.body]}>Edit Transcript</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
