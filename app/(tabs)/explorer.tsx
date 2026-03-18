import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useState, useEffect } from 'react';
import { Search, Tag, BookOpen, Calendar, ChevronRight, Star } from 'lucide-react-native';
import DrawerMenu, { type DrawerHandle } from '../../components/DrawerMenu';
import AppHeader from '../../components/AppHeader';
import { useRouter } from 'expo-router';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { PackSyncService } from '../../services/packSyncService';
import { useNaijaStore } from '../../store/useNaijaStore';
import { type Pack } from '@antigravity/content-schema';

const TRENDING_TAGS = ['Niger Delta', 'Nollywood', 'Aso Rock', 'Yoruba Proverbs', 'Lagos Markets'];

export default function ExplorerScreen() {
  const router = useRouter();
  const drawer = useRef<DrawerHandle>(null);
  const [search, setSearch] = useState('');
  const [livePacks, setLivePacks] = useState<any[]>([]);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
      const q = query(collection(db, 'packs'), where('isActive', '==', true));
      const snapshot = await getDocs(q);
      const packs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLivePacks(packs);
    } catch (e) {
      console.error("Error fetching packs:", e);
    }
  };

  const handleDownload = async (pack: any) => {
    if (!pack.downloadUrl) return;
    setSyncing(pack.id);
    const success = await PackSyncService.downloadPack(pack.downloadUrl, pack.id);
    setSyncing(null);
    if (success) {
      // Refresh or notify
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <DrawerMenu ref={drawer} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <AppHeader title="Discover" drawerRef={drawer} showSearch={false} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Search bar */}
          <View style={{ marginHorizontal: 20, marginBottom: 24, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c211e', borderRadius: 14, paddingHorizontal: 16, gap: 12 }}>
            <Search size={18} color="#89938f" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search packs, topics, regions..."
              placeholderTextColor="#89938f"
              style={{ flex: 1, color: '#dfe4e0', paddingVertical: 14, fontSize: 14 }}
            />
          </View>

          {/* Trending Tags */}
          <View style={{ marginBottom: 28, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Tag size={16} color="#e9c349" />
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>Trending Topics</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {TRENDING_TAGS.map(tag => (
                <View key={tag} style={{ backgroundColor: '#1c211e', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}>
                  <Text style={{ color: '#bfc9c4', fontSize: 13, fontWeight: '600' }}>{tag}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Featured Packs */}
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>Live Content</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/boutique')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 12 }}>Boutique</Text>
                <ChevronRight size={14} color="#e9c349" />
              </TouchableOpacity>
            </View>
            {livePacks.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map(pack => (
              <View key={pack.id} style={{ backgroundColor: '#1c211e', borderRadius: 20, overflow: 'hidden', marginBottom: 14 }}>
                <View style={{ padding: 18 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>{pack.title || `Pack ${pack.id}`}</Text>
                    <View style={{ backgroundColor: '#262b29', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                      <Text style={{ color: '#e9c349', fontSize: 10, fontWeight: '700' }}>V{pack.version}</Text>
                    </View>
                  </View>
                  <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18, marginBottom: 16 }}>{pack.questionCount} Questions · {pack.difficulty}</Text>
                  
                  <TouchableOpacity
                    onPress={() => syncing === pack.id ? null : handleDownload(pack)}
                    style={{ backgroundColor: '#59de9b', paddingVertical: 12, borderRadius: 14, alignItems: 'center' }}
                  >
                    <Text style={{ color: '#0f1412', fontWeight: '800', fontSize: 14 }}>
                      {syncing === pack.id ? 'DOWNLOADING...' : 'DOWNLOAD & PLAY'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
