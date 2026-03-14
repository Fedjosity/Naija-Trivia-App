import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-brand-bg">
      {/* Ankara Diamond Pattern Background */}
      <View className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <View
              key={`${row}-${col}`}
              style={{
                position: 'absolute',
                top: row * 80 - 20,
                left: col * 80 - 20,
                width: 60,
                height: 60,
                transform: [{ rotate: '45deg' }],
                borderWidth: 1,
                borderColor: '#D4AF37',
              }}
            />
          ))
        )}
      </View>

      {/* Top nav */}
      <SafeAreaView className="flex-1">
        <View className="flex-row justify-between items-center px-6 pt-2">
          <TouchableOpacity className="w-9 h-9 items-center justify-center">
            <View className="space-y-1.5">
              <View className="w-5 h-0.5 bg-brand-text" />
              <View className="w-5 h-0.5 bg-brand-text" />
              <View className="w-5 h-0.5 bg-brand-text" />
            </View>
          </TouchableOpacity>
          <Text className="text-brand-text font-bold text-base">Daily Naija Trivia</Text>
          <TouchableOpacity className="w-9 h-9 rounded-full bg-brand-surface items-center justify-center">
            <Text className="text-brand-muted text-xs">👤</Text>
          </TouchableOpacity>
        </View>

        {/* Hero arch image */}
        <View className="mx-6 mt-6" style={{ borderRadius: 999, overflow: 'hidden', height: width * 1.05 }}>
          <LinearGradient
            colors={['#2D6A4F', '#D4AF37', '#8B6914']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 items-center justify-center"
          >
            {/* City skyline placeholder */}
            <View className="items-center justify-end flex-1 pb-8 w-full px-6">
              <View className="flex-row items-end justify-center space-x-1 w-full">
                {[40, 70, 55, 90, 65, 80, 45, 60, 75, 50].map((h, i) => (
                  <View
                    key={i}
                    className="bg-black/40 rounded-t-sm"
                    style={{ height: h, width: (width - 80) / 11 }}
                  />
                ))}
              </View>
              {/* Reflection */}
              <View className="w-full h-16 bg-brand-gold/10 mt-1 rounded-b-lg" />
            </View>
          </LinearGradient>
        </View>

        {/* Content */}
        <View className="px-8 mt-8 flex-1">
          <Text className="text-brand-green text-xs font-bold uppercase tracking-[4px] mb-2">
            The Journey Begins
          </Text>
          <Text className="text-brand-text text-4xl font-bold leading-tight mb-4">
            Welcome to{'\n'}the Culture
          </Text>
          <Text className="text-brand-muted text-base leading-relaxed">
            Dive into the heart of Africa's giant. Experience history, art, and wisdom through the lens of Nigeria's most elite trivia collection.
          </Text>
        </View>

        {/* CTA + Dots */}
        <View className="px-8 pb-10">
          <TouchableOpacity
            onPress={() => router.push('/(auth)/categories')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#1A2118', '#1A2118']}
              className="flex-row items-center justify-between rounded-full px-6 py-4 border border-brand-green/30"
            >
              <Text className="text-brand-gold font-bold text-sm uppercase tracking-widest">
                Continue to Arena
              </Text>
              <View className="w-10 h-10 rounded-full bg-brand-green items-center justify-center">
                <Text className="text-white text-lg">→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Progress dots */}
          <View className="flex-row justify-center space-x-2 mt-6">
            <View className="w-8 h-1.5 rounded-full bg-brand-green" />
            <View className="w-2 h-1.5 rounded-full bg-brand-surface" />
            <View className="w-2 h-1.5 rounded-full bg-brand-surface" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
