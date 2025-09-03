import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import { Ionicons } from "@expo/vector-icons";

// Données fictives pour les images et les options
const productImages = [
  { uri: 'https://i.ibb.co/CBytF3s/jacket-main.png' }, // Placeholder pour l'image principale
  { uri: 'https://i.ibb.co/p0pD9jM/jacket-thumb1.png' }, // Placeholder pour la miniature 1
  { uri: 'https://i.ibb.co/hV7G5Wd/jacket-thumb2.png' }, // Placeholder pour la miniature 2
];

const productColors = [
  '#4361EE', // Blue
  '#F49F0A', // Orange
  '#48B25B', // Green
  '#5BCEB3', // Cyan
  '#805D93', // Purple
];

const productSizes = ['S', 'M', 'L', 'LL', 'XL', 'XXL'];

const ProductDetailsScreen = () => {
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [selectedSize, setSelectedSize] = useState(productSizes[0]);

  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      {/* En-tête */}
      <View className={`flex-row justify-beeen items-center p-4 bg-white/70 backdrop-blur-sm z-10`}>
        <TouchableOpacity className={`p-2`}>
          <Ionicons  name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className={`text-xl font-bold`}>Product Details</Text>
        <TouchableOpacity className={`p-2`}>
          <Ionicons  name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Contenu principal défilant */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Images du produit */}
        <View className={`flex-row px-4 pt-4 pb-2 justify-beeen`}>
          <Image source={productImages[0]} className={`w-3/4 h-64 rounded-xl`} resizeMode="cover" />
          <View className={`w-1/4 pl-2 justify-beeen`}>
            <Image source={productImages[1]} className={`w-full h-30 rounded-xl mb-2`} resizeMode="cover" />
            <Image source={productImages[2]} className={`w-full h-30 rounded-xl mt-2`} resizeMode="cover" />
          </View>
        </View>

        {/* Détails du produit */}
        <View className={`p-4`}>
          <View className={`flex-row justify-beeen items-start`}>
            <Text className={`text-2xl font-bold text-gray-800`}>DS Winter Zacket</Text>
            <Text className={`text-2xl font-bold text-gray-800`}>$36.06</Text>
          </View>
          <View className={`flex-row items-center mt-2`}>
            <Ionicons  name="star" size={14} color="#F49F0A" />
            <Text className={`text-sm text-gray-500 ml-1`}>4.8 Ratings</Text>
            <Text className={`text-sm text-gray-400 mx-2`}>•</Text>
            <Text className={`text-sm text-gray-500`}>1.5K+ Sold</Text>
            <Text className={`text-sm text-gray-400 mx-2`}>•</Text>
            <Text className={`text-sm text-gray-500`}>3 Catagory</Text>
          </View>

          {/* Sélecteur de couleur */}
          <View className={`mt-6`}>
            <Text className={`text-base font-semibold text-gray-800`}>Color</Text>
            <View className={`flex-row mt-2`}>
              {productColors.map((color, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full mr-2 justify-center items-center`}
                >
                  <View className={`
                    w-6 h-6 rounded-full
                    bg-[${color}]
                    
                    ${selectedColor === color && `border-2 border-purple-500`}`
                  } />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sélecteur de taille */}
          <View className={`mt-6`}>
            <Text className={`text-base font-semibold text-gray-800`}>Size</Text>
            <View className={`flex-row mt-2`}>
              {productSizes.map((size, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg mr-2 justify-center items-center ${selectedSize === size ? `bg-purple-600` : `bg-gray-200`} `}
                    
                  
                >
                  <Text className={`text-base font-bold
                    ${selectedSize === size ? `text-white` : `text-gray-800`}`}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pied de page (Barre d'action) */}
      <View className={`p-4 bg-white/70 backdrop-blur-sm z-10 border-t border-gray-200`}>
        <View className={`flex-row justify-beeen items-center`}>
          <View className={`bg-gray-900 rounded-xl px-4 py-3 w-1/3 mr-2 items-center`}>
            <Text className={`text-white font-bold text-lg`}>$36.06</Text>
          </View>
          <TouchableOpacity className={`bg-purple-600 rounded-xl flex-1 py-3 ml-2 flex-row items-center justify-center`}>
            <Ionicons  name="cart-outline" size={20} color="#fff" className={`mr-2`} />
            <Text className={`text-white font-bold text-lg`}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;