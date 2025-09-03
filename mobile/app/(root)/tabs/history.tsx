import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

const orders = [
  {
    id: "1",
    store: "Shoprite Okota",
    orderNo: "#1234",
    pieces: "500 pieces",
    time: "12:55 am",
    date: "12-07-2024",
    status: "Commande en cours",
  },
  {
    id: "2",
    store: "Shoprite Okota",
    orderNo: "#1234",
    pieces: "500 pieces",
    time: "12:55 am",
    date: "12-07-2024",
    status: "En attente du livreur",
  },
  {
    id: "3",
    store: "Shoprite Okota",
    orderNo: "#1234",
    pieces: "500 pieces",
    time: "12:55 am",
    date: "12-07-2024",
    status: "En attente du livreur",
  },
];

const history = () => {
  const [activeTab, setActiveTab] = useState("Ongoing");

  const renderStatusBadge = (status : any) => {
    if (status === "Current Order") {
      return (
        <View className="bg-purple-100 px-3 py-1 rounded-full self-start">
          <Text className="text-purple-700 text-xs font-semibold">
            {status}
          </Text>
        </View>
      );
    }
    if (status === "Awaiting Rider") {
      return (
        <View className="bg-teal-100 px-3 py-1 rounded-full self-start">
          <Text className="text-teal-600 text-xs font-semibold">
            {status}
          </Text>
        </View>
      );
    }
  };

  return (
    <View className="flex-1 bg-white p-4 mt-10">

      <Text className="text-2xl p-2 font-bold" > Historique des commandes  </Text>
      {/* Tabs */}
      <View className="flex-row mb-4">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-xl ${
            activeTab === "Ongoing" ? "bg-purple-600" : "bg-gray-100"
          }`}
          onPress={() => setActiveTab("Ongoing")}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "Ongoing" ? "text-white" : "text-gray-600"
            }`}
          >
            En cours
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 ml-2 rounded-xl ${
            activeTab === "History" ? "bg-purple-600" : "bg-gray-100"
          }`}
          onPress={() => setActiveTab("History")}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "History" ? "text-white" : "text-gray-600"
            }`}
          >
            Historique
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-50 rounded-2xl p-4 mb-3">
            {renderStatusBadge(item.status)}

            <Text className="text-base font-semibold mt-2">
              {item.store} - Order {item.orderNo}
            </Text>

            <View className="flex-row items-center mt-1">
              <Text className="text-gray-500 text-sm mr-2">
                📦 {item.pieces}
              </Text>
              <Text className="text-gray-500 text-sm mr-2">🕒 {item.time}</Text>
              <Text className="text-gray-500 text-sm">📅 {item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default history;
