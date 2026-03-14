import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';

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
        // Alert.alert("Error", "Could not fetch packs. Ensure Admin Dashboard is running.");
        // Mock data for demo if server is down
        setPacks([
          { id: 'independence', version: '1.0', title: 'Independence Era', downloaded: false },
          { id: 'super-eagles', version: '1.2', title: '90s Super Eagles', downloaded: false },
          { id: 'nollywood', version: '1.1', title: 'Golden Nollywood', downloaded: false },
        ]);
    } finally {
        setLoading(false);
    }
  };

  const downloadPack = async (id: string, url: string) => {
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
      {/* Decorative Glows */}
      <View className="absolute top-[-50] left-[-50] w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
      <View className="absolute bottom-0 right-[-50] w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl" />

      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="p-8 pb-16">
           {/* Header */}
           <View className="flex-row justify-between items-center mb-10">
              <TouchableOpacity onPress={() => router.back()} className="p-2">
                <Text className="text-brand-secondary text-base">←</Text>
              </TouchableOpacity>
              <Text className="font-serif text-2xl text-brand-text">Library</Text>
              <View className="w-10" />
           </View>

           <View className="mb-10">
              <Text className="text-brand-secondary font-bold uppercase text-[10px] tracking-[3px] mb-2">
                Offline Archives
              </Text>
              <Text className="text-brand-muted text-lg leading-relaxed font-serif italic">
                Secure high-fidelity trivia packs for your cultural journey, available whenever you are.
              </Text>
           </View>

           {loading ? (
             <View className="py-20 justify-center items-center">
               <Text className="text-brand-secondary/40 font-serif uppercase tracking-[5px]">Syncing...</Text>
             </View>
           ) : (
               <View className="space-y-6">
                  {packs.map((pack) => (
                      <View key={pack.id} className="bg-brand-surface/40 p-6 rounded-[32px] border border-brand-text/5 flex-row justify-between items-center overflow-hidden">
                          <View className="absolute top-0 left-0 w-2 h-full bg-brand-secondary/20" />
                          <View className="flex-1 ml-2">
                              <Text className="font-serif text-xl text-brand-text mb-1">{pack.title}</Text>
                              <View className="flex-row items-center">
                                <View className="w-1 h-1 rounded-full bg-brand-secondary mr-2" />
                                <Text className="text-[10px] text-brand-muted uppercase tracking-widest">{pack.id} • v{pack.version}</Text>
                              </View>
                          </View>
                          
                          {pack.downloaded ? (
                              <View className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full">
                                  <Text className="text-green-400 text-[10px] font-bold tracking-widest uppercase">Secured</Text>
                              </View>
                          ) : (
                              <TouchableOpacity 
                                onPress={() => downloadPack(pack.id, pack.url as string)}
                                activeOpacity={0.8}
                              >
                                <LinearGradient
                                  colors={['#D4AF37', '#B8860B']}
                                  start={{ x: 0, y: 0 }}
                                  end={{ x: 1, y: 1 }}
                                  className="px-6 py-2 rounded-xl"
                                >
                                  <Text className="text-brand-primary text-[10px] font-bold tracking-widest uppercase">Get</Text>
                                </LinearGradient>
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
