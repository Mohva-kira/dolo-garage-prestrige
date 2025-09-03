import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";

const categories = [
  {
    id: "1",
    name: "Riz",
    category: "Alimentation",
    image: "https://images.unsplash.com/photo-1604908811956-5c42e4c1f83a?w=500", 
  },
  {
    id: "2",
    name: "Lait",
    category: "Boissons",
    image: "https://images.unsplash.com/photo-1585238342028-4c1e03c3f4f6?w=500",
  },
  {
    id: "3",
    name: "Pain",
    category: "Boulangerie",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e0054849b?w=500",
  },
  {
    id: "4",
    name: "Pomme",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500",
  },
  {
    id: "5",
    name: "Poulet rôti",
    category: "Viande",
    image: "https://images.unsplash.com/photo-1604908177320-dfdbab09f84d?w=500",
  },
  {
    id: "6",
    name: "Tomates",
    category: "Légumes",
    image: "https://images.unsplash.com/photo-1582281298054-268f48e9ddee?w=500",
  },
];


const products = () => {

  const [search, setSearch] = useState(""); // recherche par nom
  const [selectedCategory, setSelectedCategory] = useState("All"); // filtre par catégorie

  // Extraire toutes les catégories uniques
  const uniqueCategories = ["All", ...new Set(categories.map((c) => c.category))];

  // Filtrer selon recherche + catégorie
  const filtered = categories.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchName && matchCategory;
  });


  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Tous les produits</Text>

      {/* Input de recherche */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Rechercher par nom..."
        className="bg-gray-200 rounded-xl px-4 py-2 mb-4"
      />

      {/* Filtres de catégorie */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        {uniqueCategories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setSelectedCategory(cat)}
            className={`px-4 py-2 mr-2 rounded-full ${
              selectedCategory === cat ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <Text className="text-white">{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste filtrée */}
      <View className="flex-row flex-wrap justify-between">
        {filtered.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            className="bg-white rounded-2xl p-4 mb-4 w-[48%] items-center"
          >
            <Image source={{ uri: cat.image }} className="w-20 h-20 rounded-xl mb-2" />
            <Text className="font-semibold">{cat.name}</Text>
            <Text className="text-gray-500 text-sm">{cat.category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default products;
