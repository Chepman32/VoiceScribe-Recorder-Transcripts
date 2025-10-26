/**
 * Spacing System - 8pt Grid
 * Consistent spacing scale for layouts
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

/**
 * Border Radius Values
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
} as const;

/**
 * Layout Constants
 */
export const layout = {
  // Hit target sizes (minimum 44pt for iOS)
  minTouchTarget: 44,
  buttonHeight: 48,
  inputHeight: 44,
  headerHeight: 56,
  tabBarHeight: 49,

  // Container widths
  maxContentWidth: 600,
  cardMaxWidth: 400,

  // Icon sizes
  iconXs: 16,
  iconSm: 20,
  iconMd: 24,
  iconLg: 32,
  iconXl: 48,

  // Elevation/Shadow depths
  elevationNone: 0,
  elevationXs: 2,
  elevationSm: 4,
  elevationMd: 8,
  elevationLg: 16,
  elevationXl: 24,
} as const;

/**
 * Animation Timing
 */
export const timing = {
  fastest: 100,
  fast: 200,
  normal: 300,
  slow: 400,
  slowest: 500,
} as const;

/**
 * Z-Index Layers
 */
export const zIndex = {
  background: -1,
  base: 0,
  content: 1,
  elevated: 10,
  dropdown: 100,
  overlay: 1000,
  modal: 2000,
  popover: 3000,
  toast: 4000,
  tooltip: 5000,
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Layout = typeof layout;
