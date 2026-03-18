import { fetchAndActivate, getValue, type RemoteConfig } from "firebase/remote-config";
import { remoteConfig } from "./firebase";

/**
 * Default game balancing parameters
 */
export const REMOTE_CONFIG_DEFAULTS = {
  MAX_SCORE_PER_PACK: 10000,
  MIN_POSSIBLE_SPEED: 20,
  COIN_MULTIPLIER: 1.0,
  DAILY_REWARD_BASE: 500
};

/**
 * Service to manage game balancing via Firebase Remote Config.
 */
export const RemoteConfigService = {
  /**
   * Initialize and fetch config
   */
  async initialize() {
    try {
      remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
      remoteConfig.defaultConfig = REMOTE_CONFIG_DEFAULTS;
      
      await fetchAndActivate(remoteConfig);
      console.log("Remote Config activated.");
    } catch (error) {
      console.error("Failed to fetch Remote Config:", error);
    }
  },

  /**
   * Get a numeric parameter
   */
  getNumber(key: keyof typeof REMOTE_CONFIG_DEFAULTS): number {
    return getValue(remoteConfig, key).asNumber();
  },

  /**
   * Get a boolean parameter (if we add any later)
   */
  getBoolean(key: string): boolean {
    return getValue(remoteConfig, key).asBoolean();
  }
};
