import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        
        tabBarActiveTintColor: "#3B82F6", // Bleu
        tabBarInactiveTintColor: "#6B7280", // Gris
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          marginBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 8,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
    
      
      <Tabs.Screen 
        name="products" 
        options={{
          title: "Produits",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "grid" : "grid-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
    
        <Tabs.Screen 
        name="home" 
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name="history" 
        options={{
          title: "Historique",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "time" : "time-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
       <Tabs.Screen 
        name="profile" 
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
    </Tabs>
  );
}