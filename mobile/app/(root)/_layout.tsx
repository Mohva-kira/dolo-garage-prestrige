import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false,
      gestureEnabled: true, 
     }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="productDetails" options={{ headerShown: false }} />

    </Stack>
  );
}
