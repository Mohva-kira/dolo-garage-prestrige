import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Pages de checkout
const CartStep = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-lg font-semibold">Étape 1: Panier</Text>
    <Text className="text-gray-600 mt-2">Vérifiez vos articles</Text>
  </View>
);

const PaymentStep = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-lg font-semibold">Étape 2: Paiement</Text>
    <Text className="text-gray-600 mt-2">Choisissez votre mode de paiement</Text>
  </View>
);

const ConfirmationStep = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-lg font-semibold">Étape 3: Confirmation</Text>
    <Text className="text-gray-600 mt-2">Commande confirmée</Text>
  </View>
);

// Stack Navigator
const CheckoutStack = createStackNavigator();

const CheckoutNavigator = () => (
  <NavigationContainer independent={true}>
    <CheckoutStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <CheckoutStack.Screen name="Cart" component={CartStep} />
      <CheckoutStack.Screen name="Payment" component={PaymentStep} />
      <CheckoutStack.Screen name="Confirmation" component={ConfirmationStep} />
    </CheckoutStack.Navigator>
  </NavigationContainer>
);

const CheckoutLayout = ({
  children,
  title = "Checkout",
  subtitle,
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        <View className="relative flex-1 bg-slate-100">
          
          {/* Header avec bouton retour */}
          <View 
            className="flex-row absolute z-10 items-center justify-start px-5" 
            style={{ width: "100%", paddingTop: 50 }}
          >
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/70 items-center justify-center mb-2"
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

            <Text className="text-xl font-semibold ml-5 text-white">{title}</Text>
          </View>

          {/* Partie haute - Contenu principal */}
          <View 
            className="bg-white/90 rounded-t-3xl" 
            style={{ height: "50%", paddingTop: 80 }}
          >
            {children}
          </View>

          {/* Partie basse - Stack Navigator pour checkout */}
          <View 
            className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-lg"
            style={{ height: "50%" }}
          >
            <View className="flex-1 pt-6">
              {/* Indicateur de glissement */}
              <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
              
              {/* Stack Navigator intégré */}
              <CheckoutNavigator />
            </View>
          </View>

        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CheckoutLayout;