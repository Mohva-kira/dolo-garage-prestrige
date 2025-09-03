import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // expo vector icons

const profile = () => {
  return (
    <ScrollView className="flex-1  p-4">
    {/* Photo + nom */}
    <View className="items-center mb-6">
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500",
        }}
        className="w-24 h-24 rounded-full border-4 border-pink-500 mb-3"
      />
      <Text className="text-black text-xl font-bold">Victoria Heard</Text>
      <Text className="text-black">Active since - Jul, 2019</Text>
    </View>

    {/* Section informations personnelles */}
    <View className="bg-slate-200 rounded-2xl p-4 mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-black text-lg font-semibold">Personal Information</Text>
        <TouchableOpacity>
          <Text className="text-blue-400">Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View className="flex-row items-center mb-3">
        <MaterialIcons name="email" size={20} color="#000" />
        <Text className="text-black ml-3">heard_j@gmail.com</Text>
      </View>

      {/* Phone */}
      <View className="flex-row items-center mb-3">
        <Ionicons name="call-outline" size={20} color="#000" />
        <Text className="text-black ml-3">9898712132</Text>
      </View>

      {/* Website */}
      <View className="flex-row items-center mb-3">
        <MaterialIcons name="language" size={20} color="#000" />
        <Text className="text-black ml-3">www.randomweb.com</Text>
      </View>

      {/* Location */}
      <View className="flex-row items-center">
        <Ionicons name="location-outline" size={20} color="#000" />
        <Text className="text-black ml-3">Antigua</Text>
      </View>
    </View>

    {/* Section Utilities */}
    <View className="bg-slate-200 rounded-2xl p-4">
      <Text className="text-black text-lg font-semibold mb-3">Utilities</Text>

      {/* Downloads */}
      <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-700">
        <View className="flex-row items-center">
          <Ionicons name="download-outline" size={20} color="#000" />
          <Text className="text-black ml-3">Downloads</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      {/* Usage Analytics */}
      <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-700">
        <View className="flex-row items-center">
          <Ionicons name="stats-chart-outline" size={20} color="#000" />
          <Text className="text-black ml-3">Usage Analytics</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      {/* Help Desk */}
      <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-700">
        <View className="flex-row items-center">
          <Ionicons name="help-circle-outline" size={20} color="#000" />
          <Text className="text-black ml-3">Ask Help-Desk</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      {/* Log Out */}
      <TouchableOpacity className="flex-row justify-between items-center py-3">
        <View className="flex-row items-center">
          <Ionicons name="log-out-outline" size={20} color="#FF5C5C" />
          <Text className="text-red-400 ml-3">Log-Out</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

export default profile;
