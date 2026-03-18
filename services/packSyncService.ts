import * as FileSystem from 'expo-file-system';
import { storage, StorageKeys, type PackSyncInfo } from '../store/storage';
import { PackSchema, type Pack } from '@antigravity/content-schema';

const PACKS_DIR = `${FileSystem.documentDirectory}packs/`;

/**
 * Service to manage downloading and local storage of trivia packs.
 */
export const PackSyncService = {
  /**
   * Ensure directory exists
   */
  async ensurePacksDirectory() {
    const dirInfo = await FileSystem.getInfoAsync(PACKS_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(PACKS_DIR, { intermediates: true });
    }
  },

  /**
   * Downloads a pack from a remote URL (Firebase Storage)
   * @param packId The ID of the pack
   * @param version The version string
   * @param downloadUrl The remote URL
   */
  async downloadPack(packId: string, version: string, downloadUrl: string): Promise<boolean> {
    try {
      await this.ensurePacksDirectory();
      const fileUri = `${PACKS_DIR}${packId}.json`;
      
      const { uri } = await FileSystem.downloadAsync(downloadUrl, fileUri);
      
      // Verify content integrity using Zod
      const content = await FileSystem.readAsStringAsync(uri);
      const json = JSON.parse(content);
      
      const validation = PackSchema.safeParse(json);
      if (!validation.success) {
        console.error(`Pack ${packId} validation failed:`, validation.error);
        await FileSystem.deleteAsync(uri);
        return false;
      }

      // Update local manifest in MMKV
      const downloadedPacksRaw = storage.getString(StorageKeys.DOWNLOADED_PACKS);
      const downloadedPacks: PackSyncInfo[] = downloadedPacksRaw ? JSON.parse(downloadedPacksRaw) : [];
      
      const updatedManifest = [
        ...downloadedPacks.filter(p => p.packId !== packId),
        {
          packId,
          version: parseInt(version.split('.').join('')), // Example versioning logic
          downloadedAt: new Date().toISOString(),
          isCompleted: false
        }
      ];
      
      storage.set(StorageKeys.DOWNLOADED_PACKS, JSON.stringify(updatedManifest));
      return true;
    } catch (error) {
      console.error(`Failed to download pack ${packId}:`, error);
      return false;
    }
  },

  /**
   * Retrieves a locally stored pack
   */
  async getLocalPack(packId: string): Promise<Pack | null> {
    try {
      const fileUri = `${PACKS_DIR}${packId}.json`;
      const info = await FileSystem.getInfoAsync(fileUri);
      
      if (!info.exists) return null;
      
      const content = await FileSystem.readAsStringAsync(fileUri);
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error reading local pack ${packId}:`, error);
      return null;
    }
  }
};
