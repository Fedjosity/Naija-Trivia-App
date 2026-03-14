import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const PERKS = [
  {
    icon: '🔓',
    title: 'Unlock All Expert Packs',
    desc: 'Gain immediate access to over 500+ deep-cut trivia packs covering 36 states and beyond.',
  },
  {
    icon: '🚫',
    title: 'Ad-Free Experience',
    desc: 'No interruptions. Just pure, rapid-fire knowledge discovery without the noise.',
  },
  {
    icon: '🏆',
    title: 'Exclusive Leaderboard Badge',
    desc: 'Stand out in the national rankings. Show every player that you belong to the elite circle of Naija Gold scholars.',
  },
];

export default function GoldScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, backgroundColor: '#1c211e', borderRadius: 12 }}>
              <Text style={{ color: '#dfe4e0', fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Emblem */}
          <View style={{ alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20 }}>
            <LinearGradient
              colors={['#e9c349', '#b8962f', '#7a6010']}
              style={{ width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}
            >
              <Text style={{ fontSize: 44 }}>⭐</Text>
            </LinearGradient>

            <Text style={{ color: '#dfe4e0', fontSize: 36, fontWeight: '900', textAlign: 'center', letterSpacing: -1 }}>
              Naija Gold
            </Text>
            <Text style={{ color: '#bfc9c4', fontSize: 15, textAlign: 'center', marginTop: 8, lineHeight: 22 }}>
              The ultimate experience for Nigerian culture connoisseurs.
            </Text>
          </View>

          {/* Perks */}
          <View style={{ paddingHorizontal: 20, gap: 12, marginBottom: 28 }}>
            {PERKS.map((perk, i) => (
              <View key={i} style={{ backgroundColor: '#1c211e', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#262b29', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                  <Text style={{ fontSize: 22 }}>{perk.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 15, marginBottom: 4 }}>{perk.title}</Text>
                  <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18 }}>{perk.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Social Proof */}
          <View style={{ marginHorizontal: 20, backgroundColor: '#1c1800', borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(233,195,73,0.15)' }}>
            <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 12, marginBottom: 4 }}>📊 Did You Know?</Text>
            <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18 }}>
              Naija Gold members are{' '}
              <Text style={{ color: '#dfe4e0', fontWeight: '700' }}>4x more likely</Text>
              {' '}to reach the "Federal Giant" status in the global leagues due to early access to trending topics.
            </Text>
          </View>

          {/* CTA Block */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: '#89938f', fontSize: 11, textAlign: 'center', marginBottom: 10 }}>
              Renews at ₦1,500/month after trial · Cancel anytime.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/checkout')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#e9c349', '#b8962f']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 18, borderRadius: 999, alignItems: 'center' }}
              >
                <Text style={{ color: '#0f1412', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 }}>
                  Start 7-Day Free Trial →
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={{ color: '#89938f', fontSize: 11, textAlign: 'center', marginTop: 14 }}>
              🔒 Secure payment · Verified by Paystack
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
