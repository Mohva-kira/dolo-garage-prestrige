import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Breadcumbs = ({ title }: any) => {
  return (
    <View className="w-full h-16 bg-gray-50 flex justify-between flex-row items-center px-4">
      <Text className="text-gray-600 font-medium">{title}</Text>

      <View className="flex-row items-center">
        <Text className="text-gray-400 font-medium mx-2">/</Text>
        <TouchableOpacity onPress={() => router.push('/(root)/cart') } className="bg-white p-2 rounded-full shadow-md">
          <Ionicons name="cart" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Breadcumbs;
