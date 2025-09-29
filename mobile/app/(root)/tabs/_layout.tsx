import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, Text } from "react-native";

export default function Layout() {
  const badgeCount = 3; // ajuster dynamiquement si besoin

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 28 : 20,
          left: 20,
          right: 20,
          height: Platform.OS === "ios" ? 80 : 70,
          borderRadius: 30,
          
          backgroundColor: "rgba(0, 0, 0, 0.1)", // Sombre semi-transparent
          paddingHorizontal: 18,
          paddingTop: 10,
          shadowColor: "#D3D3D3",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 10,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 64, alignItems: "center", justifyContent: "center" }}>
              {focused ? (
                <>
                  {/* Rond principal qui dépasse vers le bas (fond blanc) */}
                  <View
                    style={{
                      position: "absolute",
                      top: -50, // positionne le rond en partie sous la barre
                      
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      backgroundColor: "#FFFFFF",
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.12,
                      shadowRadius: 12,
                      elevation: 8,
                    }}
                  >
                    <Ionicons name="home" size={28} color="#3B82F6" />
                  </View>

                  {/* Petite jonction arrondie pour masquer la transition */}
                  <View
                    style={{
                      position: "absolute",
                      top: -6,
                      width: 40,
                      height: 20,
                      backgroundColor: "transparent",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  />
                </>
              ) : (
                <Ionicons name="home-outline" size={24} color="#9CA3AF" />
              )}
            </View>
          ),
        }}
      />

<Tabs.Screen
  name="products"
  options={{
    title: "Produits",
    tabBarIcon: ({ focused }) => (
      <View style={{ width: 64, alignItems: "center", justifyContent: "center" }}>
        {focused ? (
          <>
            <View
              style={{
                position: "absolute",
                top: -50,
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="grid" size={28} color="#3B82F6" />
            </View>
            <View
              style={{
                position: "absolute",
                top: -6,
                width: 40,
                height: 20,
                backgroundColor: "transparent",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          </>
        ) : (
          <Ionicons name="grid-outline" size={24} color="#9CA3AF" />
        )}
      </View>
    ),
  }}
/>

<Tabs.Screen
  name="chat"
  options={{
    title: "Messages",
    tabBarIcon: ({ focused }) => (
      <View style={{ width: 64, alignItems: "center", justifyContent: "center" }}>
        {focused ? (
          <>
            <View
              style={{
                position: "absolute",
                top: -50,
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="chatbubble" size={28} color="#3B82F6" />
            </View>
            <View
              style={{
                position: "absolute",
                top: -6,
                width: 40,
                height: 20,
                backgroundColor: "transparent",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          </>
        ) : (
          <>
            <Ionicons name="chatbubble-outline" size={24} color="#9CA3AF" />
            {/* Badge quand non sélectionné */}
            {badgeCount > 0 && (
              <View style={{ position: "absolute", top: -8, right: 6, backgroundColor: "#EF4444", width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>{badgeCount}</Text>
              </View>
            )}
          </>
        )}
      </View>
    ),
  }}
/>

<Tabs.Screen
  name="history"
  options={{
    title: "Historique",
    tabBarIcon: ({ focused }) => (
      <View style={{ width: 64, alignItems: "center", justifyContent: "center" }}>
        {focused ? (
          <>
            <View
              style={{
                position: "absolute",
                top: -50,
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="time" size={28} color="#3B82F6" />
            </View>
            <View
              style={{
                position: "absolute",
                top: -6,
                width: 40,
                height: 20,
                backgroundColor: "transparent",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          </>
        ) : (
          <Ionicons name="time-outline" size={24} color="#9CA3AF" />
        )}
      </View>
    ),
  }}
/>

<Tabs.Screen
  name="profile"
  options={{
    title: "Profil",
    tabBarIcon: ({ focused }) => (
      <View style={{ width: 64, alignItems: "center", justifyContent: "center" }}>
        {focused ? (
          <>
            <View
              style={{
                position: "absolute",
                top: -50,
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="person" size={28} color="#3B82F6" />
            </View>
            <View
              style={{
                position: "absolute",
                top: -6,
                width: 40,
                height: 20,
                backgroundColor: "transparent",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          </>
        ) : (
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
        )}
      </View>
    ),
  }}
/>
    </Tabs>
  );
}