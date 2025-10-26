/**
 * Theme Provider - Light/Dark Mode Management
 */

import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LightColors, DarkColors, ColorTheme} from './colors';
import {typography} from './typography';
import {spacing, borderRadius, layout, timing, zIndex} from './spacing';

type ThemeMode = 'light' | 'dark' | 'auto';

interface Theme {
  colors: ColorTheme;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  layout: typeof layout;
  timing: typeof timing;
  zIndex: typeof zIndex;
  isDark: boolean;
}

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@voicescribe:theme';

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Listen to system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        setThemeModeState(saved as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  // Determine effective color scheme
  const effectiveColorScheme =
    themeMode === 'auto' ? systemColorScheme : themeMode;
  const isDark = effectiveColorScheme === 'dark';

  const theme: Theme = {
    colors: isDark ? DarkColors : LightColors,
    typography,
    spacing,
    borderRadius,
    layout,
    timing,
    zIndex,
    isDark,
  };

  return (
    <ThemeContext.Provider value={{theme, themeMode, setThemeMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Convenience hook for just the theme object
export const useAppTheme = (): Theme => {
  const {theme} = useTheme();
  return theme;
};
