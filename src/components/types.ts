/**
 * Common Component Types
 * Shared prop types and interfaces for component library
 */

import type {ViewStyle, TextStyle, ImageStyle} from 'react-native';

// Common prop types
export type Color = string;
export type Length = number;
export type Angle = number;
export type Opacity = number;
export type ImageUri = string;
export type Icon = string;

export enum ComponentEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

// Gesture types
export type GestureType =
  | 'tap'
  | 'doubleTap'
  | 'longPress'
  | 'pressAndHold'
  | 'pan'
  | 'drag'
  | 'swipe'
  | 'edgeSwipe'
  | 'fling'
  | 'pinch'
  | 'hover'
  | 'scroll';

// Animation worklet types
export type WorkletFunction = (...args: any[]) => void;

export interface AnimationHooks {
  onFocusTransition?: WorkletFunction;
  onPressScaleSpring?: WorkletFunction;
  onDismissSwipe?: WorkletFunction;
  onRevealFling?: WorkletFunction;
}

// Base component props
export interface BaseComponentProps {
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  style?: ViewStyle | TextStyle | ImageStyle;
}

// Skia rendering config
export interface SkiaConfig {
  useVectorIcons?: boolean;
  useElevationShadows?: boolean;
  useGradientFills?: boolean;
  usePathMorph?: boolean;
}

// Component with gestures
export interface GestureComponentProps extends BaseComponentProps {
  gestures?: GestureType[];
  onGestureStart?: () => void;
  onGestureEnd?: () => void;
  onGestureUpdate?: (event: any) => void;
}
