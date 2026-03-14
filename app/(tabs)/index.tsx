import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import StatWidget from '../../components/StatWidget';

// ─── Mock Data ─────────────────────────────────────────────────────────────
const PACKS = [
  {
    id: '1',
    title: 'Flavors of Naija',
    description: 'How well do you know our spices, recipes, and regional delicacies?',
    badge: 'POPULAR',
    questions: 25,
    color: '#8B4513',
  },
  {
    id: '2',
    title: 'Afrobeats Icons',
    description: 'From Fela to Burna Boy. Test your ear for the rhythm of the giants.',
    badge: 'MUSIC',
    questions: 40,
    color: '#2A1A2A',
  },
  {
    id: '3',
    title: 'Lagos City Hustle',
    description: 'The landmarks, the streets, and the spirit of the Center of Excellence.',
    badge: 'NEW',
    questions: 30,
    color: '#1A2A3A',
  },
];

const RECENT = [
  { icon: '✅', title: 'Nollywood Classics Mastered', sub: '2 hours ago · Perfect Score', xp: '+500 XP', xpColor: '#22C55E' },
  { icon: '📈', title: 'Rank Up! Gold League', sub: 'Yesterday · Climbing the ladder', xp: 'PROMOTED', xpColor: '#D4AF37' },
];

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-brand-bg">
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 py-3">
          <TouchableOpacity>
            <View className="space-y-1">
              <View className="w-5 h-0.5 bg-brand-text" />
              <View className="w-5 h-0.5 bg-brand-text" />
              <View className="w-5 h-0.5 bg-brand-text" />
            </View>
          </TouchableOpacity>
          <Text className="text-brand-text font-bold text-base">Daily Naija Trivia</Text>
          <View className="flex-row items-center space-x-3">
            <Text className="text-2xl">🔔</Text>
            <View className="w-9 h-9 rounded-full bg-brand-gold overflow-hidden items-center justify-center">
              <Text className="text-brand-bg font-bold">T</Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          {/* Special Event Banner */}
          <View className="mx-5 mt-2 rounded-2xl overflow-hidden" style={{ backgroundColor: '#1A3A2A' }}>
            <View className="p-5">
              <View className="flex-row items-center mb-2">
                <View className="bg-brand-green px-3 py-1 rounded-full mr-2">
                  <Text className="text-white text-[10px] font-bold uppercase tracking-wide">Special Event</Text>
                </View>
              </View>
              <Text className="text-brand-text text-2xl font-bold leading-tight mb-1">
                Heritage of the Savannah
              </Text>
              <Text className="text-brand-muted text-xs leading-relaxed mb-4">
                Test your knowledge on the diverse wildlife and ecosystems of Northern Nigeria's vast reserves.
              </Text>
              <TouchableOpacity
                className="bg-brand-green self-start px-5 py-2.5 rounded-full flex-row items-center"
                onPress={() => router.push('/(tabs)/arena')}
              >
                <Text className="text-white font-bold text-sm mr-1">Play Now</Text>
                <Text className="text-white text-sm">▶</Text>
              </TouchableOpacity>
            </View>

            {/* Countdown */}
            <View className="border-t border-white/10 px-5 py-3 flex-row items-center justify-between">
              <Text className="text-brand-muted text-[10px] uppercase tracking-widest">Challenge Expires In</Text>
              <View className="flex-row space-x-3">
                {[['14', 'HOURS'], ['32', 'MINS'], ['08', 'SECS']].map(([val, unit]) => (
                  <View key={unit} className="items-center">
                    <Text className="text-brand-gold text-xl font-bold">{val}</Text>
                    <Text className="text-brand-muted text-[9px]">{unit}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row px-5 mt-5 space-x-3">
            <StatWidget icon="🔥" label="Current Streak" value="12 Days" sub="BEST: 21" />
            <StatWidget icon="🏆" label="Global Rank" value="#482" sub="TOP 2%" subColor="text-brand-gold" />
          </View>
          <View className="px-5 mt-3">
            <StatWidget icon="🪙" label="Trivia Tokens" value="2,450" sub="TOP UP" subColor="text-brand-green" />
          </View>

          {/* Available Packs */}
          <View className="mt-6 px-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-brand-text text-lg font-bold">Available Packs</Text>
              <TouchableOpacity>
                <Text className="text-brand-gold text-sm font-semibold">View All Packs</Text>
              </TouchableOpacity>
            </View>

            {PACKS.map(pack => (
              <TouchableOpacity
                key={pack.id}
                className="bg-brand-surface rounded-2xl overflow-hidden mb-4 border border-white/5"
                onPress={() => router.push('/(tabs)/arena')}
                activeOpacity={0.85}
              >
                {/* Color swatch header */}
                <View className="h-36 w-full" style={{ backgroundColor: pack.color }}>
                  <View className="flex-1 items-end p-3">
                    <View className="bg-brand-green px-2.5 py-1 rounded-full">
                      <Text className="text-white text-[10px] font-bold uppercase tracking-wide">{pack.badge}</Text>
                    </View>
                  </View>
                </View>
                <View className="p-4">
                  <Text className="text-brand-text font-bold text-base mb-1">{pack.title}</Text>
                  <Text className="text-brand-muted text-xs leading-relaxed mb-3">{pack.description}</Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-muted text-xs">🎯 {pack.questions} Qs</Text>
                    <TouchableOpacity
                      className="bg-brand-green px-4 py-2 rounded-xl"
                      onPress={() => router.push('/(tabs)/arena')}
                    >
                      <Text className="text-white text-xs font-bold">Start Pack</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Performance */}
          <View className="px-5 mt-2">
            <Text className="text-brand-text text-lg font-bold mb-4">Recent Performance</Text>
            {RECENT.map((item, i) => (
              <View key={i} className="bg-brand-surface rounded-2xl p-4 mb-3 flex-row items-center border border-white/5">
                <Text className="text-2xl mr-3">{item.icon}</Text>
                <View className="flex-1">
                  <Text className="text-brand-text font-semibold text-sm">{item.title}</Text>
                  <Text className="text-brand-muted text-xs mt-0.5">{item.sub}</Text>
                </View>
                <Text className="font-bold text-sm" style={{ color: item.xpColor }}>{item.xp}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
