import { Dimensions } from 'react-native';

// Get initial dimensions
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

// Update dimensions on change (for rotation, fold/unfold, etc.)
Dimensions.addEventListener('change', ({ window }) => {
  screenWidth = window.width;
  screenHeight = window.height;
});

// Guideline sizes based on standard device
const guidelineBaseWidth = 375;  // iPhone 11/12/13/14 Pro
const guidelineBaseHeight = 812;

/**
 * Responsive width based on screen percentage
 * @param widthPercent - percentage of screen width (0-100)
 */
export const wp = (widthPercent: number): number => {
  return (screenWidth * widthPercent) / 100;
};

/**
 * Responsive height based on screen percentage
 * @param heightPercent - percentage of screen height (0-100)
 */
export const hp = (heightPercent: number): number => {
  return (screenHeight * heightPercent) / 100;
};

/**
 * Scale size based on screen width
 * Use for consistent sizing across different screen sizes
 */
export const scale = (size: number): number => {
  return (screenWidth / guidelineBaseWidth) * size;
};

/**
 * Scale size based on screen height
 * Use for vertical spacing/sizing
 */
export const verticalScale = (size: number): number => {
  return (screenHeight / guidelineBaseHeight) * size;
};

/**
 * Moderate scale - scales less aggressively
 * Good for font sizes and padding
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Get current screen dimensions
 */
export const getScreenDimensions = () => ({
  width: screenWidth,
  height: screenHeight,
});

/**
 * Check if device is small screen (width < 375)
 */
export const isSmallDevice = (): boolean => {
  return screenWidth < 375;
};

/**
 * Check if device is tablet
 */
export const isTablet = (): boolean => {
  return screenWidth >= 768;
};

/**
 * Get safe responsive font size
 */
export const responsiveFontSize = (size: number): number => {
  if (isSmallDevice()) {
    return moderateScale(size * 0.9);
  }
  if (isTablet()) {
    return moderateScale(size * 1.2);
  }
  return moderateScale(size);
};
