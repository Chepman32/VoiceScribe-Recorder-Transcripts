/**
 * Component 1.1
 * Interactive component with gesture support, animations, and Skia rendering
 *
 * Props:
 * - prop1: angle
 * - prop2: color
 * - prop3: opacity
 * - prop4: string
 * - prop5: opacity
 * - prop6: enum
 * - prop7: color
 * - prop8: string
 *
 * Gestures: fling, hover, doubleTap
 * Animation hooks: onFocusTransition, onPressScaleSpring, onDismissSwipe, onRevealFling
 * Skia: vector icons, elevation shadows, gradient fills, path morph
 */

import React, {useCallback} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  FlingGestureHandler,
  State,
  TapGestureHandlerGestureEvent,
  FlingGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Canvas, RoundedRect, LinearGradient, vec, Shadow} from '@shopify/react-native-skia';
import {useAppTheme} from '../theme';
import {
  animateFocusTransition,
  animatePressScale,
  animateDismissSwipe,
  animateRevealFling,
  springConfig,
  timingConfig,
} from '../utils/animations';
import type {
  Angle,
  Color,
  Opacity,
  ComponentEnum,
  BaseComponentProps,
} from './types';

interface Component_1_1_Props extends BaseComponentProps {
  prop1: Angle;
  prop2: Color;
  prop3: Opacity;
  prop4: string;
  prop5: Opacity;
  prop6: ComponentEnum;
  prop7: Color;
  prop8: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
}

export const Component_1_1: React.FC<Component_1_1_Props> = ({
  prop1,
  prop2,
  prop3,
  prop4,
  prop5,
  prop6,
  prop7,
  prop8,
  onPress,
  onDoubleTap,
  accessible = true,
  accessibilityLabel = 'Interactive component',
  accessibilityHint,
  style,
}) => {
  const theme = useAppTheme();

  // Shared values for animations
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(prop1);
  const elevation = useSharedValue(2);

  // Double tap handler
  const handleDoubleTap = useCallback(
    (event: TapGestureHandlerGestureEvent) => {
      'worklet';
      if (event.nativeEvent.state === State.ACTIVE) {
        // onPressScaleSpring worklet
        animatePressScale(scale, true);
        setTimeout(() => {
          animatePressScale(scale, false);
          onDoubleTap?.();
        }, 200);
      }
    },
    [onDoubleTap]
  );

  // Fling handler for dismiss
  const handleFling = useCallback((event: FlingGestureHandlerGestureEvent) => {
    'worklet';
    if (event.nativeEvent.state === State.ACTIVE) {
      // onDismissSwipe worklet
      animateDismissSwipe(translateX, opacity, true);
    }
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value},
        {translateX: translateX.value},
        {translateY: translateY.value},
        {rotate: `${rotation.value}deg`},
      ],
      opacity: opacity.value * prop3,
    };
  });

  return (
    <FlingGestureHandler onHandlerStateChange={handleFling}>
      <TapGestureHandler onHandlerStateChange={handleDoubleTap} numberOfTaps={2}>
        <Animated.View
          style={[styles.container, animatedStyle, style]}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityRole="button">
          {/* Skia Canvas for custom rendering */}
          <Canvas style={styles.canvas}>
            {/* Rounded rectangle with gradient and shadow */}
            <RoundedRect x={0} y={0} width={200} height={100} r={12}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(200, 100)}
                colors={[prop2, prop7]}
              />
              <Shadow dx={0} dy={elevation.value} blur={8} color="rgba(0,0,0,0.3)" />
            </RoundedRect>
          </Canvas>
        </Animated.View>
      </TapGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
  },
  canvas: {
    flex: 1,
  },
});
