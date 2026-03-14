import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

type PayMethod = 'card' | 'apple' | 'google';

const FEATURES = [
  'Unlimited arena entries',
  'Double coin rewards',
  'Golden Eagle avatar frame',
  'Exclusive leaderboard badge',
  'Ad-free experience',
  'Access to 500+ expert packs',
];

const PAYMENT_OPTIONS: { id: PayMethod; label: string; sub: string; icon: string }[] = [
  { id: 'card', label: 'Credit or Debit Card', sub: 'Visa, Mastercard, Verve', icon: '💳' },
  { id: 'apple', label: 'Apple Pay', sub: 'Use Touch ID or Face ID', icon: '🍎' },
  { id: 'google', label: 'Google Pay', sub: 'Quick & secure checkout', icon: '🇬' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const [payMethod, setPayMethod] = useState<PayMethod>('card');

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, backgroundColor: '#1c211e', borderRadius: 12, marginRight: 14 }}>
              <Text style={{ color: '#dfe4e0', fontSize: 16 }}>←</Text>
            </TouchableOpacity>
            <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 18 }}>Complete Your Purchase</Text>
          </View>

          {/* Premium tag */}
          <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <View style={{ backgroundColor: 'rgba(233,195,73,0.12)', paddingHorizontal: 14, paddingVertical: 5, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(233,195,73,0.25)' }}>
              <Text style={{ color: '#e9c349', fontSize: 11, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase' }}>⭐  Premium Upgrade</Text>
            </View>
          </View>

          {/* Purchase Summary Card */}
          <View style={{ marginHorizontal: 20, marginTop: 16, backgroundColor: '#1c211e', borderRadius: 24, overflow: 'hidden' }}>
            <LinearGradient
              colors={['#2a2200', '#1c211e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ padding: 24 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Text style={{ fontSize: 28, marginRight: 10 }}>⭐</Text>
                <View>
                  <Text style={{ color: '#dfe4e0', fontWeight: '900', fontSize: 20 }}>Naija Gold Monthly</Text>
                  <Text style={{ color: '#bfc9c4', fontSize: 12 }}>Full access to all regional leagues</Text>
                </View>
              </View>

              <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 18 }} />

              {/* Features checklist */}
              {FEATURES.map((f, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(89,222,155,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <Text style={{ color: '#59de9b', fontSize: 11, fontWeight: '700' }}>✓</Text>
                  </View>
                  <Text style={{ color: '#bfc9c4', fontSize: 13 }}>{f}</Text>
                </View>
              ))}

              <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 18 }} />

              {/* Price */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View>
                  <Text style={{ color: '#89938f', fontSize: 11, textDecorationLine: 'line-through' }}>₦1,500/month</Text>
                  <Text style={{ color: '#e9c349', fontWeight: '900', fontSize: 28 }}>FREE</Text>
                  <Text style={{ color: '#89938f', fontSize: 11 }}>7-day trial · then ₦1,500/mo</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                    <Text style={{ color: '#bfc9c4', fontSize: 10, textAlign: 'center' }}>🔒{'\n'}Secure</Text>
                  </View>
                  <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                    <Text style={{ color: '#bfc9c4', fontSize: 10, textAlign: 'center' }}>✓{'\n'}Verified</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Payment Method */}
          <View style={{ marginHorizontal: 20, marginTop: 24 }}>
            <Text style={{ color: '#89938f', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 }}>
              Select Payment Method
            </Text>
            {PAYMENT_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.id}
                onPress={() => setPayMethod(opt.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#1c211e',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 10,
                  borderWidth: 1.5,
                  borderColor: payMethod === opt.id ? '#59de9b' : 'transparent',
                }}
              >
                {/* Radio */}
                <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: payMethod === opt.id ? '#59de9b' : '#3f4945', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                  {payMethod === opt.id && (
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#59de9b' }} />
                  )}
                </View>
                <Text style={{ fontSize: 22, marginRight: 12 }}>{opt.icon}</Text>
                <View>
                  <Text style={{ color: '#dfe4e0', fontWeight: '700', fontSize: 14 }}>{opt.label}</Text>
                  <Text style={{ color: '#89938f', fontSize: 11, marginTop: 1 }}>{opt.sub}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Legal */}
          <Text style={{ color: '#89938f', fontSize: 11, textAlign: 'center', marginHorizontal: 24, marginTop: 16, lineHeight: 17 }}>
            By clicking "Confirm Purchase", you agree to our Terms of Service. Subscription will renew automatically until cancelled.
          </Text>

          {/* Confirm CTA */}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#e9c349', '#b8962f']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 18, borderRadius: 999, alignItems: 'center' }}
              >
                <Text style={{ color: '#0f1412', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 }}>
                  Confirm Purchase →
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
