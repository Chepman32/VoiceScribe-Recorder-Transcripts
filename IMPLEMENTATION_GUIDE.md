# VoiceScribe Implementation Guide

## Component Library Implementation Pattern

This guide provides the systematic approach for implementing all 70 components in the catalog.

### Component Template

Each component follows this standardized structure:

```typescript
/**
 * Component X.Y
 * Brief description
 *
 * Props: [list 8 props with types]
 * Gestures: [list gestures]
 * Animation hooks: [list worklets]
 * Skia: [list rendering features]
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Canvas, /* Skia components */} from '@shopify/react-native-skia';
import {useAppTheme} from '../theme';
import type {ComponentProps} from './types';

interface Component_X_Y_Props extends BaseComponentProps {
  prop1: Type1;
  prop2: Type2;
  prop3: Type3;
  prop4: Type4;
  prop5: Type5;
  prop6: Type6;
  prop7: Type7;
  prop8: Type8;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const Component_X_Y: React.FC<Component_X_Y_Props> = ({
  prop1,
  prop2,
  prop3,
  prop4,
  prop5,
  prop6,
  prop7,
  prop8,
  onPress,
  accessible = true,
  accessibilityLabel = 'Component description',
  accessibilityHint,
  style,
}) => {
  const theme = useAppTheme();

  // Shared values for animations
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  // Gesture setup
  const tapGesture = Gesture.Tap()
    .onStart(() => {
      'worklet';
      // Animation logic
    })
    .onEnd(() => {
      'worklet';
      // Animation logic
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      'worklet';
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      'worklet';
      // Reset or commit gesture
    });

  // Combine gestures as needed
  const composedGestures = Gesture.Simultaneous(tapGesture, panGesture);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translateX.value},
      {translateY: translateY.value},
      {rotate: `${rotation.value}deg`},
    ],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={composedGestures}>
      <Animated.View
        style={[styles.container, animatedStyle, style]}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button">
        <Canvas style={styles.canvas}>
          {/* Skia rendering here */}
        </Canvas>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    // Base styles
  },
  canvas: {
    flex: 1,
  },
});
```

## Gesture Implementation Guide

### Gesture Types and Implementation

#### 1. Tap
```typescript
const tapGesture = Gesture.Tap()
  .onStart(() => {
    'worklet';
    scale.value = withSpring(0.96);
  })
  .onEnd(() => {
    'worklet';
    scale.value = withSpring(1);
    runOnJS(onPress)();
  });
```

#### 2. Double Tap
```typescript
const doubleTapGesture = Gesture.Tap()
  .numberOfTaps(2)
  .onStart(() => {
    'worklet';
    // Double tap animation
  });
```

#### 3. Long Press
```typescript
const longPressGesture = Gesture.LongPress()
  .minDuration(500)
  .onStart(() => {
    'worklet';
    // Long press feedback
  });
```

#### 4. Pan / Drag
```typescript
const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    'worklet';
    translateX.value = event.translationX;
    translateY.value = event.translationY;
  })
  .onEnd((event) => {
    'worklet';
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  });
```

#### 5. Fling
```typescript
const flingGesture = Gesture.Fling()
  .direction(Directions.RIGHT)
  .onStart(() => {
    'worklet';
    // Fling animation
    translateX.value = withTiming(300);
    opacity.value = withTiming(0);
  });
```

#### 6. Pinch
```typescript
const pinchGesture = Gesture.Pinch()
  .onUpdate((event) => {
    'worklet';
    scale.value = event.scale;
  })
  .onEnd(() => {
    'worklet';
    scale.value = withSpring(1);
  });
```

## Motion Specification Implementation

All motion specifications follow this pattern (examples 1-1 through 1-10):

```typescript
/**
 * Motion Worklet
 * Duration: 220–360ms (eased); spring stiffness 180–320, damping 14–22
 */
const animateMotion = (
  sharedValue: SharedValue<number>,
  target: number
) => {
  'worklet';
  // Spring animation
  sharedValue.value = withSpring(target, {
    stiffness: 240,
    damping: 18,
    mass: 1,
    overshootClamping: false,
  });

  // OR Timing animation
  sharedValue.value = withTiming(target, {
    duration: 260,
    easing: Easing.out(Easing.cubic),
  });
};

// Usage in gesture handler
const gesture = Gesture.Tap()
  .onStart(() => {
    'worklet';
    animateMotion(scale, 1.06);
    animateMotion(translateY, -8);
    animateMotion(opacity, 1);
  })
  .onEnd(() => {
    'worklet';
    animateMotion(scale, 1);
    animateMotion(translateY, 0);
    animateMotion(opacity, 0.75);
  });
```

## Skia Rendering Patterns

### Vector Icons
```typescript
import {Canvas, Path} from '@shopify/react-native-skia';

<Canvas style={styles.canvas}>
  <Path
    path="M10 10 L90 10 L50 90 Z"
    color={theme.colors.primary}
  />
</Canvas>
```

### Elevation Shadows
```typescript
import {Canvas, RoundedRect, Shadow} from '@shopify/react-native-skia';

<Canvas style={styles.canvas}>
  <RoundedRect x={0} y={0} width={200} height={100} r={12}>
    <Shadow
      dx={0}
      dy={elevation.value}
      blur={8}
      color="rgba(0, 0, 0, 0.3)"
    />
  </RoundedRect>
</Canvas>
```

