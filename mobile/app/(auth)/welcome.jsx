import React, { useRef, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onBoarding } from "../../constants";
import CustomButton from './../../components/CustomButton';
import headerDesign from "@/assets/images/onBoarding-header.png";

const Onboarding = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onBoarding.length - 1; 

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Bouton Passer - Position fixe en haut */}
        <View className="absolute top-10 right-5 z-10">
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/sign-up")}
            className="bg-white px-4 py-2 rounded-full shadow-md"
            activeOpacity={0.7}
          >
            <Text className="text-lg font-bold text-gray-500">Passer</Text>
          </TouchableOpacity>
        </View>

        {/* Contenu principal */}
        <View className="flex-1 pt-10">
          <Swiper
            ref={swiperRef}
            loop={false}
            showsPagination={true}
            paginationStyle={{ bottom: 100 }}
            dot={
              <View className="bg-gray-300 w-2 h-2 rounded-full mx-1" />
            }
            activeDot={
              <View className="bg-blue-500 w-8 h-2 rounded-full mx-1" />
            }
            onIndexChanged={(index) => setActiveIndex(index)}
          >
            {onBoarding.map((item) => (
              <View key={item.id} className="flex-1 items-center justify-center px-5">
                <Image 
                  source={item.image}
                  className="w-full h-80 mb-8"
                  resizeMode="contain"
                />
                
                <View className="items-center mb-8">
                  <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
                    {item.title}
                  </Text>
                  <Text className="text-base text-center text-gray-600 leading-6">
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </Swiper>

          {/* Bouton de navigation en bas */}
          <View className="px-5 pb-14">
            <CustomButton
              title={isLastSlide ? "Commencer" : "Suivant"}
              onPress={() => {
                if (isLastSlide) {
                  router.replace("/(auth)/sign-up");
                } else {
                  swiperRef.current?.scrollBy(1);
                }
              }}
              className="w-full"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;