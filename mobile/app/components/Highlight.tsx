import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const Highlight = ({ item }: any) => {
  return (
    <TouchableOpacity
      key={item.id}
      className="bg-gray-100 rounded-2xl p-4 mx-4 shadow-lg">
      <Image source={{ uri: item.image }} className="w-full h-32 rounded-xl" />
      <Text className="mt-3 font-semibold text-lg">{item.title}</Text>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-500">{item.price}</Text>
        <Text className="text-green-600 font-bold">{item.discount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Highlight;
