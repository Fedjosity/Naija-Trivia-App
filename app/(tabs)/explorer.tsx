import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import { Search, Tag, BookOpen, Calendar, ChevronRight, Star } from 'lucide-react-native';
import DrawerMenu, { type DrawerHandle } from '../../components/DrawerMenu';
import AppHeader from '../../components/AppHeader';
import { useRouter } from 'expo-router';

const TRENDING_TAGS = ['Niger Delta', 'Nollywood', 'Aso Rock', 'Yoruba Proverbs', 'Lagos Markets'];
const PACKS = [
  { id: '1', title: 'Heritage Vault', desc: '1,000+ questions · Benin Empire to Modern Lagos', icon: '🏛', color: '#1a2e24' },
  { id: '2', title: 'Sports Legends', desc: 'Nigeria 1994 · Olympic golds · Premier League', icon: '⚽', color: '#1a2030' },
];

export default function ExplorerScreen() {
  const router = useRouter();
  const drawer = useRef<DrawerHandle>(null);
  const [search, setSearch] = useState('');

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

          {/* Trending This Week */}
          <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Star size={16} color="#e9c349" />
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>Trending This Week</Text>
            </View>
            <View style={{ backgroundColor: '#1c211e', borderRadius: 24, overflow: 'hidden' }}>
              <View style={{ height: 140, backgroundColor: '#1f3a1f', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 56 }}>🌍</Text>
              </View>
              <View style={{ padding: 18 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <View style={{ backgroundColor: 'rgba(233,195,73,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
                    <Text style={{ color: '#e9c349', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>TRENDING #1</Text>
                  </View>
                </View>
                <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 18, marginBottom: 6 }}>Culture of the 36 States</Text>
                <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18, marginBottom: 16 }}>
                  Explore the unique traditions, languages, and landmarks that define every Nigerian state.
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/arena')}
                  style={{ backgroundColor: '#59de9b', paddingVertical: 12, borderRadius: 14, alignItems: 'center' }}
                >
                  <Text style={{ color: '#0f1412', fontWeight: '800', fontSize: 14 }}>Explore Pack →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Cultural Fact */}
          <View style={{ marginHorizontal: 20, marginBottom: 28, backgroundColor: '#1c1800', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(233,195,73,0.15)' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <BookOpen size={16} color="#e9c349" />
              <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 13 }}>Cultural Fact</Text>
            </View>
            <Text style={{ color: '#bfc9c4', fontSize: 13, lineHeight: 20, fontStyle: 'italic' }}>
              "The Benin Kingdom, one of the oldest in West Africa, produced intricate bronze plaques and sculptures that are now featured in museums across the world."
            </Text>
          </View>

          {/* Weekly Challenge */}
          <View style={{ marginHorizontal: 20, marginBottom: 28, backgroundColor: '#1c211e', borderRadius: 20, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Calendar size={16} color="#59de9b" />
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>Weekly Challenge</Text>
            </View>
            <Text style={{ color: '#bfc9c4', fontSize: 13, marginBottom: 14 }}>
              Complete 5 different packs this week to earn the "Cultural Pioneer" badge.
            </Text>
            <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i <= 2 ? '#59de9b' : '#262b29' }} />
              ))}
            </View>
            <Text style={{ color: '#89938f', fontSize: 11 }}>2 of 5 completed · 4 days remaining</Text>
          </View>

          {/* Pack Previews */}
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>Featured Packs</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/boutique')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 12 }}>Browse All</Text>
                <ChevronRight size={14} color="#e9c349" />
              </TouchableOpacity>
            </View>
            {PACKS.map(pack => (
              <View key={pack.id} style={{ backgroundColor: '#1c211e', borderRadius: 20, overflow: 'hidden', marginBottom: 14 }}>
                <View style={{ height: 80, backgroundColor: pack.color, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 36 }}>{pack.icon}</Text>
                </View>
                <View style={{ padding: 14 }}>
                  <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 15, marginBottom: 3 }}>{pack.title}</Text>
                  <Text style={{ color: '#bfc9c4', fontSize: 12 }}>{pack.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
