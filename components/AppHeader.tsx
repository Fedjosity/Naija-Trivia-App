/**
 * AppHeader — shared header used across all 5 tabs.
 * Renders the hamburger button, screen title, and right-side actions.
 * Tapping the hamburger calls open() on the passed DrawerHandle ref.
 */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Menu, Bell, Search } from 'lucide-react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring,
} from 'react-native-reanimated';
import type { DrawerHandle } from './DrawerMenu';
import type { RefObject } from 'react';

interface AppHeaderProps {
  title: string;
  drawerRef: React.RefObject<DrawerHandle | null>;
  showSearch?: boolean;
  rightSlot?: React.ReactNode;
}

const SPRING = { damping: 22, stiffness: 240, mass: 0.7 };

export default function AppHeader({ title, drawerRef, showSearch, rightSlot }: AppHeaderProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleHamburger = () => {
    scale.value = withSpring(0.88, SPRING, () => { scale.value = withSpring(1, SPRING); });
    drawerRef.current?.open();
  };

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 20, paddingVertical: 14,
    }}>
      {/* Hamburger */}
      <Animated.View style={animStyle}>
        <TouchableOpacity
          onPress={handleHamburger}
          style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#59de9b', shadowOpacity: 0.1, shadowRadius: 10 }}
          activeOpacity={0.75}
        >
          <Image source={require('../assets/logo/Logo.png')} style={{ width: '85%', height: '85%' }} resizeMode="contain" />
        </TouchableOpacity>
      </Animated.View>

      {/* Title */}
      <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16, letterSpacing: -0.3 }}>
        {title}
      </Text>

      {/* Right slot */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {showSearch && (
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#262b29', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={18} color="#bfc9c4" />
          </TouchableOpacity>
        )}
        {rightSlot ?? (
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#262b29', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={18} color="#bfc9c4" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
