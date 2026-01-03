import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility for React Native
 * Replaces localStorage with AsyncStorage
 */

/**
 * Get an item from storage
 */
export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
}

/**
 * Set an item in storage
 */
export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
  }
}

export const storage = {
  /**
   * Get an item from storage
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  /**
   * Set an item in storage
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  },

  /**
   * Remove an item from storage
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};

// Storage keys constants
export const STORAGE_KEYS = {
  HIGH_SCORE: 'wobbly_highscore',
  COINS: 'wobbly_coins',
  SETTINGS: 'wobbly_settings',
  SKINS: 'wobbly_skins',
  SELECTED_SKIN: 'wobbly_selected_skin',
  AWARDS: 'wobbly_awards',
  OWNED_POWERS: 'wobbly_owned_powers',
};
