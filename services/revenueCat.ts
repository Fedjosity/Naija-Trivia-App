import Purchases, { type PurchasesPackage, type CustomerInfo } from 'react-native-purchases';
import { Platform } from 'react-native';
import { AnalyticsService } from './analytics';

const RC_API_KEYS = {
  apple: 'goog_placeholder_apple', // To be replaced by User
  google: 'goog_placeholder_google',
};

/**
 * Service to manage In-App Purchases and Subscriptions via RevenueCat.
 */
export const RevenueCatService = {
  /**
   * Initialize the SDK
   */
  async initialize(userId?: string) {
    try {
      if (Platform.OS === 'ios') {
        Purchases.configure({ apiKey: RC_API_KEYS.apple, appUserID: userId });
      } else {
        Purchases.configure({ apiKey: RC_API_KEYS.google, appUserID: userId });
      }
      console.log("RevenueCat initialized.");
    } catch (e) {
      console.error("RevenueCat Init Error:", e);
    }
  },

  /**
   * Get available offerings (Packs, Gold)
   */
  async getOfferings() {
    try {
      const offerings = await Purchases.getOfferings();
      return offerings.current;
    } catch (e) {
      console.error("Error fetching offerings:", e);
      return null;
    }
  },

  /**
   * Purchase a package
   */
  async purchasePackage(pkg: PurchasesPackage): Promise<CustomerInfo | null> {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      
      // Analytics
      if (pkg.product.identifier === 'naija_gold_sub') {
        AnalyticsService.trackSubscriptionStarted('gold');
      } else {
        AnalyticsService.trackPurchase(pkg.product.identifier, pkg.product.price, pkg.product.currencyCode);
      }
      
      return customerInfo;
    } catch (e: any) {
      if (!e.userCancelled) {
        console.error("Purchase Error:", e);
      }
      return null;
    }
  },

  /**
   * Check if user is a Gold member
   */
  async isGoldMember(): Promise<boolean> {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return !!customerInfo.entitlements.active['naija_gold'];
    } catch (e) {
      return false;
    }
  }
};
