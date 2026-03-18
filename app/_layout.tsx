import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { AnalyticsService } from "../services/analytics";
import { RemoteConfigService } from "../services/remoteConfig";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    RemoteConfigService.initialize();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        AnalyticsService.setUser(user.uid, { email: user.email });
        console.log("Analytics User Set:", user.uid);
      }
    });

    import('../services/revenueCat').then(({ RevenueCatService }) => {
      RevenueCatService.initialize();
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right",
        }}
      >
        <Stack.Screen name="(auth)" options={{ animation: "ios_from_right" }} />
        <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
        <Stack.Screen
          name="gold"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="checkout"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
      </Stack>
    </>
  );
}
