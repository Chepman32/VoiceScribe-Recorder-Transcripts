/**
 * Animation Utilities
 * Reanimated worklets and animation helpers
 */

import {withSpring, withTiming, Easing, SharedValue} from 'react-native-reanimated';

/**
 * Spring Configuration
 * Physics-based spring animations
 */
export const springConfig = {
  gentle: {
    stiffness: 180,
    damping: 18,
    mass: 1,
    overshootClamping: false,
  },
  default: {
    stiffness: 240,
    damping: 20,
    mass: 1,
    overshootClamping: false,
  },
  snappy: {
    stiffness: 320,
    damping: 22,
    mass: 1,
    overshootClamping: false,
  },
} as const;

/**
 * Timing Configuration
 * Eased timing animations
 */
export const timingConfig = {
  fast: {
    duration: 220,
    easing: Easing.out(Easing.cubic),
  },
  normal: {
    duration: 260,
    easing: Easing.out(Easing.cubic),
  },
  slow: {
    duration: 360,
    easing: Easing.out(Easing.cubic),
  },
} as const;

/**
 * Press Scale Spring
 * Standard press interaction animation
 */
export const animatePressScale = (
  scale: SharedValue<number>,
  pressed: boolean
): void => {
  'worklet';
  scale.value = withSpring(
    pressed ? 0.96 : 1,
    springConfig.default
  );
};

/**
 * Focus Transition
 * Smooth focus state animation
 */
export const animateFocusTransition = (
  opacity: SharedValue<number>,
  scale: SharedValue<number>,
  focused: boolean
): void => {
  'worklet';
  opacity.value = withTiming(focused ? 1 : 0.75, timingConfig.normal);
  scale.value = withSpring(focused ? 1.06 : 1, springConfig.gentle);
};

/**
 * Dismiss Swipe
 * Swipe-to-dismiss gesture animation
 */
export const animateDismissSwipe = (
  translateX: SharedValue<number>,
  opacity: SharedValue<number>,
  dismissed: boolean
): void => {
  'worklet';
  if (dismissed) {
    translateX.value = withTiming(300, timingConfig.fast);
    opacity.value = withTiming(0, timingConfig.fast);
  } else {
    translateX.value = withSpring(0, springConfig.snappy);
    opacity.value = withTiming(1, timingConfig.normal);
  }
};

/**
 * Reveal Fling
 * Fling gesture reveal animation
 */
export const animateRevealFling = (
  translateY: SharedValue<number>,
  opacity: SharedValue<number>,
  revealed: boolean
): void => {
  'worklet';
  translateY.value = withSpring(revealed ? 0 : -50, springConfig.default);
  opacity.value = withTiming(revealed ? 1 : 0, timingConfig.normal);
};

/**
 * Elevation Shadow
 * Animated shadow depth
 */
export const animateElevation = (
  elevation: SharedValue<number>,
  elevated: boolean
): void => {
  'worklet';
  elevation.value = withSpring(elevated ? 8 : 2, springConfig.gentle);
};

/**
 * Card Morph
 * Morph animation for card expand/collapse
 */
export const animateCardMorph = (
  scale: SharedValue<number>,
  borderRadius: SharedValue<number>,
  expanded: boolean
): void => {
  'worklet';
  scale.value = withSpring(expanded ? 1.05 : 1, springConfig.default);
  borderRadius.value = withTiming(expanded ? 24 : 12, timingConfig.normal);
};

/**
 * Parallax Scroll
 * Calculate parallax offset based on scroll position
 */
export const calculateParallax = (
  scrollY: number,
  index: number,
  parallaxFactor: number = 0.5
): number => {
  'worklet';
  return scrollY * index * parallaxFactor;
};

/**
 * Bounce Entrance
 * Bouncy entrance animation
 */
export const animateBounceEntrance = (
  scale: SharedValue<number>,
  opacity: SharedValue<number>
): void => {
  'worklet';
  scale.value = withSpring(1, {
    ...springConfig.default,
    overshootClamping: false,
  });
  opacity.value = withTiming(1, timingConfig.normal);
};

/**
 * Rotate Animation
 * Smooth rotation animation
 */
export const animateRotation = (
  rotation: SharedValue<number>,
  targetDegrees: number
): void => {
  'worklet';
  rotation.value = withSpring(targetDegrees, springConfig.gentle);
};
