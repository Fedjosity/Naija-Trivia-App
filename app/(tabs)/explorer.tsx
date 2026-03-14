import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const TAGS = ['#FelaKuti', '#90sSuperEagles', '#LagosNightlife', '#NollywoodClassics'];

const PACKS = [
  { id: '1', title: '90s Nollywood', questions: 25, difficulty: 'Expert Level', color: '#2A1A1A' },
  { id: '2', title: 'Landmarks & Geography', questions: 15, difficulty: 'Beginner', color: '#1A1A2A' },
  { id: '3', title: 'The Great Jollof Debate', questions: 20, difficulty: 'Casual', color: '#2A1A10' },
];

export default function ExplorerScreen() {
  const router = useRouter();
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
          <View className="px-5 mt-3 mb-5">
            <Text className="text-brand-text text-3xl font-bold leading-tight">
              Discover the{' '}
              <Text className="text-brand-gold">Naija{'\n'}Essence</Text>
            </Text>
          </View>

          {/* Search */}
          <View className="mx-5 mb-5 bg-brand-surface rounded-xl flex-row items-center px-4 border border-white/5">
            <Text className="text-brand-muted mr-3 text-base">🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search trivia packs, culture..."
              placeholderTextColor="#8A9A98"
              className="flex-1 text-brand-text py-3.5 text-sm"
            />
          </View>

          {/* Trending tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5" contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
            {TAGS.map(tag => (
              <TouchableOpacity
                key={tag}
                className="bg-brand-surface border border-white/10 px-4 py-2 rounded-full"
                activeOpacity={0.75}
              >
                <Text className="text-brand-muted text-xs font-semibold">{tag}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Trending Card */}
          <View className="mx-5 mb-6 rounded-2xl overflow-hidden" style={{ backgroundColor: '#1A2E20' }}>
            <View className="p-5">
              <View className="flex-row items-center mb-2">
                <View className="bg-brand-green px-2.5 py-1 rounded-full mr-2">
                  <Text className="text-white text-[10px] font-bold uppercase tracking-wide">TRENDING</Text>
                </View>
                <Text className="text-brand-muted text-xs">1.2k playing now</Text>
              </View>
              <Text className="text-brand-text text-xl font-bold mb-1">
                Afrobeats: From{'\n'}Fela to Burna
              </Text>
              <Text className="text-brand-muted text-xs leading-relaxed mb-4">
                Test your knowledge on the evolution of Nigeria's biggest cultural export.
              </Text>
              <TouchableOpacity
                className="bg-brand-green self-start px-5 py-2.5 rounded-full"
                onPress={() => router.push('/(tabs)/arena')}
              >
                <Text className="text-white font-bold text-sm">Start Trivia</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Did You Know */}
          <View className="mx-5 mb-6 p-5 rounded-2xl border border-brand-gold/20" style={{ backgroundColor: '#1C1A0F' }}>
            <Text className="text-brand-gold text-sm font-bold mb-2">💡 Did You Know?</Text>
            <Text className="text-brand-muted text-sm leading-relaxed italic">
              "Nigeria is home to the single largest diversity of butterflies in the world, with over 1,000 species recorded in the Cross River National Park."
            </Text>
            <Text className="text-brand-muted text-[10px] mt-2">📚 Source: Nature Nigeria</Text>
          </View>

          {/* Weekly Challenge */}
          <View className="mx-5 mb-6 bg-brand-surface rounded-2xl p-5 border border-white/5">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-brand-text font-bold text-sm">Weekly Challenge</Text>
              <Text className="text-brand-green font-bold text-sm">#32</Text>
            </View>
            <Text className="text-brand-muted text-xs mb-3">Master the '94 Eagles team stats to win exclusive badges.</Text>
            <View className="h-2 bg-brand-bg rounded-full overflow-hidden">
              <View className="h-full bg-brand-green rounded-full w-[85%]" />
            </View>
            <Text className="text-brand-muted text-[10px] mt-1 text-right">85% of players completed</Text>
          </View>

          {/* Pack Previews */}
          <View className="px-5">
            <Text className="text-brand-text font-bold text-base mb-4">Explore Packs</Text>
            {PACKS.map(pack => (
              <View
                key={pack.id}
                className="rounded-2xl overflow-hidden mb-4 border border-white/5"
              >
                <View className="h-36" style={{ backgroundColor: pack.color }}>
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-white/20 text-6xl font-black">{pack.title.charAt(0)}</Text>
                  </View>
                </View>
                <View className="bg-brand-surface p-4">
                  <Text className="text-brand-text font-bold text-base mb-0.5">{pack.title}</Text>
                  <Text className="text-brand-muted text-xs mb-3">
                    {pack.questions} Questions • {pack.difficulty}
                  </Text>
                  <TouchableOpacity
                    className="border border-brand-green/40 py-2.5 rounded-xl items-center"
                    onPress={() => router.push('/(tabs)/arena')}
                    activeOpacity={0.85}
                  >
                    <Text className="text-brand-green font-bold text-xs tracking-wide">Preview Pack</Text>
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
