import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="gold" options={{ presentation: 'modal' }} />
        <Stack.Screen name="checkout" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
