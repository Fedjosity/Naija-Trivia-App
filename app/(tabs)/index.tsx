import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useRef } from 'react';
import { Flame, Trophy, Coins, PlayCircle, ChevronRight, CheckCircle2, TrendingUp } from 'lucide-react-native';
import DrawerMenu, { type DrawerHandle } from '../../components/DrawerMenu';
import AppHeader from '../../components/AppHeader';
import { useNaijaStore } from '../../store/useNaijaStore';

const PACKS = [
  { id: '1', title: 'Flavors of Naija', desc: 'How well do you know our spices, recipes, and regional delicacies?', badge: 'POPULAR', icon: '🍲', color: '#2a1a0a' },
  { id: '2', title: 'Afrobeats Icons', desc: 'From Fela to Burna Boy. Test your ear for the rhythm of the giants.', badge: 'MUSIC', icon: '🎵', color: '#1a0a2a' },
  { id: '3', title: 'Lagos City Hustle', desc: 'The landmarks, the streets, and the spirit of the Center of Excellence.', badge: 'NEW', icon: '🏙', color: '#0a1a2a' },
];

const RECENT = [
  { Icon: CheckCircle2, iconColor: '#59de9b', title: 'Nollywood Classics Mastered', sub: '2 hours ago · Perfect Score', xp: '+500 XP', xpColor: '#59de9b' },
  { Icon: TrendingUp,  iconColor: '#e9c349', title: 'Rank Up! Gold League Tier II', sub: 'Yesterday · Climbing the ladder', xp: 'PROMOTED', xpColor: '#e9c349' },
];

function useCountdown(initial: number) {
  const [time, setTime] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => setTime(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(time / 3600)).padStart(2, '0');
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');
  return { h, m, s };
}

export default function DashboardScreen() {
  const router = useRouter();
  const drawer = useRef<DrawerHandle>(null);
  const { h, m, s } = useCountdown(14 * 3600 + 32 * 60 + 8);
  const { stats, wallet } = useNaijaStore();

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <DrawerMenu ref={drawer} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <AppHeader title="Daily Naija Trivia" drawerRef={drawer} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Event Banner */}
          <View style={{ marginHorizontal: 20, marginTop: 4, borderRadius: 24, overflow: 'hidden', backgroundColor: '#1a2e1a' }}>
            <LinearGradient colors={['#1f3a1f', '#1a2e1a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ padding: 22 }}>
              <View style={{ backgroundColor: '#59de9b', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 10 }}>
                <Text style={{ color: '#0f1412', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }}>Special Event</Text>
              </View>
              <Text style={{ color: '#dfe4e0', fontSize: 22, fontWeight: '900', lineHeight: 30, marginBottom: 6 }}>Heritage of the Savannah</Text>
              <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 19, marginBottom: 18 }}>
                Test your knowledge on the diverse wildlife and ecosystems of Northern Nigeria's vast reserves.
              </Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/arena')} style={{ alignSelf: 'flex-start' }}>
                <View style={{ backgroundColor: '#59de9b', paddingHorizontal: 18, paddingVertical: 11, borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <PlayCircle size={16} color="#0f1412" />
                  <Text style={{ color: '#0f1412', fontWeight: '800', fontSize: 13 }}>Play Now</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 22, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2 }}>Expires In</Text>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                {[[h, 'Hours'], [m, 'Mins'], [s, 'Secs']].map(([val, label]) => (
                  <View key={label} style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#e9c349', fontWeight: '900', fontSize: 20, lineHeight: 24 }}>{val}</Text>
                    <Text style={{ color: '#89938f', fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, gap: 12 }}>
            {[
              { Icon: Flame, label: 'Current Streak', value: `${stats.highestStreak} Days`, sub: `BEST: ${stats.highestStreak}`, iconColor: '#e9c349' },
              { Icon: Trophy, label: 'Global Rank', value: '#---', sub: 'SYNCING...', iconColor: '#59de9b' },
            ].map(st => (
              <View key={st.label} style={{ flex: 1, backgroundColor: '#1c211e', borderRadius: 20, padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <st.Icon size={22} color={st.iconColor} />
                  <View style={{ backgroundColor: '#262b29', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
                    <Text style={{ color: '#89938f', fontSize: 9, fontWeight: '700' }}>{st.sub}</Text>
                  </View>
                </View>
                <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>{st.label}</Text>
                <Text style={{ color: '#dfe4e0', fontWeight: '900', fontSize: 22 }}>{st.value}</Text>
              </View>
            ))}
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 12, backgroundColor: '#1c211e', borderRadius: 20, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Coins size={22} color="#e9c349" />
              <View>
                <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5 }}>Trivia Tokens</Text>
                <Text style={{ color: '#dfe4e0', fontWeight: '900', fontSize: 22 }}>{wallet.naijaCoins.toLocaleString()}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/gold')} style={{ backgroundColor: '#262b29', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}>
              <Text style={{ color: '#59de9b', fontWeight: '700', fontSize: 12 }}>Top Up +</Text>
            </TouchableOpacity>
          </View>

          {/* Packs */}
          <View style={{ marginTop: 28, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 18 }}>Available Packs</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/boutique')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 13 }}>View All</Text>
                <ChevronRight size={14} color="#e9c349" />
              </TouchableOpacity>
            </View>
            {PACKS.map(pack => (
              <TouchableOpacity key={pack.id} onPress={() => router.push('/(tabs)/arena')} activeOpacity={0.85}
                style={{ backgroundColor: '#1c211e', borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
                <View style={{ height: 100, backgroundColor: pack.color, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 44 }}>{pack.icon}</Text>
                  <View style={{ position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(89,222,155,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
                    <Text style={{ color: '#59de9b', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>{pack.badge}</Text>
                  </View>
                </View>
                <View style={{ padding: 16 }}>
                  <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16, marginBottom: 4 }}>{pack.title}</Text>
                  <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18, marginBottom: 14 }}>{pack.desc}</Text>
                  <View style={{ backgroundColor: '#262b29', paddingVertical: 10, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                    <PlayCircle size={14} color="#59de9b" />
                    <Text style={{ color: '#59de9b', fontWeight: '800', fontSize: 13 }}>Start Pack</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Performance */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 18, marginBottom: 14 }}>Recent Performance</Text>
            {RECENT.map((item, i) => (
              <View key={i} style={{ backgroundColor: '#1c211e', borderRadius: 20, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
                <item.Icon size={28} color={item.iconColor} style={{ marginRight: 14 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#dfe4e0', fontWeight: '700', fontSize: 14 }}>{item.title}</Text>
                  <Text style={{ color: '#89938f', fontSize: 11, marginTop: 3 }}>{item.sub}</Text>
                </View>
                <Text style={{ fontWeight: '800', fontSize: 13, color: item.xpColor }}>{item.xp}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
