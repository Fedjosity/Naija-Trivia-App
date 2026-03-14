import { Tabs } from 'expo-router';
import { Text } from 'react-native';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A2118',
          borderTopColor: '#233022',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#8A9A98',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⊞" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="arena"
        options={{
          title: 'Arena',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎮" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Explorer',
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
          title: 'Leaderboard',
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
    </Tabs>
  );
}
