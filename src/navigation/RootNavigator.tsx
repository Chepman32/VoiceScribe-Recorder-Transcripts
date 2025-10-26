/**
 * Root Navigator
 * Main navigation structure with stack and tab navigators
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppTheme} from '../theme';
import type {RootStackParamList, MainTabsParamList} from './types';

// Screens (to be implemented)
import {RecorderScreen} from '../screens/RecorderScreen';
import {LibraryScreen} from '../screens/LibraryScreen';
import {RecordingDetailScreen} from '../screens/RecordingDetailScreen';
import {TranscriptEditorScreen} from '../screens/TranscriptEditorScreen';
import {SettingsScreen} from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();

/**
 * Tab Navigator - Main app tabs
 */
const MainTabs = () => {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: theme.layout.tabBarHeight,
        },
        tabBarLabelStyle: {
          ...theme.typography.caption1,
        },
      }}>
      <Tab.Screen
        name="Recorder"
        component={RecorderScreen}
        options={{
          tabBarLabel: 'Record',
          tabBarIcon: ({color, size}) => {
            // Icon implementation will use Skia
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({color, size}) => {
            // Icon implementation will use Skia
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root Stack Navigator
 */
export const RootNavigator = () => {
  const theme = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          ...theme.typography.title3,
        },
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecordingDetail"
        component={RecordingDetailScreen}
        options={{title: 'Recording'}}
      />
      <Stack.Screen
        name="TranscriptEditor"
        component={TranscriptEditorScreen}
        options={{title: 'Edit Transcript'}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  );
};
