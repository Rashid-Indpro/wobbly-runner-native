import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility for React Native (SDK 54 Compatible)
 * Updated for AsyncStorage 2.0 with improved error handling
 */

interface StorageError extends Error {
  code?: string;
}

/**
 * Get an item from storage
 */
export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    const err = error as StorageError;
    console.error(`Error getting item ${key}:`, err.message);
    // In SDK 54, check for specific error codes
    if (err.code === 'ENOENT') {
      return null; // Key doesn't exist
    }
    return null;
  }
}

/**
 * Set an item in storage
 */
export async function setItem<T>(key: string, value: T): Promise<boolean> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    const err = error as StorageError;
    console.error(`Error setting item ${key}:`, err.message);
    // Handle quota exceeded errors in SDK 54
    if (err.code === 'QuotaExceededError') {
      console.warn('Storage quota exceeded. Consider clearing old data.');
    }
    return false;
  }
}

export const storage = {
  /**
   * Get an item from storage
   */
  async getItem<T>(key: string): Promise<T | null> {
    return getItem<T>(key);
  },

  /**
   * Set an item in storage
   */
  async setItem<T>(key: string, value: T): Promise<boolean> {
    return setItem<T>(key, value);
  },

  /**
   * Remove an item from storage
   */
  async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      const err = error as StorageError;
      console.error(`Error removing item ${key}:`, err.message);
      return false;
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      const err = error as StorageError;
      console.error('Error clearing storage:', err.message);
      return false;
    }
  },

  /**
   * Get all keys in storage (SDK 54 feature)
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },

  /**
   * Get multiple items at once (SDK 54 optimization)
   */
  async multiGet(keys: string[]): Promise<Record<string, any>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, any> = {};
      pairs.forEach(([key, value]) => {
        if (value !== null) {
          try {
            result[key] = JSON.parse(value);
          } catch {
            result[key] = value;
          }
        }
      });
      return result;
    } catch (error) {
      console.error('Error in multiGet:', error);
      return {};
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
