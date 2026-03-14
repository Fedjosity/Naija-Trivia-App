/**
 * DrawerMenu — slides in from the left over the screen.
 * Uses react-native-reanimated for a spring-based iOS-quality open/close.
 *
 * Usage:
 *   const drawer = useRef<DrawerHandle>(null);
 *   <DrawerMenu ref={drawer} />
 *   drawer.current?.open()
 */
import {
  View, Text, TouchableOpacity, Dimensions, Pressable,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withTiming,
  interpolate, Extrapolation,
} from 'react-native-reanimated';
import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Home, Compass, ShoppingBag, Trophy, Medal,
  Star, User, Settings, LogOut, ChevronRight,
  Bell, HelpCircle, X,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: W } = Dimensions.get('window');
const DRAWER_W = W * 0.82;

const SPRING = { damping: 22, stiffness: 200, mass: 0.8 };

export interface DrawerHandle {
  open: () => void;
  close: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', icon: Home, href: '/(tabs)' as const },
  { label: 'Discover', icon: Compass, href: '/(tabs)/explorer' as const },
  { label: 'Boutique', icon: ShoppingBag, href: '/(tabs)/boutique' as const },
  { label: 'Prestige', icon: Trophy, href: '/(tabs)/leaderboard' as const },
  { label: 'Trophy Room', icon: Medal, href: '/(tabs)/profile' as const },
  { label: 'Naija Gold', icon: Star, href: '/gold' as const },
];

const BOTTOM_ITEMS = [
  { label: 'Notifications', icon: Bell },
  { label: 'Help & Support', icon: HelpCircle },
  { label: 'Settings', icon: Settings },
];

const DrawerMenu = forwardRef<DrawerHandle>((_, ref) => {
  const router = useRouter();
  const pathname = usePathname();
  const translateX = useSharedValue(-DRAWER_W);
  const overlayOpacity = useSharedValue(0);
  const [visible, setVisible] = useState(false);

  const open = () => {
    setVisible(true);
    translateX.value = withSpring(0, SPRING);
    overlayOpacity.value = withTiming(1, { duration: 280 });
  };

  const close = () => {
    translateX.value = withSpring(-DRAWER_W, SPRING);
    overlayOpacity.value = withTiming(0, { duration: 220 });
    setTimeout(() => setVisible(false), 300);
  };

  useImperativeHandle(ref, () => ({ open, close }));

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  if (!visible) return null;

  return (
    <View style={{ position: 'absolute', inset: 0, zIndex: 999 }}>
      {/* Scrim */}
      <Animated.View
        style={[{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }, overlayStyle]}
      >
        <Pressable style={{ flex: 1 }} onPress={close} />
      </Animated.View>

      {/* Panel */}
      <Animated.View style={[{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: DRAWER_W, backgroundColor: '#1c211e',
      }, drawerStyle]}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 }}>
            <View>
              <Text style={{ color: '#dfe4e0', fontWeight: '900', fontSize: 18, letterSpacing: -0.5 }}>Daily Naija Trivia</Text>
              <Text style={{ color: '#89938f', fontSize: 12, marginTop: 2 }}>Navigate the Archive</Text>
            </View>
            <TouchableOpacity
              onPress={close}
              style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#262b29', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} color="#bfc9c4" />
            </TouchableOpacity>
          </View>

          {/* Profile card */}
          <View style={{ marginHorizontal: 20, marginBottom: 24, backgroundColor: '#262b29', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#e9c349', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <User size={22} color="#0f1412" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 14 }}>Tunde "The Oracle"</Text>
              <Text style={{ color: '#89938f', fontSize: 11, marginTop: 1 }}>Grandmaster · 12.4k pts</Text>
            </View>
            <ChevronRight size={18} color="#89938f" />
          </View>

          {/* Nav items */}
          <View style={{ paddingHorizontal: 12, flex: 1 }}>
            {NAV_ITEMS.map(item => {
              const IconComp = item.icon;
              const isActive = pathname === item.href || (item.href === '/(tabs)' && pathname === '/');
              return (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => { close(); router.push(item.href); }}
                  style={{
                    flexDirection: 'row', alignItems: 'center',
                    paddingVertical: 13, paddingHorizontal: 14,
                    borderRadius: 14, marginBottom: 2,
                    backgroundColor: isActive ? 'rgba(89,222,155,0.1)' : 'transparent',
                  }}
                >
                  <IconComp
                    size={20}
                    color={item.label === 'Naija Gold' ? '#e9c349' : isActive ? '#59de9b' : '#bfc9c4'}
                  />
                  <Text style={{
                    marginLeft: 14, fontSize: 15, fontWeight: isActive ? '800' : '600',
                    color: item.label === 'Naija Gold' ? '#e9c349' : isActive ? '#59de9b' : '#dfe4e0',
                  }}>
                    {item.label}
                  </Text>
                  {item.label === 'Naija Gold' && (
                    <View style={{ marginLeft: 'auto', backgroundColor: '#e9c349', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 }}>
                      <Text style={{ color: '#0f1412', fontSize: 9, fontWeight: '800' }}>UPGRADE</Text>
                    </View>
                  )}
                  {isActive && item.label !== 'Naija Gold' && (
                    <View style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: 3, backgroundColor: '#59de9b' }} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bottom items */}
          <View style={{ paddingHorizontal: 12, paddingBottom: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', marginTop: 8, paddingTop: 16 }}>
            {BOTTOM_ITEMS.map(item => {
              const IconComp = item.icon;
              return (
                <TouchableOpacity
                  key={item.label}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14 }}
                >
                  <IconComp size={18} color="#89938f" />
                  <Text style={{ marginLeft: 14, color: '#89938f', fontSize: 14, fontWeight: '600' }}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14 }}>
              <LogOut size={18} color="#ff6b6b" />
              <Text style={{ marginLeft: 14, color: '#ff6b6b', fontSize: 14, fontWeight: '600' }}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
});

DrawerMenu.displayName = 'DrawerMenu';
export default DrawerMenu;
