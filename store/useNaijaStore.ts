import { useState, useCallback, useEffect } from 'react';
import { storage, StorageKeys, type UserStats, type Wallet } from './storage';
import { RemoteConfigService } from '../services/remoteConfig';
import { AnalyticsService } from '../services/analytics';

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

  const claimDailyReward = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastClaimed = storage.getString(StorageKeys.DAILY_REWARD_LAST_CLAIMED);
    
    if (lastClaimed === today) return false;

    const reward = RemoteConfigService.getNumber('DAILY_CHALLENGE_REWARD') || 50;
    updateWallet({ naijaCoins: wallet.naijaCoins + reward });
    storage.set(StorageKeys.DAILY_REWARD_LAST_CLAIMED, today);
    return true;
  }, [wallet.naijaCoins, updateWallet]);

  return {
    stats,
    wallet,
    updateStats,
    updateWallet,
    claimDailyReward,
  };
}
