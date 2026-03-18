import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useRef } from 'react';
import { Star, Coins, Package, Zap, X as XIcon, SkipForward, Lightbulb, ShoppingBag } from 'lucide-react-native';
import { useNaijaStore } from '../../store/useNaijaStore';
import DrawerMenu, { type DrawerHandle } from '../../components/DrawerMenu';
import AppHeader from '../../components/AppHeader';

// ─── Stitch Design Tokens ─────────────────────────────────────────────────────
// surface: #0f1412 | surface_container: #1c211e | surface_container_high: #262b29
// primary: #59de9b | secondary/gold: #e9c349 | on_surface: #dfe4e0 | muted: #bfc9c4

const TABS = ['Packs', 'Avatar Skins', 'Boosters'];

const PACKS = [
  {
    id: 'heritage',
    title: 'The Heritage Vault',
    desc: '1,000+ curated questions spanning from the Benin Empire to Modern Lagos. Includes 5 Mystery Crates.',
    price: '₦2,500',
    badge: 'BESTSELLER',
    icon: '🏛',
    color: '#1a2e24',
  },
  {
    id: 'nollywood',
    title: 'Nollywood Giants',
    desc: 'Test your movie knowledge from the early home video era to the global blockbusters of today.',
    price: '₦1,500',
    badge: 'POPULAR',
    icon: '🎬',
    color: '#2a1a2e',
  },
  {
    id: 'sports',
    title: 'Sports Legends',
    desc: 'Relive the 1994 glory, the Olympic golds, and current Premier League icons. For the ultimate fans.',
    price: '₦1,500',
    badge: 'HOT',
    icon: '⚽',
    color: '#1a2030',
  },
  {
    id: 'states',
    title: '36 States Tour',
    desc: 'Geography, landmarks, and local delicacies from every corner of the Federation.',
    price: '₦1,800',
    icon: '🗺',
    color: '#1a1a2a',
  },
  {
    id: 'afrobeats',
    title: 'Afrobeats Pulse',
    desc: "From Fela's shrine to Burna's arenas. The rhythm of the nation in 500 questions.",
    price: '₦1,500',
    badge: 'NEW',
    icon: '🎵',
    color: '#2a1512',
  },
];

const AVATARS = [
  { id: 'eagle', name: 'Golden Eagle', price: '₦800', icon: '🦅', color: '#1a2118' },
  { id: 'lion', name: 'Savannah Lion', price: '₦800', icon: '🦁', color: '#2a1a10' },
  { id: 'crown', name: 'Royal Crown', price: 'GOLD', icon: '👑', color: '#2a2010' },
  { id: 'mask', name: 'Benin Mask', price: '₦1,200', icon: '🎭', color: '#1a0a2a' },
];

