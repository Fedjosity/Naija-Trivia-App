import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

type Pack = {
  id: string;
  version: string;
  title: string;
  size?: string;
  url?: string;
  downloaded: boolean;
};

// Dev: using localhost for simulator. On real device need local IP.
const API_URL = 'http://localhost:3000/api/packs';

export default function PacksScreen() {
  const router = useRouter();
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // Merge with local state to keep 'downloaded' status
        setPacks(data.packs.map((p: any) => ({ ...p, downloaded: false })));
    } catch (e) {
        Alert.alert("Error", "Could not fetch packs. Ensure Admin Dashboard is running.");
    } finally {
        setLoading(false);
    }
  };

  const downloadPack = async (id: string, url: string) => {
      // In real app, we would download the JSON from 'url' here
      try {
          const res = await fetch(`http://localhost:3000${url}`);
          const packData = await res.json();
          
          if (!(FileSystem as any).documentDirectory) throw new Error('No FS');
          const fileUri = `${(FileSystem as any).documentDirectory}${id}.json`;
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(packData));
          
          setPacks(current => current.map(p => {
            if (p.id === id) return { ...p, downloaded: true };
            return p;
        }));
        Alert.alert("Success", "Pack downloaded for offline use!");
      } catch (e) {
           Alert.alert("Error", "Failed to download pack.");
      }
  };

  return (
    <View className="flex-1 bg-brand-background">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="p-6">
           {/* Header */}
           <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-brand-secondary">← Back</Text>
              </TouchableOpacity>
              <Text className="font-serif text-xl font-bold text-brand-secondary">Offline Packs</Text>
              <View className="w-10" />
           </View>

           <Text className="text-gray-500 mb-6">
             Download trivia packs to play without an internet connection.
           </Text>

           {loading ? <Text>Loading...</Text> : (
               <View className="space-y-4">
                  {packs.map((pack) => (
                      <View key={pack.id} className="bg-white p-4 rounded-xl border border-brand-secondary/10 flex-row justify-between items-center">
                          <View>
                              <Text className="font-bold text-lg text-brand-secondary">{pack.title}</Text>
                              <Text className="text-xs text-gray-400 uppercase">{pack.id} • {pack.version}</Text>
                          </View>
                          
                          {pack.downloaded ? (
                              <View className="bg-green-100 px-3 py-1 rounded-full">
                                  <Text className="text-green-700 text-xs font-bold">INSTALLED</Text>
                              </View>
                          ) : (
                              <TouchableOpacity 
                                className="bg-brand-primary px-4 py-2 rounded-lg"
                                onPress={() => downloadPack(pack.id, pack.url as string)}
                              >
                                  <Text className="text-white text-xs font-bold">GET</Text>
                              </TouchableOpacity>
                          )}
                      </View>
                  ))}
               </View>
           )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
