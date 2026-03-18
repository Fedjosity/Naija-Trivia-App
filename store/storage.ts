import { MMKV as MMKVClass } from 'react-native-mmkv';

/**
 * Encrypted and high-performance local storage for Naija Trivia.
 * Used for wallet, streaks, and offline pack metadata.
 */
export const storage = new MMKVClass({
  id: 'naija-trivia-storage',
  // In production, we would use an encryption key from the Keystore/Keychain
  // encryptionKey: 'some-secure-key' 
});

/**
 * Type-safe storage keys
 */
export enum StorageKeys {
  USER_STATS = 'user_stats',
  WALLET = 'user_wallet',
  DOWNLOADED_PACKS = 'downloaded_packs',
  CURRENT_STREAK = 'current_streak',
  DAILY_REWARD_LAST_CLAIMED = 'daily_reward_last_claimed',
  PENDING_SCORES = 'pending_scores'
}

/**
 * Standard User Stats Structure
 */
export interface UserStats {
  totalScore: number;
  packsCompleted: number;
  highestStreak: number;
}

/**
 * Wallet Structure
 */
export interface Wallet {
  naijaCoins: number;
  isNaijaGold: boolean;
}

/**
 * Sync status for offline-first gameplay
 */
export interface PackSyncInfo {
  packId: string;
  version: number;
  downloadedAt: string;
  isCompleted: boolean;
}