export default function BoutiqueScreen() {
  const router = useRouter();
  const drawer = useRef<DrawerHandle>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { wallet } = useNaijaStore();

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <DrawerMenu ref={drawer} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <AppHeader
          title="The Boutique"
          drawerRef={drawer}
          rightSlot={
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1c211e', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 }}>
              <Coins size={14} color="#e9c349" />
              <Text style={{ color: '#e9c349', fontSize: 12, fontWeight: '700' }}>{wallet.naijaCoins.toLocaleString()}</Text>
            </View>
          }
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Naija Gold Promo Banner */}
          <LinearGradient
            colors={['#3d3000', '#1c1800']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 24 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                  <Star size={20} color="#e9c349" />
                  <Text style={{ color: '#e9c349', fontWeight: '800', fontSize: 18 }}>Naija Gold</Text>
                </View>
                <Text style={{ color: '#dfe4e0', fontSize: 13, lineHeight: 20, marginBottom: 14 }}>
                  Unlock unlimited arena entries, double coin rewards, and the legendary Golden Eagle avatar frame. Cancel anytime.
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/gold')}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <LinearGradient
                    colors={['#e9c349', '#b8962f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999 }}
                  >
                    <Text style={{ color: '#0f1412', fontWeight: '800', fontSize: 13 }}>Join the Elite →</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(233,195,73,0.15)', marginLeft: 12 }}>
                <Star size={28} color="#e9c349" />
              </View>
            </View>
          </LinearGradient>

          {/* Tabs */}
          <View style={{ flexDirection: 'row', marginHorizontal: 20, marginBottom: 20, backgroundColor: '#1c211e', borderRadius: 12, padding: 4 }}>
            {TABS.map((tab, i) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(i)}
                style={{
                  flex: 1,
                  paddingVertical: 9,
                  borderRadius: 9,
                  alignItems: 'center',
                  backgroundColor: activeTab === i ? '#262b29' : 'transparent',
                }}
              >
                <Text style={{ color: activeTab === i ? '#59de9b' : '#bfc9c4', fontSize: 12, fontWeight: '700' }}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Starter Bundle Deal */}
          {activeTab === 0 && (
            <View style={{ marginHorizontal: 20, marginBottom: 20, backgroundColor: '#1a2e24', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: 'rgba(89,222,155,0.2)' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={{ backgroundColor: '#59de9b', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999, marginRight: 8 }}>
                  <Text style={{ color: '#0f1412', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }}>BUNDLE SALE</Text>
                </View>
              </View>
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 15, marginBottom: 4 }}>Starter Bundle Sale</Text>
              <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18, marginBottom: 14 }}>
                New to the Arena? Get 3 packs (Heritage, Nollywood, Sports) for the price of one. Limited time only!
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/checkout')}
                style={{ backgroundColor: '#59de9b', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
              >
                <Text style={{ color: '#0f1412', fontWeight: '800', fontSize: 14 }}>Get Bundle — ₦2,500</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Pack Cards */}
          {activeTab === 0 && (
            <View style={{ paddingHorizontal: 20 }}>
              {PACKS.map(pack => (
                <View key={pack.id} style={{ backgroundColor: '#1c211e', borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
                  {/* Color header */}
                  <View style={{ backgroundColor: pack.color, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 44 }}>{pack.icon}</Text>
                  </View>
                  <View style={{ padding: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16, flex: 1 }}>{pack.title}</Text>
                      {pack.badge && (
                        <View style={{ backgroundColor: 'rgba(89,222,155,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, marginLeft: 8 }}>
                          <Text style={{ color: '#59de9b', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>{pack.badge}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18, marginBottom: 14 }}>{pack.desc}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#e9c349', fontWeight: '800', fontSize: 18 }}>{pack.price}</Text>
                      <TouchableOpacity
                        onPress={() => router.push('/checkout')}
                        style={{ backgroundColor: '#59de9b', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 }}
                      >
                        <Text style={{ color: '#0f1412', fontWeight: '800', fontSize: 13 }}>Buy Pack</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Avatar Skins */}
          {activeTab === 1 && (
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {AVATARS.map(av => (
                  <View key={av.id} style={{ width: '47%', backgroundColor: av.color, borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}>
                    <Text style={{ fontSize: 48, marginBottom: 10 }}>{av.icon}</Text>
                    <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 14, marginBottom: 4, textAlign: 'center' }}>{av.name}</Text>
                    <View style={{ marginTop: 10, backgroundColor: av.price === 'GOLD' ? 'rgba(233,195,73,0.15)' : 'rgba(89,222,155,0.15)', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999 }}>
                      <Text style={{ color: av.price === 'GOLD' ? '#e9c349' : '#59de9b', fontWeight: '800', fontSize: 13 }}>
                        {av.price === 'GOLD' ? '⭐ Gold Only' : av.price}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Boosters */}
          {activeTab === 2 && (
            <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
              {[
                { Icon: Zap,         name: 'Time Freeze', desc: 'Pause the countdown for 10 seconds', price: '₦200', qty: 'x3' },
                { Icon: XIcon,       name: 'Eliminate 2', desc: 'Remove two wrong answers from the board', price: '₦150', qty: 'x5' },
                { Icon: SkipForward, name: 'Skip Question', desc: 'Skip any question without penalty', price: '₦250', qty: 'x2' },
                { Icon: Package,     name: 'Double XP', desc: 'Earn twice the experience for one full game', price: '₦500', qty: 'x1' },
              ].map(b => (
                <View key={b.name} style={{ backgroundColor: '#1c211e', borderRadius: 20, padding: 16, marginBottom: 14, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: '#262b29', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                    <b.Icon size={24} color="#59de9b" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 14 }}>{b.name}</Text>
                    <Text style={{ color: '#bfc9c4', fontSize: 11, marginTop: 2 }}>{b.desc}</Text>
                    <Text style={{ color: '#89938f', fontSize: 11, marginTop: 2 }}>Owned: {b.qty}</Text>
                  </View>
                  <TouchableOpacity style={{ backgroundColor: '#262b29', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12 }}>
                    <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 13 }}>{b.price}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Daily Gold Nugget */}
          <View style={{ marginHorizontal: 20, marginTop: 8, backgroundColor: '#1c1800', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(233,195,73,0.15)' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Lightbulb size={14} color="#e9c349" />
              <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 12 }}>Daily Gold Nugget</Text>
            </View>
            <Text style={{ color: '#bfc9c4', fontSize: 12, fontStyle: 'italic', lineHeight: 18 }}>
              "Did you know Nigeria has over 500 ethnic groups and languages?"
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
