/**
 * Settings Screen
 * App preferences and configuration
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppTheme, useTheme} from '../theme';

export const SettingsScreen = () => {
  const theme = useAppTheme();
  const {themeMode, setThemeMode} = useTheme();

  const handleThemeToggle = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: theme.colors.textSecondary},
              theme.typography.caption1,
            ]}>
            APPEARANCE
          </Text>

          <View style={[styles.settingItem, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, {color: theme.colors.textPrimary}]}>
                Dark Mode
              </Text>
              <Text style={[styles.settingDescription, {color: theme.colors.textSecondary}]}>
                Current: {themeMode}
              </Text>
            </View>
            <Switch
              value={themeMode === 'dark'}
              onValueChange={handleThemeToggle}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
            />
          </View>
        </View>

        {/* Recording Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: theme.colors.textSecondary},
              theme.typography.caption1,
            ]}>
            RECORDING
          </Text>

          <TouchableOpacity style={[styles.settingItem, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, {color: theme.colors.textPrimary}]}>
                Audio Quality
              </Text>
              <Text style={[styles.settingDescription, {color: theme.colors.textSecondary}]}>
                High (44.1 kHz)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, {color: theme.colors.textPrimary}]}>
                File Format
              </Text>
              <Text style={[styles.settingDescription, {color: theme.colors.textSecondary}]}>
                M4A
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Storage Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: theme.colors.textSecondary},
              theme.typography.caption1,
            ]}>
            STORAGE
          </Text>

          <View style={[styles.settingItem, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, {color: theme.colors.textPrimary}]}>
                Total Recordings
              </Text>
              <Text style={[styles.settingDescription, {color: theme.colors.textSecondary}]}>
                0 recordings
              </Text>
            </View>
          </View>

          <View style={[styles.settingItem, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, {color: theme.colors.textPrimary}]}>
                Storage Used
              </Text>
              <Text style={[styles.settingDescription, {color: theme.colors.textSecondary}]}>
                0 MB
              </Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: theme.colors.textSecondary},
              theme.typography.caption1,
            ]}>
            ABOUT
          </Text>

          <TouchableOpacity style={[styles.settingItem, {backgroundColor: theme.colors.surface}]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, {color: theme.colors.textPrimary}]}>Version</Text>
              <Text style={[styles.settingDescription, {color: theme.colors.textSecondary}]}>
                1.0.0
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 16,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
});
