/**
 * Recorder Screen
 * Main recording interface with waveform visualization
 */

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useAppTheme} from '../theme';
import {useRecordingsStore} from '../store/recordingsStore';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const RecorderScreen = () => {
  const theme = useAppTheme();
  const {currentRecording, startRecording, pauseRecording, resumeRecording, stopRecording} =
    useRecordingsStore();

  const [duration, setDuration] = useState(0);
  const recordButtonScale = useSharedValue(1);

  const isRecording = currentRecording?.isRecording && !currentRecording.isPaused;
  const isPaused = currentRecording?.isPaused;

  // Update duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording) {
      interval = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleRecordPress = () => {
    if (!currentRecording) {
      // Start new recording
      startRecording();
      setDuration(0);
      recordButtonScale.value = withSpring(1.1);
    } else if (isPaused) {
      // Resume recording
      resumeRecording();
    } else {
      // Pause recording
      pauseRecording();
    }
  };

  const handleStopPress = async () => {
    await stopRecording();
    setDuration(0);
    recordButtonScale.value = withTiming(1);
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const recordButtonStyle = useAnimatedStyle(() => ({
    transform: [{scale: recordButtonScale.value}],
  }));

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.textPrimary}, theme.typography.title1]}>
          Voice Recorder
        </Text>
      </View>

      {/* Waveform visualization area */}
      <View style={styles.waveformContainer}>
        <View
          style={[
            styles.waveformPlaceholder,
            {backgroundColor: theme.colors.waveformBackground},
          ]}>
          <Text style={[styles.waveformText, {color: theme.colors.textSecondary}]}>
            {isRecording ? 'Recording...' : 'Ready to record'}
          </Text>
        </View>
      </View>

      {/* Duration display */}
      <View style={styles.durationContainer}>
        <Text
          style={[
            styles.duration,
            {color: isRecording ? theme.colors.recording : theme.colors.textPrimary},
            theme.typography.largeTitle,
          ]}>
          {formatDuration(duration)}
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {currentRecording && (
          <TouchableOpacity
            style={[styles.stopButton, {backgroundColor: theme.colors.textTertiary}]}
            onPress={handleStopPress}>
            <View style={styles.stopIcon} />
          </TouchableOpacity>
        )}

        <Animated.View style={recordButtonStyle}>
          <TouchableOpacity
            style={[
              styles.recordButton,
              {
                backgroundColor: isRecording
                  ? theme.colors.recording
                  : isPaused
                  ? theme.colors.warning
                  : theme.colors.primary,
              },
            ]}
            onPress={handleRecordPress}>
            <View
              style={[
                styles.recordInner,
                isPaused && styles.recordInnerPaused,
                {backgroundColor: theme.colors.surface},
              ]}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Placeholder for future bookmark button */}
        <View style={styles.stopButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    textAlign: 'center',
  },
  waveformContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  waveformPlaceholder: {
    width: SCREEN_WIDTH - 48,
    height: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformText: {
    fontSize: 16,
  },
  durationContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  duration: {
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  recordInnerPaused: {
    borderRadius: 4,
  },
  stopButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
});
