import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-brand-bg">
      {/* Bokeh background gradient */}
      <LinearGradient
        colors={['#0D3B2E', '#1A2118', '#0D1410']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        className="absolute inset-0"
      />
      {/* Blurred orbs for bokeh effect */}
      <View className="absolute top-10 left-8 w-40 h-40 rounded-full bg-brand-green/20 blur-3xl" />
      <View className="absolute top-32 right-4 w-32 h-32 rounded-full bg-brand-gold/10 blur-3xl" />
      <View className="absolute bottom-40 left-16 w-48 h-48 rounded-full bg-brand-green/10 blur-3xl" />

      <SafeAreaView className="flex-1 justify-center px-6">
        <View className="items-center mb-8">
          <View className="w-28 h-28 rounded-[2rem] bg-black/40 items-center justify-center border border-white/10 p-2 shadow-2xl relative overflow-hidden">
            <Image 
              source={require('../../assets/logo/Logo.png')} 
              className="w-full h-full" 
              resizeMode="contain" 
            />
          </View>
        </View>

        {/* Glassmorphic Card */}
        <View
          className="rounded-3xl p-8 border border-white/10"
          style={{ backgroundColor: 'rgba(26,33,24,0.85)' }}
        >
          <Text className="text-brand-text text-3xl font-bold text-center mb-2">
            Claim Your Throne
          </Text>
          <Text className="text-brand-muted text-sm text-center leading-relaxed mb-8">
            Join the elite circle of Nigerian historians and pop-culture gurus.
          </Text>

          {/* Apple */}
          <TouchableOpacity
            className="bg-white py-4 rounded-full flex-row items-center justify-center mb-3"
            activeOpacity={0.85}
          >
            <Text className="mr-3 text-lg">🍎</Text>
            <Text className="text-black font-bold text-base">Sign in with Apple</Text>
          </TouchableOpacity>

          {/* Google */}
          <TouchableOpacity
            className="border border-brand-gold/50 py-4 rounded-full flex-row items-center justify-center mb-3"
            activeOpacity={0.85}
            style={{ backgroundColor: 'rgba(26,33,24,0.6)' }}
          >
            <Text className="mr-3 text-lg">🇬</Text>
            <Text className="text-brand-text font-bold text-base">Sign in with Google</Text>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity
            className="py-4 rounded-full flex-row items-center justify-center mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
            activeOpacity={0.85}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text className="mr-3 text-base">@</Text>
            <Text className="text-brand-text font-semibold text-base">Sign up with email</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-5">
            <View className="flex-1 h-px bg-white/10" />
            <Text className="text-brand-muted text-xs mx-4">OR</Text>
            <View className="flex-1 h-px bg-white/10" />
          </View>

          {/* Guest */}
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            className="items-center"
            activeOpacity={0.7}
          >
            <Text className="text-brand-gold font-semibold text-base">Continue as Guest</Text>
          </TouchableOpacity>
        </View>

        {/* Trust note */}
        <Text className="text-brand-muted text-xs text-center mt-4">
          🔒 Your data is secure and will never be shared.
        </Text>

        {/* Bottom stats */}
        <View className="flex-row justify-around mt-6">
          {[
            { value: '50K+', label: 'PLAYERS' },
            { value: '12', label: 'REGIONS' },
            { value: '2000+', label: 'QUESTIONS' },
          ].map(stat => (
            <View key={stat.label} className="items-center">
              <Text className="text-brand-gold text-2xl font-bold">{stat.value}</Text>
              <Text className="text-brand-muted text-[10px] tracking-wider">{stat.label}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}
