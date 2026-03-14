import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Mail, Lock, Eye, EyeOff, Star, ShieldCheck } from 'lucide-react-native';

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
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 28, paddingVertical: 24 }} keyboardShouldPersistTaps="handled">
            {/* Logo */}
            <View style={{ alignItems: 'center', marginBottom: 36 }}>
              <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: '#e9c349', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Star size={30} color="#0f1412" />
              </View>
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 18, letterSpacing: 0.5 }}>Daily Naija Trivia</Text>
            </View>

            {/* Form card */}
            <View style={{ backgroundColor: 'rgba(28,33,30,0.95)', borderRadius: 28, padding: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' }}>
              <Text style={{ color: '#dfe4e0', fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 4 }}>Join the Archive</Text>
              <Text style={{ color: '#89938f', fontSize: 13, textAlign: 'center', marginBottom: 28 }}>Secure your place in the royal arena. Prestige awaits.</Text>

              {/* Full Name */}
              <Text style={{ color: '#e9c349', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>Full Name</Text>
              <View style={{ backgroundColor: '#262b29', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 18 }}>
                <User size={18} color="#89938f" style={{ marginRight: 10 }} />
                <TextInput value={name} onChangeText={setName} placeholder="Chidi Adebayo" placeholderTextColor="#89938f" style={{ flex: 1, color: '#dfe4e0', paddingVertical: 14, fontSize: 15 }} autoCapitalize="words" />
              </View>

              {/* Email */}
              <Text style={{ color: '#e9c349', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>Email Address</Text>
              <View style={{ backgroundColor: '#262b29', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 18 }}>
                <Mail size={18} color="#89938f" style={{ marginRight: 10 }} />
                <TextInput value={email} onChangeText={setEmail} placeholder="chidi@archive.ng" placeholderTextColor="#89938f" style={{ flex: 1, color: '#dfe4e0', paddingVertical: 14, fontSize: 15 }} keyboardType="email-address" autoCapitalize="none" />
              </View>

              {/* Password */}
              <Text style={{ color: '#e9c349', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>Password</Text>
              <View style={{ backgroundColor: '#262b29', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 28 }}>
                <Lock size={18} color="#89938f" style={{ marginRight: 10 }} />
                <TextInput value={password} onChangeText={setPassword} placeholder="••••••••••••" placeholderTextColor="#89938f" style={{ flex: 1, color: '#dfe4e0', paddingVertical: 14, fontSize: 15 }} secureTextEntry={!showPassword} />
                <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={{ padding: 4 }}>
                  {showPassword ? <EyeOff size={18} color="#89938f" /> : <Eye size={18} color="#89938f" />}
                </TouchableOpacity>
              </View>

              {/* CTA */}
              <TouchableOpacity onPress={handleCreate} activeOpacity={0.9}>
                <LinearGradient colors={['#e9c349', '#b8962f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingVertical: 16, borderRadius: 999, alignItems: 'center' }}>
                  <Text style={{ color: '#0f1412', fontWeight: '900', fontSize: 16 }}>Create Account →</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 18 }}>
                <Text style={{ color: '#89938f', fontSize: 13 }}>Already a member? </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 13 }}>Back to Login</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 18, gap: 6 }}>
                <ShieldCheck size={14} color="#89938f" />
                <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2 }}>Secure Encrypted Authentication</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 28, marginTop: 20 }}>
              <Text style={{ color: '#89938f', fontSize: 11 }}>Heritage Verified</Text>
              <Text style={{ color: '#89938f', fontSize: 11 }}>Privacy Protocol</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
