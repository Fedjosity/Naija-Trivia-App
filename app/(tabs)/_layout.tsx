import { Stack } from "expo-router";
import { View } from "react-native";
import BottomTabBar from "../../components/BottomTabBar";

// ─── Stitch Tokens ───────────────────────────────────────────────────────────
const ACTIVE = "#59de9b"; // primary
const INACTIVE = "#89938f"; // outline
const TAB_BG = "#1c211e"; // surface_container
const TAB_BORDER = "rgba(255,255,255,0.06)";

function TabIcon({
  Icon,
  focused,
}: {
  Icon: React.ComponentType<{ size: number; color: string }>;
  focused: boolean;
}) {
  return <Icon size={22} color={focused ? ACTIVE : INACTIVE} />;
}

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0b0e0c" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: "#0b0e0c" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="explorer" />
        <Stack.Screen name="boutique" />
        <Stack.Screen name="leaderboard" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="arena" />
      </Stack>

      <BottomTabBar />
    </View>
  );
}
