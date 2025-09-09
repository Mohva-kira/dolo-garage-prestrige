import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false,
      gestureEnabled: true, 
      animation: 'slide_from_right',
      contentStyle: { 
        backgroundColor: '#f4f1eb', // couleur globale voulue
        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        paddingTop: 10
      }
     }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="productDetails" options={{ headerShown: false }} />
      <Stack.Screen name="cart" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />

    </Stack>
  );
}
