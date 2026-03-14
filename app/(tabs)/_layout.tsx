import { Tabs } from 'expo-router';
import { Home, Compass, ShoppingBag, Trophy, Medal } from 'lucide-react-native';

// ─── Stitch Tokens ───────────────────────────────────────────────────────────
const ACTIVE   = '#59de9b'; // primary
const INACTIVE = '#89938f'; // outline
const TAB_BG   = '#1c211e'; // surface_container
const TAB_BORDER = 'rgba(255,255,255,0.06)';

function TabIcon({ Icon, focused }: { Icon: React.ComponentType<{ size: number; color: string }>; focused: boolean }) {
  return <Icon size={22} color={focused ? ACTIVE : INACTIVE} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: TAB_BG,
          borderTopColor: TAB_BORDER,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', letterSpacing: 0.3 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Home} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Compass} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="boutique"
        options={{
          title: 'Boutique',
          tabBarIcon: ({ focused }) => <TabIcon Icon={ShoppingBag} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Prestige',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Trophy} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Trophy Room',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Medal} focused={focused} />,
        }}
      />
      {/* Arena is a gameplay page, not a tab */}
      <Tabs.Screen name="arena" options={{ href: null }} />
    </Tabs>
  );
}
