import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const CATEGORIES = [
  {
    id: 'nollywood',
    tag: 'ENTERTAINMENT',
    title: 'Nollywood',
    color: '#8B4513',
  },
  {
    id: 'history',
    tag: 'LEGACY',
    title: 'History',
    color: '#3A3A3A',
  },
  {
    id: 'music',
    tag: 'RHYTHM',
    title: 'Music',
    color: '#2A2A2A',
  },
  {
    id: 'cuisine',
    tag: 'FLAVORS',
    title: 'Cuisine',
    color: '#4A3728',
  },
  {
    id: 'innovation',
    tag: 'MODERNITY',
    title: 'Innovation',
    color: '#1A2A1A',
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set(['nollywood']));

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id); // at least 1 required
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <View className="flex-1 bg-brand-bg">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-2 pb-1">
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-brand-text text-xl">←</Text>
            </TouchableOpacity>
            <Text className="text-brand-text font-bold text-base">Daily Naija Trivia</Text>
            <Text className="text-brand-muted text-xs font-bold">Step 2 of 3</Text>
          </View>

          {/* Gold progress bar */}
          <View className="h-1 bg-brand-surface rounded-full mb-6">
            <View className="h-1 bg-brand-gold rounded-full w-2/3" />
          </View>

          <Text className="text-brand-text text-3xl font-bold mb-1">
            Choose Your{' '}
            <Text className="text-brand-gold italic">Legacy</Text>
          </Text>
          <Text className="text-brand-muted text-sm leading-relaxed mb-4">
            The Royal Digital Archive is vast. Select the realms where your knowledge reigns supreme. Pick at least two categories to begin your ascent.
          </Text>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="space-y-4 pb-4">
            {CATEGORIES.map(cat => {
              const isSelected = selected.has(cat.id);
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => toggle(cat.id)}
                  activeOpacity={0.85}
                >
                  <View
                    className="rounded-2xl overflow-hidden border"
                    style={{
                      borderColor: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Cover image placeholder */}
                    <View
                      className="h-28 w-full items-end justify-end p-3"
                      style={{ backgroundColor: cat.color }}
                    >
                      {isSelected && (
                        <View className="w-8 h-8 rounded-full bg-brand-gold items-center justify-center">
                          <Text className="text-brand-bg font-bold text-sm">✓</Text>
                        </View>
                      )}
                      {!isSelected && (
                        <View className="w-8 h-8 rounded-full border border-white/30 items-center justify-center">
                          <Text className="text-white/60 text-sm">+</Text>
                        </View>
                      )}
                    </View>
                    <View className="bg-brand-surface px-4 py-3">
                      <Text className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-0.5">
                        {cat.tag}
                      </Text>
                      <Text className="text-brand-text text-xl font-bold">{cat.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer */}
        <View className="px-6 pb-10 pt-4">
          {/* Social proof */}
          <View className="flex-row items-center mb-5">
            <View className="flex-row">
              {['👩🏾', '👨🏿', '👩🏽', '👨🏾'].map((emoji, i) => (
                <View
                  key={i}
                  className="w-7 h-7 rounded-full bg-brand-surface border border-brand-bg items-center justify-center"
                  style={{ marginLeft: i > 0 ? -8 : 0 }}
                >
                  <Text style={{ fontSize: 12 }}>{emoji}</Text>
                </View>
              ))}
            </View>
            <Text className="text-brand-muted text-xs ml-3">
              Join 2.4k others in Nollywood today
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.9}
            disabled={selected.size < 1}
          >
            <LinearGradient
              colors={['#2D6A4F', '#3A7D5E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-4 rounded-full flex-row items-center justify-center"
            >
              <Text className="text-white font-bold text-base tracking-wide mr-2">
                Continue Journey
              </Text>
              <Text className="text-white text-base">›</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
