import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCreate = () => {
    // TODO: wire up Supabase auth in backend phase
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-brand-bg">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView contentContainerClassName="flex-grow px-8 py-6" keyboardShouldPersistTaps="handled">
            {/* Logo + wordmark */}
            <View className="items-center mb-10">
              <View className="w-16 h-16 rounded-2xl bg-brand-gold items-center justify-center mb-3 shadow-lg">
                <Text style={{ fontSize: 30 }}>⭐</Text>
              </View>
              <Text className="text-brand-text font-bold text-xl tracking-wide">Daily Naija Trivia</Text>
            </View>

            {/* Form card */}
            <View
              className="rounded-3xl p-8 border border-white/10"
              style={{ backgroundColor: 'rgba(26,33,24,0.9)' }}
            >
              <Text className="text-brand-text text-2xl font-bold text-center mb-1">
                Join the Archive
              </Text>
              <Text className="text-brand-muted text-sm text-center mb-8">
                Secure your place in the royal arena. Prestige awaits.
              </Text>

              {/* Full Name */}
              <Text className="text-brand-gold text-[10px] font-bold uppercase tracking-[3px] mb-2">
                Full Name
              </Text>
              <View className="bg-brand-surface rounded-xl flex-row items-center px-4 mb-5 border border-white/5">
                <Text className="text-brand-muted mr-3">👤</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Chidi Adebayo"
                  placeholderTextColor="#8A9A98"
                  className="flex-1 text-brand-text py-4 text-base"
                  autoCapitalize="words"
                />
              </View>

              {/* Email */}
              <Text className="text-brand-gold text-[10px] font-bold uppercase tracking-[3px] mb-2">
                Email Address
              </Text>
              <View className="bg-brand-surface rounded-xl flex-row items-center px-4 mb-5 border border-white/5">
                <Text className="text-brand-muted mr-3">✉️</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="chidi@archive.ng"
                  placeholderTextColor="#8A9A98"
                  className="flex-1 text-brand-text py-4 text-base"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <Text className="text-brand-gold text-[10px] font-bold uppercase tracking-[3px] mb-2">
                Password
              </Text>
              <View className="bg-brand-surface rounded-xl flex-row items-center px-4 mb-8 border border-white/5">
                <Text className="text-brand-muted mr-3">🔒</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••••"
                  placeholderTextColor="#8A9A98"
                  className="flex-1 text-brand-text py-4 text-base"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(v => !v)} className="p-1">
                  <Text className="text-brand-muted">{showPassword ? '🙈' : '👁'}</Text>
                </TouchableOpacity>
              </View>

              {/* CTA */}
              <TouchableOpacity onPress={handleCreate} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#F5C518', '#D4AF37']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="py-4 rounded-full flex-row items-center justify-center"
                >
                  <Text className="text-brand-bg font-bold text-base tracking-wide mr-2">
                    Create Account
                  </Text>
                  <Text className="text-brand-bg font-bold">→</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Back to login */}
              <View className="flex-row justify-center mt-5">
                <Text className="text-brand-muted text-sm">Already a member? </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="text-brand-gold font-bold text-sm">Back to Login</Text>
                </TouchableOpacity>
              </View>

              {/* Security note */}
              <View className="flex-row items-center justify-center mt-5">
                <Text className="text-brand-muted text-[10px] uppercase tracking-[2px]">
                  🛡 Secure Encrypted Authentication
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center space-x-8 mt-6">
              <Text className="text-brand-muted text-xs">📜 Heritage Verified</Text>
              <Text className="text-brand-muted text-xs">🛡 Privacy Protocol</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
