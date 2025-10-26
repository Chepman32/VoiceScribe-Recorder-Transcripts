/**
 * Color Tokens - Semantic Colors with Light/Dark Variants
 * Following iOS Human Interface Guidelines for accessibility
 */

export const LightColors = {
  // Primary Brand Colors
  primary: '#007AFF',
  primaryVariant: '#0051D5',
  primaryLight: '#5DB0FF',

  // Secondary Colors
  secondary: '#5856D6',
  secondaryVariant: '#4140B3',

  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  backgroundTertiary: '#E5E5EA',

  // Surface Colors
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceOverlay: 'rgba(0, 0, 0, 0.4)',

  // Text Colors
  textPrimary: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#8E8E93',
  textDisabled: '#C7C7CC',
  textInverse: '#FFFFFF',

  // Semantic Colors
  success: '#34C759',
  successBackground: '#E8F5E9',
  warning: '#FF9500',
  warningBackground: '#FFF3E0',
  error: '#FF3B30',
  errorBackground: '#FFEBEE',
  info: '#5AC8FA',
  infoBackground: '#E1F5FE',

  // Interactive Elements
  link: '#007AFF',
  linkPressed: '#0051D5',

  // Borders & Separators
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  separator: 'rgba(60, 60, 67, 0.29)',

  // Overlays & Shadows
  shadowColor: '#000000',
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.2)',
  shadowHeavy: 'rgba(0, 0, 0, 0.3)',

  // Recording Specific
  recording: '#FF3B30',
  recordingBackground: 'rgba(255, 59, 48, 0.1)',
  waveform: '#007AFF',
  waveformBackground: 'rgba(0, 122, 255, 0.1)',

  // Gradient Stops
  gradientStart: '#007AFF',
  gradientEnd: '#5856D6',
} as const;

export const DarkColors = {
  // Primary Brand Colors
  primary: '#0A84FF',
  primaryVariant: '#409CFF',
  primaryLight: '#64B5F6',

  // Secondary Colors
  secondary: '#5E5CE6',
  secondaryVariant: '#7D7AFF',

  // Background Colors
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  backgroundTertiary: '#2C2C2E',

  // Surface Colors
  surface: '#1C1C1E',
  surfaceElevated: '#2C2C2E',
  surfaceOverlay: 'rgba(0, 0, 0, 0.6)',

  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#EBEBF5',
  textDisabled: '#48484A',
  textInverse: '#000000',

  // Semantic Colors
  success: '#30D158',
  successBackground: '#1B3A1F',
  warning: '#FF9F0A',
  warningBackground: '#3A2E1F',
  error: '#FF453A',
  errorBackground: '#3A1F1F',
  info: '#64D2FF',
  infoBackground: '#1F2F3A',

  // Interactive Elements
  link: '#0A84FF',
  linkPressed: '#409CFF',

  // Borders & Separators
  border: '#38383A',
  borderLight: '#48484A',
  separator: 'rgba(84, 84, 88, 0.6)',

  // Overlays & Shadows
  shadowColor: '#000000',
  shadowLight: 'rgba(0, 0, 0, 0.3)',
  shadowMedium: 'rgba(0, 0, 0, 0.5)',
  shadowHeavy: 'rgba(0, 0, 0, 0.7)',

  // Recording Specific
  recording: '#FF453A',
  recordingBackground: 'rgba(255, 69, 58, 0.2)',
  waveform: '#0A84FF',
  waveformBackground: 'rgba(10, 132, 255, 0.2)',

  // Gradient Stops
  gradientStart: '#0A84FF',
  gradientEnd: '#5E5CE6',
} as const;

export type ColorTheme = typeof LightColors;
