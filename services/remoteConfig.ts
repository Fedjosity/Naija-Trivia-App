import { fetchAndActivate, getValue, type RemoteConfig } from "firebase/remote-config";
import { remoteConfig } from "./firebase";

/**
 * Default game balancing parameters
 */
export const REMOTE_CONFIG_DEFAULTS = {
  MAX_SCORE_PER_PACK: 500,
  MIN_POSSIBLE_SPEED: 2.0, // Seconds per question minimum or similar threshold
  COIN_MULTIPLIER: 1.0,
  DAILY_CHALLENGE_REWARD: 50
};

/**
 * Service to manage game balancing via Firebase Remote Config.
 */
export const RemoteConfigService = {
  /**
   * Initialize and fetch config
   */
  async initialize() {
    if (!remoteConfig) return;

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
    if (!remoteConfig) {
      return REMOTE_CONFIG_DEFAULTS[key] as number;
    }
    return getValue(remoteConfig, key).asNumber();
  },

  /**
   * Get a boolean parameter (if we add any later)
   */
  getBoolean(key: string): boolean {
    if (!remoteConfig) {
      return false; // Default to false if we don't have it in defaults
    }
    return getValue(remoteConfig, key).asBoolean();
  }
};
