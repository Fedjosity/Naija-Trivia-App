import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Award, Zap, Clock, Film, Tv2, ChevronRight, User, BadgeCheck } from 'lucide-react-native';
import DrawerMenu, { type DrawerHandle } from '../../components/DrawerMenu';
import AppHeader from '../../components/AppHeader';

const TROPHIES = [
  { Icon: Shield, color: '#e9c349', name: "The Oba's Crown", desc: 'Awarded for 100% accuracy in the "Kingdoms of the South" series.', date: 'Oct 12, 2023' },
  { Icon: Tv2,    color: '#E05A00', name: 'Jollof Connoisseur', desc: 'Mastered the "Culinary Geography" challenge without a single mistake.', date: 'Sep 28, 2023' },
  { Icon: Film,   color: '#7B2FBE', name: 'Nollywood Legend', desc: 'Successfully identified 50 classic movies from the 90s era.', date: 'Aug 15, 2023' },
];

const MILESTONES = [
  { name: 'Afrobeats Titan', Icon: Zap },
  { name: 'State Explorer', Icon: Award },
  { name: 'Ancient Historian', Icon: Clock },
  { name: 'Super Eagle', Icon: Shield },
];

export default function ProfileScreen() {
  const router = useRouter();
  const drawer = useRef<DrawerHandle>(null);

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <DrawerMenu ref={drawer} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <AppHeader title="Trophy Room" drawerRef={drawer} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Avatar + Profile */}
          <View style={{ alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20 }}>
            <View style={{ position: 'relative', marginBottom: 16 }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#e9c349', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#e9c349' }}>
                <User size={38} color="#0f1412" />
              </View>
              <View style={{ position: 'absolute', bottom: -4, right: -4, backgroundColor: '#59de9b', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, borderWidth: 2, borderColor: '#0f1412' }}>
                <Text style={{ color: '#0f1412', fontSize: 9, fontWeight: '900' }}>LVL 42</Text>
              </View>
            </View>

            <Text style={{ color: '#dfe4e0', fontSize: 22, fontWeight: '900' }}>Tunde "The Oracle"</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <BadgeCheck size={16} color="#e9c349" />
              <Text style={{ color: '#89938f', fontSize: 13 }}>Grandmaster of Yoruba Folklore</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 32, marginTop: 20 }}>
              {[['12.4k', 'POINTS'], ['15', 'BADGES'], ['#3', 'RANK']].map(([val, label]) => (
                <View key={label} style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#dfe4e0', fontWeight: '900', fontSize: 20 }}>{val}</Text>
                  <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 2 }}>{label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Streak */}
          <View style={{ marginHorizontal: 20, marginBottom: 16, backgroundColor: '#1c211e', borderRadius: 20, padding: 20 }}>
            <Text style={{ color: '#89938f', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Current Streak</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 }}>
              <Text style={{ color: '#59de9b', fontWeight: '900', fontSize: 46 }}>28</Text>
              <Text style={{ color: '#dfe4e0', fontSize: 18, marginLeft: 8, marginBottom: 6 }}>Days</Text>
            </View>
            <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18, marginBottom: 14 }}>
              You're in the top 1% of players this month. Keep the fire burning to unlock the 'Ancient Historian' title.
            </Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {[1, 2, 3, 4].map(i => (
                <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < 4 ? '#59de9b' : '#262b29' }} />
              ))}
            </View>
          </View>

          {/* Vault Value */}
          <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
            <LinearGradient colors={['#e9c349', '#8B6914']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 20, padding: 22 }}>
              <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>Vault Value</Text>
              <Text style={{ color: '#0f1412', fontSize: 34, fontWeight: '900', marginBottom: 16 }}>₦85,200</Text>
              <TouchableOpacity
                onPress={() => router.push('/checkout')}
                style={{ backgroundColor: 'rgba(0,0,0,0.2)', paddingVertical: 12, borderRadius: 14, alignItems: 'center' }}
              >
                <Text style={{ color: '#0f1412', fontWeight: '800', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Redeem Prizes</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Trophy Timeline */}
          <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 18 }}>Trophy Timeline</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ color: '#e9c349', fontSize: 13, fontWeight: '700' }}>View All</Text>
                <ChevronRight size={14} color="#e9c349" />
              </TouchableOpacity>
            </View>
            {TROPHIES.map((trophy, i) => {
              const IconComp = trophy.Icon;
              return (
                <View key={trophy.name} style={{ flexDirection: 'row', marginBottom: 24 }}>
                  <View style={{ alignItems: 'center', marginRight: 16 }}>
                    <View style={{ width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: trophy.color, backgroundColor: `${trophy.color}22` }}>
                      <IconComp size={20} color={trophy.color} />
                    </View>
                    {i < TROPHIES.length - 1 && <View style={{ width: 1, flex: 1, backgroundColor: '#262b29', marginTop: 8 }} />}
                  </View>
                  <View style={{ flex: 1, paddingTop: 4 }}>
                    <Text style={{ color: '#dfe4e0', fontWeight: '700', fontSize: 15, marginBottom: 4 }}>{trophy.name}</Text>
                    <Text style={{ color: '#bfc9c4', fontSize: 12, lineHeight: 18, marginBottom: 4 }}>{trophy.desc}</Text>
                    <Text style={{ color: '#e9c349', fontSize: 11, fontWeight: '600' }}>{trophy.date}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Upcoming Milestones */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 18, marginBottom: 16 }}>Upcoming Milestones</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {MILESTONES.map(m => {
                const IconComp = m.Icon;
                return (
                  <View key={m.name} style={{ width: '47%', backgroundColor: '#1c211e', borderRadius: 20, padding: 20, alignItems: 'center', opacity: 0.45 }}>
                    <IconComp size={32} color="#bfc9c4" style={{ marginBottom: 10 }} />
                    <Text style={{ color: '#bfc9c4', fontSize: 12, textAlign: 'center' }}>{m.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
