/**
 * Transcript Editor Screen
 * Edit and manage recording transcripts
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppTheme} from '../theme';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TranscriptEditor'>;

export const TranscriptEditorScreen: React.FC<Props> = ({route, navigation}) => {
  const theme = useAppTheme();
  const {recordingId} = route.params;
  const [transcript, setTranscript] = useState('');

  const handleSave = () => {
    // Save transcript logic
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.label, {color: theme.colors.textSecondary}, theme.typography.caption1]}>
          TRANSCRIPT
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.textPrimary,
              borderColor: theme.colors.border,
            },
            theme.typography.body,
          ]}
          value={transcript}
          onChangeText={setTranscript}
          placeholder="Enter transcript..."
          placeholderTextColor={theme.colors.textTertiary}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.colors.primary}]}
          onPress={handleSave}>
          <Text style={[styles.buttonText, theme.typography.bodyBold]}>Save</Text>
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
  label: {
    marginBottom: 8,
  },
  input: {
    minHeight: 200,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
