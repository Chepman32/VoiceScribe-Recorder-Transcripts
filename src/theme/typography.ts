/**
 * Typography System - SF Pro Text/Display with Dynamic Type Support
 * Following iOS typography guidelines
 */

import {Platform} from 'react-native';

const fontFamily = Platform.select({
  ios: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  android: {
    regular: 'sans-serif',
    medium: 'sans-serif-medium',
    semibold: 'sans-serif-medium',
    bold: 'sans-serif-bold',
  },
  default: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
});

export const typography = {
  // Display Styles
  largeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.374,
    fontWeight: '700' as const,
  },
  title1: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0.364,
    fontWeight: '700' as const,
  },
  title2: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.352,
    fontWeight: '700' as const,
  },
  title3: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.38,
    fontWeight: '600' as const,
  },

  // Body Styles
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    fontWeight: '400' as const,
  },
  bodyBold: {
    fontFamily: fontFamily.semibold,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    fontWeight: '600' as const,
  },
  callout: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
    fontWeight: '400' as const,
  },
  subheadline: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    fontWeight: '400' as const,
  },

  // Small Text
  footnote: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    fontWeight: '400' as const,
  },
  caption1: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },
  caption2: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.066,
    fontWeight: '400' as const,
  },

  // Monospaced for timestamps
  monospace: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },
} as const;

/**
 * Dynamic Type Multipliers
 * Support for iOS accessibility text sizing
 */
export const dynamicTypeMultipliers = {
  xSmall: 0.85,
  small: 0.92,
  medium: 1.0,
  large: 1.08,
  xLarge: 1.15,
  xxLarge: 1.23,
  xxxLarge: 1.30,
} as const;

export type Typography = typeof typography;
export type TypographyStyle = keyof Typography;
