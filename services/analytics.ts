import { getAnalytics, logEvent, setUserProperties, setUserId } from "firebase/analytics";
import app from "./firebase";

const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

/**
 * Service to manage Firebase Analytics for Naija Trivia.
 * Tracks user engagement and monetization funnels.
 */
export const AnalyticsService = {
  /**
   * Log a custom event
   */
  log(eventName: string, params?: Record<string, any>) {
    if (!analytics) return;
    logEvent(analytics, eventName, params);
  },

  /**
   * Identify user for analytics
   */
  setUser(uid: string, properties?: Record<string, any>) {
    if (!analytics) return;
    setUserId(analytics, uid);
    if (properties) {
      setUserProperties(analytics, properties);
    }
  },

  /**
   * Specialized events for the Trivia funnel
   */
  trackPackStarted(packId: string) {
    this.log('pack_started', { pack_id: packId });
  },

  trackPackCompleted(packId: string, score: number, success: boolean) {
    this.log('pack_completed', { 
      pack_id: packId, 
      score, 
      status: success ? 'success' : 'failed' 
    });
  },

  trackSubscriptionStarted(tier: string) {
    this.log('subscription_started', { tier });
  },

  trackPurchase(itemId: string, price: number, currency: string = 'NGN') {
    this.log('purchase', { item_id: itemId, value: price, currency });
  }
};
