import { View, Text, Image } from "react-native";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import products from "./../app/(root)/tabs/products";
import BottomSheet from "@gorhom/bottom-sheet"

const CheckoutLayout = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: String;
  subtitle: String;
}) => {


    const bottomSheetRef = useRef<BottomSheet>(null)
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="relative flex-1 bg-blue-500">
          <View className="flex flex-row absolute  z-10 pt-8 items-center justify-start px-5" style={{ width: "100%", paddingTop: 30 }}>
            <View className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm items-center justify-center mb-2">
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text className="text-xl font-semibold ml-5">{title}</Text>
          </View>
          <View className="   bg-white/90 rounded-t-3xl " style={{ height: "50%", paddingTop: 50 }}>
            {products()}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CheckoutLayout;
