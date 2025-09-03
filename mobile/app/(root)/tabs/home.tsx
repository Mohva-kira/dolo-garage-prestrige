import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

const mockProducts = [
  {
    id: "1",
    title: "Deri Çalışma Sandalyesi",
    price: "239₺",
    discount: "-45%",
    image: "https://www.mobil.com/lubricants/-/media/project/wep/mobil/mobil-row-us-1/new-bottle-images/mobil-1-5w-30-200-311.jpg",
  },
  {
    id: "2",
    title: "Vakumlama Şil",
    price: "120₺",
    discount: "-30%",
    image: "https://shop.fp-auto.com/cdn/shop/files/LRjaune-25.jpg?v=1702994291&width=533",
  },
  {
    id: "3",
    title: "Modern Koltuk",
    price: "450₺",
    discount: "-50%",
    image: "https://cdnwp.dealerk.com/e9823ff2/uploads/sites/3/2022/07/carremini_414x229_voitureconsommable.png",
  },
  {
    id: "4",
    title: "Modern Koltuk",
    price: "450₺",
    discount: "-50%",
    image: "https://cdnwp.dealerk.com/e9823ff2/uploads/sites/3/2022/07/carremini_414x229_voitureconsommable.png",
  },
  {
    id: "5",
    title: "Modern Koltuk",
    price: "450₺",
    discount: "-50%",
    image: "https://cdnwp.dealerk.com/e9823ff2/uploads/sites/3/2022/07/carremini_414x229_voitureconsommable.png",
  },
];
const home = () => {
  const navigation = useNavigation();
  const groupedProducts = [];
  for (let i = 0; i < mockProducts.length; i += 2) {
    groupedProducts.push(mockProducts.slice(i, i + 2));
  }
  return (
    <View className="flex-1  p-4">
      <Text className="text-xl font-bold mb-4">Mobili Shop</Text>

      <View className="mb-6 p-2 shadow-md bg-white rounded-2xl ">
        <Image
          source={{
            uri: "https://media.gettyimages.com/id/458961537/fr/photo/v%C3%A9hicule-fabricant-logos.jpg?s=612x612&w=gi&k=20&c=b7DXWIYh1ycQKQbXv1rHVmCSHakQdXbirAafkP5XegI=",
          }}
          className="w-full h-40 rounded-xl mb-4"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section Swiper pour les produits vedettes */}
        <View className="mb-6">
          <Text className="text-xl font-bold px-4 mb-4">Produits vedettes</Text>
          <Swiper
            style={{ height: 200 }}
            showsPagination={true}
            paginationStyle={{ bottom: -20 }}
            dot={<View className="bg-gray-100 w-2 h-2 rounded-full mx-1" />}
            activeDot={
              <View className="bg-blue-500 w-8 h-2 rounded-full mx-1" />
            }
            autoplay={true}
            autoplayTimeout={4}>
            {mockProducts.slice(0, 3).map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-white rounded-2xl p-4 mx-4 shadow-lg">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-32 rounded-xl"
                />
                <Text className="mt-3 font-semibold text-lg">{item.title}</Text>
                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-gray-500">{item.price}</Text>
                  <Text className="text-green-600 font-bold">
                    {item.discount}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        {/* Section Grid pour tous les produits */}
        <View className="px-4">
          <Text className="text-xl font-bold mb-4">Tous nos produits</Text>
          <FlatList
            data={mockProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-white rounded-2xl p-2 mb-4 w-[48%]">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-28 rounded-xl"
                />
                <Text className="mt-2 font-semibold">{item.title}</Text>
                <Text className="text-gray-500">{item.price}</Text>
                <Text className="text-green-600">{item.discount}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default home;
