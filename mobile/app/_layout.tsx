import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.hideAsync();

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, 
      gestureEnabled: true, 
      animation: 'slide_from_right',
      contentStyle: { 
        backgroundColor: '#f4f1eb',
        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        paddingTop: 10
      }
     }}  >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
