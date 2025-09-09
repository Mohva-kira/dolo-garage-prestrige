import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Share,
} from "react-native";
import { router } from "expo-router";
import CheckoutLayout from "@/components/CheckoutLayout";


type CartItem = {
id: string;
title: string;
price: number;
image?: string;
qty: number;
};

const MOCK_CART: CartItem[] = [
{
  id: "1",
  title: "Révision complète",
  price: 120.0,
  image: "https://i.ibb.co/CBytF3s/jacket-main.png",
  qty: 1,
},
{
  id: "2",
  title: "Filtre à huile",
  price: 35.5,
  image:
    "https://cdnwp.dealerk.com/e9823ff2/uploads/sites/3/2022/07/carremini_414x229_voitureconsommable.png",
  qty: 2,
},
];

const formatPrice = (n: number) =>
n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const cart = () => {
    const [items, setItems] = useState<CartItem[]>(MOCK_CART);

    const total = useMemo(
      () => items.reduce((s, it) => s + it.price * it.qty, 0),
      [items]
    );
  
    const updateQty = (id: string, delta: number) => {
      setItems((prev) =>
        prev
          .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
          .filter(Boolean)
      );
    };
  
    const removeItem = (id: string) => {
      setItems((prev) => prev.filter((it) => it.id !== id));
    };
  
    const handlePay = () => {
      if (items.length === 0) {
        Alert.alert("Panier vide", "Ajoutez des produits avant de payer.");
        return;
      }
      // Simuler paiement, ensuite naviguer
      Alert.alert("Paiement", `Montant débité : ${formatPrice(total)}`, [
        {
          text: "OK",
          onPress: () => router.replace("/(root)/tabs/home"),
        },
      ]);
    };
  
    const handleShare = async () => {
      try {
        const productList = items
          .map((it) => `${it.title} x${it.qty} — ${formatPrice(it.price * it.qty)}`)
          .join("\n");
        await Share.share({
          message: `Mon panier :\n${productList}\nTotal : ${formatPrice(total)}`,
        });
      } catch (e) {
        Alert.alert("Erreur", "Impossible de partager le panier.");
      }
    };
  
    const renderItem = ({ item }: { item: CartItem }) => (
      <View className="flex-row bg-white/90 rounded-xl p-3 mb-3 shadow-sm">
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-lg mr-3 bg-gray-100"
          resizeMode="cover"
        />
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
            <Text className="text-sm text-gray-500 mt-1">{formatPrice(item.price)}</Text>
          </View>
  
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => updateQty(item.id, -1)}
                className="w-8 h-8 rounded-md bg-gray-100 items-center justify-center mr-2"
                activeOpacity={0.8}
              >
                <Text className="text-lg text-gray-700">−</Text>
              </TouchableOpacity>
              <Text className="text-base font-medium w-8 text-center">{item.qty}</Text>
              <TouchableOpacity
                onPress={() => updateQty(item.id, 1)}
                className="w-8 h-8 rounded-md bg-gray-100 items-center justify-center ml-2"
                activeOpacity={0.8}
              >
                <Text className="text-lg text-gray-700">+</Text>
              </TouchableOpacity>
            </View>
  
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600 mr-3">
                {formatPrice(item.price * item.qty)}
              </Text>
              <TouchableOpacity onPress={() => removeItem(item.id)} activeOpacity={0.7}>
                <Text className="text-red-500 font-semibold">Suppr</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  
    return (
      <CheckoutLayout title="Mon panier" subtitle={`${items.length} article(s)`}>
        <View className="px-6 pt-6 pb-32 flex-1">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-bold text-gray-900">Mon panier</Text>
            <TouchableOpacity onPress={() => setItems([])} activeOpacity={0.8}>
              <Text className="text-sm text-red-500">Vider</Text>
            </TouchableOpacity>
          </View>
  
          <FlatList
            data={items}
            keyExtractor={(it) => it.id}
            renderItem={renderItem}
            ListEmptyComponent={
              <View className="items-center justify-center mt-24">
                <Text className="text-gray-500">Votre panier est vide.</Text>
              </View>
            }
          />
        </View>
  
        {/* Footer fixe */}
        <View
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 18,
          }}
        >
          <View className="bg-white rounded-2xl p-4 shadow-lg">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="text-sm text-gray-500">Total</Text>
                <Text className="text-xl font-bold text-gray-900">{formatPrice(total)}</Text>
              </View>
  
              <View className="flex-row">
                <TouchableOpacity
                  onPress={handleShare}
                  className="bg-gray-100 px-4 py-3 rounded-lg mr-3 items-center justify-center"
                  activeOpacity={0.8}
                >
                  <Text className="text-sm font-semibold text-gray-700">Partager</Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  onPress={handlePay}
                  className="bg-[#3B82F6] px-5 py-3 rounded-lg items-center justify-center"
                  activeOpacity={0.9}
                >
                  <Text className="text-white font-bold">Payer</Text>
                </TouchableOpacity>
              </View>
            </View>
  
            <Text className="text-xs text-gray-400">Paiement sécurisé • Annulation possible</Text>
          </View>
        </View>
      </CheckoutLayout>
    );
}

export default cart