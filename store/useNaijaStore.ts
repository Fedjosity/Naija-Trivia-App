import { useState, useCallback, useEffect } from 'react';
import { storage, StorageKeys, type UserStats, type Wallet } from './storage';

/**
 * Hook to manage user stats and wallet state with persistence
 */
export function useNaijaStore() {
  const [stats, setStats] = useState<UserStats>(() => {
    const raw = storage.getString(StorageKeys.USER_STATS);
    return raw ? JSON.parse(raw) : { totalScore: 0, packsCompleted: 0, highestStreak: 0 };
  });

  const [wallet, setWallet] = useState<Wallet>(() => {
    const raw = storage.getString(StorageKeys.WALLET);
    return raw ? JSON.parse(raw) : { naijaCoins: 0, isNaijaGold: false };
  });

  const updateStats = useCallback((newStats: Partial<UserStats>) => {
    setStats(prev => {
      const updated = { ...prev, ...newStats };
      storage.set(StorageKeys.USER_STATS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateWallet = useCallback((newWallet: Partial<Wallet>) => {
    setWallet(prev => {
      const updated = { ...prev, ...newWallet };
      storage.set(StorageKeys.WALLET, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const refreshSubscriptionStatus = useCallback(async () => {
    const { RevenueCatService } = await import('../services/revenueCat');
    const isGold = await RevenueCatService.isGoldMember();
    updateWallet({ isNaijaGold: isGold });
  }, [updateWallet]);

  // Listen for storage changes if necessary (MMKV supports listeners)
  useEffect(() => {
    refreshSubscriptionStatus();
    const listener = storage.addOnValueChangedListener((key: string) => {
      if (key === StorageKeys.USER_STATS) {
        const raw = storage.getString(key);
        if (raw) setStats(JSON.parse(raw));
      }
      if (key === StorageKeys.WALLET) {
        const raw = storage.getString(key);
        if (raw) setWallet(JSON.parse(raw));
      }
    });
    return () => listener.remove();
  }, []);

  return {
    stats,
    wallet,
    updateStats,
    updateWallet,
  };
}
