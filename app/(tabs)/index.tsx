import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

// ─── Stitch Tokens ─────────────────────────────────────────────────────────
// bg: #0f1412 | surface: #1c211e | elevated: #262b29 | highest: #313633
// green: #59de9b | gold: #e9c349 | text: #dfe4e0 | muted: #bfc9c4 | faint: #89938f

const PACKS = [
  { id: '1', title: 'Flavors of Naija', desc: 'How well do you know our spices, recipes, and regional delicacies?', badge: 'POPULAR', icon: '🍲', color: '#2a1a0a' },
  { id: '2', title: 'Afrobeats Icons', desc: 'From Fela to Burna Boy. Test your ear for the rhythm of the giants.', badge: 'MUSIC', icon: '🎵', color: '#1a0a2a' },
  { id: '3', title: 'Lagos City Hustle', desc: 'The landmarks, the streets, and the spirit of the Center of Excellence.', badge: 'NEW', icon: '🏙', color: '#0a1a2a' },
];

const RECENT = [
  { icon: '✅', title: 'Nollywood Classics Mastered', sub: '2 hours ago · Perfect Score', xp: '+500 XP', xpColor: '#59de9b' },
  { icon: '📈', title: 'Rank Up! Gold League Tier II', sub: 'Yesterday · Climbing the ladder', xp: 'PROMOTED', xpColor: '#e9c349' },
];

// ── Countdown ──
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
  const { h, m, s } = useCountdown(14 * 3600 + 32 * 60 + 8);

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
          <TouchableOpacity>
            <View style={{ gap: 5 }}>
              <View style={{ width: 22, height: 2, backgroundColor: '#dfe4e0', borderRadius: 1 }} />
              <View style={{ width: 22, height: 2, backgroundColor: '#dfe4e0', borderRadius: 1 }} />
              <View style={{ width: 22, height: 2, backgroundColor: '#dfe4e0', borderRadius: 1 }} />
            </View>
          </TouchableOpacity>
          <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>Daily Naija Trivia</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#e9c349', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#0f1412', fontWeight: '900', fontSize: 14 }}>T</Text>
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Special Event Banner */}
          <View style={{ marginHorizontal: 20, marginTop: 8, borderRadius: 24, overflow: 'hidden', backgroundColor: '#1a2e1a' }}>
            <LinearGradient
              colors={['#1f3a1f', '#1a2e1a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 22 }}
            >
              <View style={{ backgroundColor: '#59de9b', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 10 }}>
                <Text style={{ color: '#0f1412', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }}>Special Event</Text>
              </View>
              <Text style={{ color: '#dfe4e0', fontSize: 22, fontWeight: '900', lineHeight: 30, marginBottom: 6 }}>
                Heritage of the Savannah
              </Text>
              <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 19, marginBottom: 18 }}>
                Test your knowledge on the diverse wildlife and ecosystems of Northern Nigeria's vast reserves.
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/arena')}
                style={{ alignSelf: 'flex-start' }}
              >
                <View style={{ backgroundColor: '#59de9b', paddingHorizontal: 18, paddingVertical: 11, borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ color: '#0f1412', fontWeight: '800', fontSize: 13 }}>Play Now</Text>
                  <Text style={{ color: '#0f1412', fontSize: 13 }}>▶</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>

            {/* Countdown strip */}
            <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 22, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2 }}>Challenge Expires In</Text>
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
              { icon: '🔥', label: 'Current Streak', value: '12 Days', sub: 'BEST: 21' },
              { icon: '🏆', label: 'Global Rank', value: '#482', sub: 'TOP 2%' },
            ].map(s => (
              <View key={s.label} style={{ flex: 1, backgroundColor: '#1c211e', borderRadius: 20, padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ fontSize: 22 }}>{s.icon}</Text>
                  <View style={{ backgroundColor: '#262b29', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 }}>
                    <Text style={{ color: '#89938f', fontSize: 9, fontWeight: '700' }}>{s.sub}</Text>
                  </View>
                </View>
                <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>{s.label}</Text>
                <Text style={{ color: '#dfe4e0', fontWeight: '900', fontSize: 22 }}>{s.value}</Text>
              </View>
            ))}
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 12, backgroundColor: '#1c211e', borderRadius: 20, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Text style={{ fontSize: 22 }}>🪙</Text>
              <View>
                <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5 }}>Trivia Tokens</Text>
                <Text style={{ color: '#dfe4e0', fontWeight: '900', fontSize: 22 }}>2,450</Text>
              </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#262b29', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}>
              <Text style={{ color: '#59de9b', fontWeight: '700', fontSize: 12 }}>Top Up +</Text>
            </TouchableOpacity>
          </View>

          {/* Available Packs */}
          <View style={{ marginTop: 28, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 18 }}>Available Packs</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/boutique')}>
                <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 13 }}>View All Packs</Text>
              </TouchableOpacity>
            </View>

            {PACKS.map(pack => (
              <TouchableOpacity
                key={pack.id}
                onPress={() => router.push('/(tabs)/arena')}
                activeOpacity={0.85}
                style={{ backgroundColor: '#1c211e', borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}
              >
                <View style={{ height: 120, backgroundColor: pack.color, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 48 }}>{pack.icon}</Text>
                  <View style={{ position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(89,222,155,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
                    <Text style={{ color: '#59de9b', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>{pack.badge}</Text>
                  </View>
                </View>
                <View style={{ padding: 16 }}>
                  <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16, marginBottom: 4 }}>{pack.title}</Text>
                  <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18, marginBottom: 14 }}>{pack.desc}</Text>
                  <View style={{ backgroundColor: '#262b29', paddingVertical: 10, borderRadius: 12, alignItems: 'center' }}>
                    <Text style={{ color: '#59de9b', fontWeight: '800', fontSize: 13 }}>Start Pack →</Text>
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
                <Text style={{ fontSize: 26, marginRight: 14 }}>{item.icon}</Text>
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
