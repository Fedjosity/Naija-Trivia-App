import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TROPHIES = [
  {
    id: '1',
    emoji: '👑',
    name: "The Oba's Crown",
    desc: 'Awarded for 100% accuracy in the "Kingdoms of the South" series.',
    date: 'Oct 12, 2023',
    color: '#D4AF37',
  },
  {
    id: '2',
    emoji: '🍲',
    name: 'Jollof Connoisseur',
    desc: "Mastered the \"Culinary Geography\" challenge without a single mistake.",
    date: 'Sep 28, 2023',
    color: '#E05A00',
  },
  {
    id: '3',
    emoji: '🎬',
    name: 'Nollywood Legend',
    desc: 'Successfully identified 50 classic movies from the 90s era.',
    date: 'Aug 15, 2023',
    color: '#7B2FBE',
  },
];

const MILESTONES = [
  { emoji: '🎵', name: 'Afrobeats Titan' },
  { emoji: '🗺', name: 'State Explorer' },
  { emoji: '🏙', name: 'City Architect' },
  { emoji: '🦅', name: 'Super Eagle' },
];

const STATS = [
  { value: '12.4k', label: 'POINTS' },
  { value: '15', label: 'BADGES' },
  { value: '#3', label: 'RANK' },
];

export default function ProfileScreen() {
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
            </View>
          </TouchableOpacity>
          <Text className="text-brand-text font-bold text-base">Daily Naija Trivia</Text>
          <Text className="text-2xl">🔔</Text>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Avatar */}
          <View className="items-center mt-4 mb-5">
            <View className="relative">
              <View className="w-20 h-20 rounded-full bg-brand-gold/80 items-center justify-center border-4 border-brand-gold">
                <Text style={{ fontSize: 36 }}>🧑🏾</Text>
              </View>
              <View className="absolute -bottom-1 -right-1 bg-brand-green rounded-full px-2 py-0.5 border-2 border-brand-bg">
                <Text className="text-white text-[10px] font-bold">LVL 42</Text>
              </View>
            </View>

            <Text className="text-brand-text text-2xl font-bold mt-4 text-center">
              Tunde "The Oracle"
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-brand-gold mr-1">●</Text>
              <Text className="text-brand-muted text-sm">Grandmaster of Yoruba Folklore</Text>
            </View>

            {/* Stats */}
            <View className="flex-row mt-5 space-x-6">
              {STATS.map(s => (
                <View key={s.label} className="items-center">
                  <Text className="text-brand-text font-bold text-lg">{s.value}</Text>
                  <Text className="text-brand-muted text-[10px] uppercase tracking-widest">{s.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Streak */}
          <View className="mx-5 mb-5 bg-brand-surface rounded-2xl p-5 border border-white/5">
            <Text className="text-brand-muted text-[10px] uppercase tracking-[3px] mb-2">Current Streak</Text>
            <View className="flex-row items-end mb-2">
              <Text className="text-brand-green text-5xl font-black">28</Text>
              <Text className="text-brand-text text-xl ml-2 mb-1">Days</Text>
            </View>
            <Text className="text-brand-muted text-xs leading-relaxed mb-3">
              You're in the top 1% of players this month. Keep the fire burning to unlock the 'Ancient Historian' title.
            </Text>
            {/* Progress bars */}
            <View className="flex-row space-x-1.5">
              {[1, 2, 3, 4].map(i => (
                <View key={i} className={`flex-1 h-1.5 rounded-full ${i < 4 ? 'bg-brand-green' : 'bg-brand-surface'}`} />
              ))}
            </View>
          </View>

          {/* Vault Value */}
          <View className="mx-5 mb-6">
            <LinearGradient
              colors={['#D4AF37', '#8B6914']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-2xl p-5"
            >
              <Text className="text-black/50 text-[10px] font-bold uppercase tracking-[3px] mb-1">Vault Value</Text>
              <Text className="text-brand-bg text-3xl font-black mb-3">₦85,200</Text>
              <TouchableOpacity
                className="bg-black/25 py-3 rounded-xl items-center"
                activeOpacity={0.85}
              >
                <Text className="text-brand-bg font-bold text-sm uppercase tracking-widest">Redeem Prizes</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Trophy Timeline */}
          <View className="px-5 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-brand-text font-bold text-lg">Trophy Timeline</Text>
              <TouchableOpacity>
                <Text className="text-brand-gold text-sm font-semibold">View All →</Text>
              </TouchableOpacity>
            </View>

            {TROPHIES.map((trophy, i) => (
              <View key={trophy.id} className="flex-row mb-6">
                {/* Timeline line */}
                <View className="items-center mr-4">
                  <View className="w-10 h-10 rounded-full items-center justify-center border-2"
                    style={{ borderColor: trophy.color, backgroundColor: `${trophy.color}20` }}>
                    <Text style={{ fontSize: 18 }}>{trophy.emoji}</Text>
                  </View>
                  {i < TROPHIES.length - 1 && (
                    <View className="w-px flex-1 bg-brand-surface mt-2" style={{ minHeight: 24 }} />
                  )}
                </View>
                {/* Content */}
                <View className="flex-1 pt-1">
                  <Text className="text-brand-text font-bold text-base mb-0.5">{trophy.name}</Text>
                  <Text className="text-brand-muted text-xs leading-relaxed mb-1">{trophy.desc}</Text>
                  <Text className="text-brand-gold text-xs font-semibold">{trophy.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Upcoming Milestones */}
          <View className="px-5">
            <Text className="text-brand-text font-bold text-lg mb-4">Upcoming Milestones</Text>
            <View className="flex-row flex-wrap gap-3">
              {MILESTONES.map(m => (
                <View
                  key={m.name}
                  className="flex-col items-center justify-center bg-brand-surface rounded-2xl p-4 border border-white/5 opacity-50"
                  style={{ width: '46%' }}
                >
                  <Text style={{ fontSize: 28, marginBottom: 6 }}>{m.emoji}</Text>
                  <Text className="text-brand-muted text-xs text-center">{m.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
