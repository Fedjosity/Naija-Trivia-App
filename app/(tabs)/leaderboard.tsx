import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TOP3 = [
  { rank: 1, name: 'Chukwudi', points: '15.8k', state: 'ANAMBRA', title: 'GRANDMASTER', emoji: '👨🏿' },
  { rank: 2, name: 'Adesua', points: '12.4k', state: 'LAGOS', emoji: '👩🏾' },
  { rank: 3, name: 'Fatima', points: '11.9k', state: 'KANO', emoji: '👩🏽' },
];

const RANKS = [
  { rank: 4, name: 'Obinna K.', state: 'EDO', points: '9,842', trend: '↑' },
  { rank: 5, name: 'Yemi A.', state: 'OYO', points: '9,210', trend: '↓' },
  { rank: 24, name: 'You (Tunde)', state: 'KWARA', points: '4,150', trend: '↑', isMe: true },
  { rank: 25, name: 'Mustafa R.', state: 'KADUNA', points: '4,105', trend: '—' },
];

function PodiumCard({ player, size }: { player: typeof TOP3[0]; size: 'large' | 'small' }) {
  const isLarge = size === 'large';
  return (
    <View className={`items-center ${isLarge ? 'mx-4' : 'mx-2'}`}>
      <View className={`rounded-full items-center justify-center mb-2 border-2 ${isLarge ? 'w-16 h-16 border-brand-gold' : 'w-12 h-12 border-brand-green/50'}`}
        style={{ backgroundColor: '#1A2118' }}>
        <Text style={{ fontSize: isLarge ? 30 : 22 }}>{player.emoji}</Text>
      </View>
      {player.rank === 1 && <Text className="text-xs mb-1">⭐</Text>}
      <View className={`rounded-xl px-3 py-2 items-center ${isLarge ? 'bg-brand-gold/20 border border-brand-gold/40 min-w-[80px]' : 'bg-brand-surface min-w-[64px]'}`}>
        <Text className={`font-black text-lg ${isLarge ? 'text-brand-gold' : 'text-brand-text'}`}>
          {player.rank}
        </Text>
        <Text className={`font-bold text-sm ${isLarge ? 'text-brand-text' : 'text-brand-muted'}`}>{player.name.toUpperCase()}</Text>
        <Text className={`text-xs font-semibold ${isLarge ? 'text-brand-gold' : 'text-brand-green'}`}>{player.points}</Text>
        {player.title && (
          <View className="mt-1 bg-brand-green/20 px-2 py-0.5 rounded-full">
            <Text className="text-brand-green text-[9px] font-bold uppercase tracking-wide">{player.title}</Text>
          </View>
        )}
      </View>
      <View className="mt-1 bg-brand-surface px-2 py-0.5 rounded-full">
        <Text className="text-brand-muted text-[9px] tracking-widest">{player.state}</Text>
      </View>
    </View>
  );
}

export default function LeaderboardScreen() {
  const [search, setSearch] = useState('');

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
          <View className="w-9 h-9 rounded-full bg-brand-surface items-center justify-center">
            <Text className="text-brand-muted text-sm">👤</Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Title */}
          <View className="items-center mt-4 mb-6">
            <Text className="text-brand-text text-4xl font-black italic tracking-tight">THE PRESTIGE</Text>
            <Text className="text-brand-muted text-xs mt-1">Honoring the guardians of Nigerian heritage</Text>
          </View>

          {/* Podium */}
          <View className="flex-row justify-center items-end mb-8 px-5">
            <PodiumCard player={TOP3[1]} size="small" />
            <PodiumCard player={TOP3[0]} size="large" />
            <PodiumCard player={TOP3[2]} size="small" />
          </View>

          {/* Search */}
          <View className="mx-5 mb-4 bg-brand-surface rounded-xl flex-row items-center px-4 border border-white/5">
            <Text className="text-brand-muted mr-3">🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search for champions..."
              placeholderTextColor="#8A9A98"
              className="flex-1 text-brand-text py-3.5 text-sm"
            />
            <TouchableOpacity>
              <Text className="text-brand-muted text-base">⚙</Text>
            </TouchableOpacity>
          </View>

          {/* Ranked List */}
          <View className="mx-5 space-y-2">
            {RANKS.map(player => (
              <View
                key={player.rank}
                className="flex-row items-center py-4 px-4 rounded-2xl border"
                style={{
                  backgroundColor: player.isMe ? 'rgba(45,106,79,0.15)' : '#1A2118',
                  borderColor: player.isMe ? '#2D6A4F' : 'rgba(255,255,255,0.05)',
                  borderLeftWidth: player.isMe ? 3 : 1,
                }}
              >
                <View className="w-10 items-center">
                  <Text className="text-brand-muted text-xs font-bold">{player.trend}</Text>
                  <Text className={`font-bold text-lg ${player.isMe ? 'text-brand-green' : 'text-brand-text'}`}>
                    {player.rank}
                  </Text>
                </View>
                <View className="w-10 h-10 rounded-full bg-brand-surface items-center justify-center mx-3 border border-white/10">
                  <Text className="text-lg">👤</Text>
                </View>
                <View className="flex-1">
                  <Text className={`font-bold text-sm ${player.isMe ? 'text-brand-green' : 'text-brand-text'}`}>
                    {player.name}
                  </Text>
                  <View className="flex-row items-center mt-0.5">
                    <View className="bg-brand-surface/80 px-2 py-0.5 rounded-full border border-white/5">
                      <Text className="text-brand-muted text-[9px] uppercase tracking-widest">{player.state}</Text>
                    </View>
                  </View>
                </View>
                <View className="items-end">
                  <Text className={`font-bold text-base ${player.isMe ? 'text-brand-green' : 'text-brand-text'}`}>
                    {player.points}
                  </Text>
                  <Text className="text-brand-muted text-[10px] uppercase">POINTS</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Season Info */}
          <View className="mx-5 mt-5 p-5 rounded-2xl border border-brand-gold/20" style={{ backgroundColor: '#1C1A0A' }}>
            <View className="flex-row items-center mb-2">
              <Text className="text-brand-gold mr-2">ℹ</Text>
              <Text className="text-brand-gold font-bold text-sm">Season of Kings</Text>
            </View>
            <Text className="text-brand-muted text-xs leading-relaxed">
              The current season ends in{' '}
              <Text className="text-brand-text font-bold">4 days</Text>. The Top 3 guardians will receive the exclusive{' '}
              <Text className="text-brand-text italic">"Orisha Gold"</Text> badge and a{' '}
              <Text className="text-brand-text font-bold">₦50,000 Boutique</Text> voucher.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
