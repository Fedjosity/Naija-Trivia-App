import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Compass, ShoppingBag, Trophy, Medal } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// ─── Stitch Tokens ───────────────────────────────────────────────────────────
const ACTIVE = "#59de9b"; // primary
const INACTIVE = "#89938f"; // outline
const TAB_BG = "#1c211e"; // surface_container
const TAB_BORDER = "rgba(255,255,255,0.06)";

const TABS = [
  { name: 'index', label: 'Home', Icon: Home, path: '/' },
  { name: 'explorer', label: 'Discover', Icon: Compass, path: '/explorer' },
  { name: 'boutique', label: 'Boutique', Icon: ShoppingBag, path: '/boutique' },
  { name: 'leaderboard', label: 'Prestige', Icon: Trophy, path: '/leaderboard' },
  { name: 'profile', label: 'Room', Icon: Medal, path: '/profile' },
];

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const getIsActive = (tabPath: string) => {
    if (tabPath === '/') return pathname === '/' || pathname === '/(tabs)';
    return pathname.includes(tabPath);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      {TABS.map((tab) => {
        const isActive = getIsActive(tab.path);
        const Icon = tab.Icon;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => {
              // We use replace to keep the history clean, 
              // and the Stack layout will handle the "sliding" if we configure it
              router.replace(`/(tabs)${tab.path === '/' ? '' : tab.path}`);
            }}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Icon size={22} color={isActive ? ACTIVE : INACTIVE} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <Animated.View 
                  entering={FadeIn.duration(200)}
                  style={styles.activeIndicator} 
                />
              )}
            </View>
            <Text style={[styles.label, { color: isActive ? ACTIVE : INACTIVE }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: TAB_BG,
    borderTopWidth: 1,
    borderTopColor: TAB_BORDER,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: ACTIVE,
  }
});
