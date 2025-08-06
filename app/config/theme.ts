export const Colors = {
  // Primary Colors
  primary: '#0066cc',

  success: '#28a745',
  error: '#dc3545',
  
  // Background Colors
  gradientColors: {
    start: '#ffffff',
    middle: '#e8f0fe',
    end: '#d4e4fd'
  },
  
  // Component Colors
  componentBg: 'rgba(255, 255, 255, 0.9)',
  text: '#0066cc',
  shadow: '#000000',
}

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 30,
}

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 20,
  circle: 9999, // For circular elements
}

export const Typography = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
}

export const Shadows = {
  default: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
}

export const IconSizes = {
  sm: 24,
  md: 48,
  lg: 64,
}
