import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 19, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1c211e',
          borderTopColor: '#262b29',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#59de9b',
        tabBarInactiveTintColor: '#8A9A98',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', letterSpacing: 0.4 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⊞" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🧭" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="boutique"
        options={{
          title: 'Boutique',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🛍" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Prestige',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏆" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Trophy Room',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎖" focused={focused} />,
        }}
      />
      {/* Arena is a gameplay page, not a tab */}
      <Tabs.Screen name="arena" options={{ href: null }} />
    </Tabs>
  );
}