### Gradient Fills
```typescript
import {Canvas, Rect, LinearGradient, vec} from '@shopify/react-native-skia';

<Canvas style={styles.canvas}>
  <Rect x={0} y={0} width={200} height={100}>
    <LinearGradient
      start={vec(0, 0)}
      end={vec(200, 100)}
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
    />
  </Rect>
</Canvas>
```

### Path Morph
```typescript
import {Canvas, Path, interpolatePath} from '@shopify/react-native-skia';

const path1 = "M10 10 L90 10 L50 90 Z";
const path2 = "M50 10 L90 50 L50 90 L10 50 Z";

const animatedPath = useSharedValue(path1);

// In animation
animatedPath.value = interpolatePath(progress.value, [0, 1], [path1, path2]);
```

## Prop Type Mappings

### Type Definitions
```typescript
// angle: number (0-360 degrees)
type Angle = number;

// color: string (hex, rgb, rgba)
type Color = string;

// opacity: number (0-1)
type Opacity = number;

// length: number (pixels)
type Length = number;

// string: string
type StringProp = string;

// boolean: boolean
type BooleanProp = boolean;

// number: number
type NumberProp = number;

// imageUri: string (file path or URI)
type ImageUri = string;

// icon: string (icon identifier)
type Icon = string;

// enum: one of predefined values
enum ComponentEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  // ...
}
```

## Accessibility Implementation

### Required Accessibility Props
```typescript
interface AccessibleComponentProps {
  // Descriptive label for VoiceOver
  accessibilityLabel: string;

  // Hint for usage
  accessibilityHint?: string;

  // Semantic role
  accessibilityRole?: 'button' | 'text' | 'image' | 'header';

  // Accessibility traits (iOS)
  accessibilityTraits?: string | string[];

  // State announcement
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
  };

  // Custom actions
  accessibilityActions?: Array<{name: string; label: string}>;
}
```

### Dynamic Type Support
```typescript
import {useAppTheme, dynamicTypeMultipliers} from '../theme';
import {useAccessibilityInfo} from 'react-native';

const Component = () => {
  const theme = useAppTheme();
  const [textScale] = useAccessibilityInfo().textScale;

  const fontSize = theme.typography.body.fontSize * textScale;

  return <Text style={{fontSize}}>{content}</Text>;
};
```

## Component Index

Create `src/components/index.ts` to export all components:

```typescript
/**
 * Component Library Exports
 */

// Components 1.1-1.20
export {Component_1_1} from './Component_1_1';
export {Component_1_2} from './Component_1_2';
// ... through Component_1_20

// Components 1.21-1.40
export {Component_1_21} from './Component_1_21';
// ... through Component_1_40

// Components 1.41-1.60
export {Component_1_41} from './Component_1_41';
// ... through Component_1_60

// Components 1.61-1.70
export {Component_1_61} from './Component_1_61';
// ... through Component_1_70

// Types
export * from './types';
```

## Testing Pattern

### Component Test Template
```typescript
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Component_X_Y} from './Component_X_Y';

describe('Component_X_Y', () => {
  const defaultProps = {
    prop1: 0,
    prop2: '#007AFF',
    prop3: 1,
    prop4: 'test',
    prop5: 1,
    prop6: ComponentEnum.Primary,
    prop7: '#FFFFFF',
    prop8: 'value',
  };

  it('renders correctly', () => {
    const {getByLabelText} = render(<Component_X_Y {...defaultProps} />);
    expect(getByLabelText('Component description')).toBeTruthy();
  });

  it('handles press gesture', () => {
    const onPress = jest.fn();
    const {getByLabelText} = render(
      <Component_X_Y {...defaultProps} onPress={onPress} />
    );

    fireEvent.press(getByLabelText('Component description'));
    expect(onPress).toHaveBeenCalled();
  });

  it('applies animations on gesture', async () => {
    // Test animation behavior
  });

  it('supports accessibility', () => {
    const {getByLabelText} = render(
      <Component_X_Y
        {...defaultProps}
        accessibilityLabel="Custom label"
        accessibilityHint="Custom hint"
      />
    );

    const component = getByLabelText('Custom label');
    expect(component).toBeTruthy();
  });
});
```

## Performance Optimization

### Memoization
```typescript
import {memo} from 'react';

export const Component_X_Y = memo<Component_X_Y_Props>(
  ({prop1, prop2, ...props}) => {
    // Component implementation
  },
  (prevProps, nextProps) => {
    // Custom comparison logic
    return prevProps.prop1 === nextProps.prop1;
  }
);
```

### Lazy Loading
```typescript
import {lazy, Suspense} from 'react';

const Component_X_Y = lazy(() => import('./Component_X_Y'));

// Usage
<Suspense fallback={<LoadingSpinner />}>
  <Component_X_Y {...props} />
</Suspense>
```

## Next Steps

1. **Implement remaining components** (1.2-1.70) using the template above
2. **Add comprehensive tests** for each component
3. **Create Storybook stories** for component showcase
4. **Document component usage** in individual README files
5. **Optimize performance** with profiling and memoization
6. **Add E2E tests** for critical component interactions

## Resources

- [Reanimated Documentation](https://docs.swmansion.com/react-native-reanimated/)
- [Gesture Handler Documentation](https://docs.swmansion.com/react-native-gesture-handler/)
- [Skia Documentation](https://shopify.github.io/react-native-skia/)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)

---

This implementation guide ensures consistency and quality across all 70 components in the catalog.
