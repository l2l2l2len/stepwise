/**
 * Storage utility with quota handling and error recovery
 * All Stepwise data is stored locally in the browser
 */

const STORAGE_PREFIX = 'stepwise_';

// Storage keys used by the app
export const STORAGE_KEYS = {
  SETTINGS: `${STORAGE_PREFIX}settings`,
  SOLVER_HISTORY: `${STORAGE_PREFIX}solver_history`,
  RECALL_CARDS: `${STORAGE_PREFIX}recall_cards`,
  STREAK: `${STORAGE_PREFIX}streak`,
  ONBOARDING: `${STORAGE_PREFIX}onboarding_complete`,
  FEEDBACK: `${STORAGE_PREFIX}feedback`,
} as const;

// Maximum items to keep in history
const MAX_HISTORY_ITEMS = 20;
const MAX_FEEDBACK_ITEMS = 50;

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get approximate storage usage in bytes
 */
export const getStorageUsage = (): { used: number; available: number; percentage: number } => {
  try {
    let used = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(STORAGE_PREFIX)) {
        used += localStorage[key].length * 2; // UTF-16 = 2 bytes per char
      }
    }
    // Most browsers have 5-10MB limit, assume 5MB
    const available = 5 * 1024 * 1024;
    return {
      used,
      available,
      percentage: (used / available) * 100
    };
  } catch {
    return { used: 0, available: 5 * 1024 * 1024, percentage: 0 };
  }
};

/**
 * Safe localStorage getter with JSON parsing
 */
export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    console.warn(`Failed to parse localStorage item: ${key}`);
    return defaultValue;
  }
};

/**
 * Safe localStorage setter with JSON stringification and quota handling
 */
export const setItem = <T>(key: string, value: T): boolean => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (e) {
    if (e instanceof Error && e.name === 'QuotaExceededError') {
      console.warn('Storage quota exceeded, attempting cleanup...');
      cleanupOldData();
      // Try again after cleanup
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        console.error('Storage quota exceeded even after cleanup');
        return false;
      }
    }
    console.error('Failed to save to localStorage:', e);
    return false;
  }
};

/**
 * Remove an item from localStorage
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Failed to remove localStorage item:', e);
  }
};

/**
 * Clear all Stepwise data from localStorage
 */
export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (e) {
    console.error('Failed to clear localStorage:', e);
  }
};

/**
 * Cleanup old data to free up space
 */
export const cleanupOldData = (): void => {
  try {
    // Trim solver history to half
    const history = getItem<any[]>(STORAGE_KEYS.SOLVER_HISTORY, []);
    if (history.length > MAX_HISTORY_ITEMS / 2) {
      const trimmed = history.slice(0, Math.floor(MAX_HISTORY_ITEMS / 2));
      setItem(STORAGE_KEYS.SOLVER_HISTORY, trimmed);
    }

    // Clear old feedback
    const feedback = getItem<any[]>(STORAGE_KEYS.FEEDBACK, []);
    if (feedback.length > MAX_FEEDBACK_ITEMS / 2) {
      const trimmed = feedback.slice(-Math.floor(MAX_FEEDBACK_ITEMS / 2));
      setItem(STORAGE_KEYS.FEEDBACK, trimmed);
    }

    console.log('Storage cleanup completed');
  } catch (e) {
    console.error('Failed to cleanup storage:', e);
  }
};

/**
 * Add item to history array with automatic trimming
 */
export const addToHistory = <T extends { timestamp?: number }>(
  key: string,
  item: T,
  maxItems: number = MAX_HISTORY_ITEMS,
  dedupeKey?: keyof T
): void => {
  try {
    const history = getItem<T[]>(key, []);

    // Add timestamp if not present
    const itemWithTimestamp = {
      ...item,
      timestamp: item.timestamp || Date.now()
    };

    // Remove duplicates if dedupeKey is provided
    let newHistory: T[];
    if (dedupeKey) {
      newHistory = [
        itemWithTimestamp,
        ...history.filter(h => h[dedupeKey] !== item[dedupeKey])
      ];
    } else {
      newHistory = [itemWithTimestamp, ...history];
    }

    // Trim to max items
    if (newHistory.length > maxItems) {
      newHistory = newHistory.slice(0, maxItems);
    }

    setItem(key, newHistory);
  } catch (e) {
    console.error('Failed to add to history:', e);
  }
};

/**
 * Check storage health and warn user if running low
 */
export const checkStorageHealth = (): { healthy: boolean; message?: string } => {
  if (!isStorageAvailable()) {
    return {
      healthy: false,
      message: 'Local storage is not available. Your progress will not be saved.'
    };
  }

  const usage = getStorageUsage();
  if (usage.percentage > 90) {
    cleanupOldData();
    return {
      healthy: true,
      message: 'Storage is almost full. Old data has been cleaned up.'
    };
  }

  if (usage.percentage > 75) {
    return {
      healthy: true,
      message: 'Storage is getting full. Consider clearing your browser data if issues occur.'
    };
  }

  return { healthy: true };
};
