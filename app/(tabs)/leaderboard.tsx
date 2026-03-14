import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Star, ArrowUpDown, Info, Coins } from 'lucide-react-native';
import DrawerMenu, { type DrawerHandle } from '../../components/DrawerMenu';
import AppHeader from '../../components/AppHeader';

const TOP3 = [
  { rank: 1, name: 'Chukwudi', points: '15.8k', state: 'ANAMBRA', initial: 'C', color: '#e9c349' },
  { rank: 2, name: 'Adesua',   points: '12.4k', state: 'LAGOS',   initial: 'A', color: '#bfc9c4' },
  { rank: 3, name: 'Fatima',   points: '11.9k', state: 'KANO',    initial: 'F', color: '#cd7f32' },
];

const RANKS = [
  { rank: 4,  name: 'Obinna K.', state: 'EDO',   points: '9,842', up: true },
  { rank: 5,  name: 'Yemi A.',   state: 'OYO',   points: '9,210', up: false },
  { rank: 24, name: 'You (Tunde)', state: 'KWARA', points: '4,150', up: true, isMe: true },
  { rank: 25, name: 'Mustafa R.', state: 'KADUNA', points: '4,105', up: null },
];

function PodiumCard({ player, size }: { player: typeof TOP3[0]; size: 'large' | 'small' }) {
  const large = size === 'large';
  return (
    <View style={{ alignItems: 'center', marginHorizontal: large ? 12 : 6 }}>
      <View style={{ width: large ? 60 : 48, height: large ? 60 : 48, borderRadius: large ? 30 : 24, backgroundColor: '#262b29', alignItems: 'center', justifyContent: 'center', marginBottom: 8, borderWidth: 2, borderColor: player.color }}>
        <Text style={{ color: player.color, fontWeight: '900', fontSize: large ? 22 : 17 }}>{player.initial}</Text>
      </View>
      <View style={{ backgroundColor: player.rank === 1 ? 'rgba(233,195,73,0.15)' : '#1c211e', borderRadius: 14, paddingHorizontal: large ? 14 : 10, paddingVertical: 10, alignItems: 'center', minWidth: large ? 80 : 66 }}>
        <Text style={{ color: player.color, fontWeight: '900', fontSize: large ? 22 : 18 }}>{player.rank}</Text>
        <Text style={{ color: '#dfe4e0', fontWeight: '700', fontSize: large ? 13 : 11, marginTop: 2 }}>{player.name}</Text>
        <Text style={{ color: player.color, fontSize: 12, fontWeight: '700', marginTop: 1 }}>{player.points}</Text>
      </View>
      <View style={{ marginTop: 6, backgroundColor: '#262b29', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 }}>
        <Text style={{ color: '#89938f', fontSize: 9, letterSpacing: 1.5 }}>{player.state}</Text>
      </View>
    </View>
  );
}

export default function LeaderboardScreen() {
  const drawer = useRef<DrawerHandle>(null);
  const [search, setSearch] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <DrawerMenu ref={drawer} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <AppHeader title="The Prestige" drawerRef={drawer} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Subtitle */}
          <Text style={{ color: '#89938f', fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 24, letterSpacing: 0.3 }}>Honoring the guardians of Nigerian heritage</Text>

          {/* Podium */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 32 }}>
            <PodiumCard player={TOP3[1]} size="small" />
            <PodiumCard player={TOP3[0]} size="large" />
            <PodiumCard player={TOP3[2]} size="small" />
          </View>

          {/* Search */}
          <View style={{ marginHorizontal: 20, marginBottom: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c211e', borderRadius: 14, paddingHorizontal: 16, gap: 12 }}>
            <User size={18} color="#89938f" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search for champions..."
              placeholderTextColor="#89938f"
              style={{ flex: 1, color: '#dfe4e0', paddingVertical: 14, fontSize: 14 }}
            />
          </View>

          {/* Ranks */}
          <View style={{ paddingHorizontal: 20, gap: 10 }}>
            {RANKS.map(player => (
              <View key={player.rank} style={{
                flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20,
                backgroundColor: player.isMe ? 'rgba(89,222,155,0.08)' : '#1c211e',
                borderWidth: player.isMe ? 1 : 0,
                borderColor: player.isMe ? '#59de9b' : 'transparent',
                borderLeftWidth: player.isMe ? 3 : 0,
              }}>
                {/* Trend icon */}
                <View style={{ width: 36, alignItems: 'center' }}>
                  <ArrowUpDown size={12} color={player.up === true ? '#59de9b' : player.up === false ? '#ff6b6b' : '#89938f'} />
                  <Text style={{ color: player.isMe ? '#59de9b' : '#dfe4e0', fontWeight: '800', fontSize: 18, lineHeight: 22 }}>{player.rank}</Text>
                </View>
                {/* Avatar */}
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#262b29', alignItems: 'center', justifyContent: 'center', marginHorizontal: 12 }}>
                  <User size={20} color={player.isMe ? '#59de9b' : '#bfc9c4'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: player.isMe ? '#59de9b' : '#dfe4e0', fontWeight: '700', fontSize: 14 }}>{player.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                    <View style={{ backgroundColor: '#262b29', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 }}>
                      <Text style={{ color: '#89938f', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 }}>{player.state}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: player.isMe ? '#59de9b' : '#dfe4e0', fontWeight: '800', fontSize: 15 }}>{player.points}</Text>
                  <Text style={{ color: '#89938f', fontSize: 10 }}>POINTS</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Season Info */}
          <View style={{ marginHorizontal: 20, marginTop: 20, backgroundColor: '#1c1800', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(233,195,73,0.15)' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Info size={16} color="#e9c349" />
              <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 14 }}>Season of Kings</Text>
            </View>
            <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 19 }}>
              The current season ends in <Text style={{ color: '#dfe4e0', fontWeight: '700' }}>4 days</Text>. The Top 3 guardians will receive the exclusive{' '}
              <Text style={{ color: '#dfe4e0', fontStyle: 'italic' }}>"Orisha Gold"</Text> badge and a{' '}
              <Text style={{ color: '#dfe4e0', fontWeight: '700' }}>₦50,000 Boutique</Text> voucher.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
