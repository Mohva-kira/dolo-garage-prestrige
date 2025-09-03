import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import logo from "@/assets/images/logo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "L'phone est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.phone)) {
      newErrors.phone = "Format d'phone invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // Logique d'inscription
      Alert.alert("Succès", "Compte créé avec succès !");
      router.replace("/(tabs)/home");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Supprimer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center px-6 py-12">
            {/* Header */}
            <View className="items-center mb-0 w-full">
            <Image source={logo} className='w-52 h-40 p-2' />

            </View>
          
            <View className="mb-4 items-center">
              <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Créer un compte
              </Text>
              <Text className="text-gray-600 text-base text-center">
                Rejoignez-nous et découvrez nos services
              </Text>
            </View>

            {/* Formulaire */}
            <View className="space-y-4">
              {/* Nom complet */}
              <View>
                <Text className="text-gray-700 font-medium mb-2 text-sm">
                  Nom complet
                </Text>
                <View
                  className={`border rounded-xl px-4 py-0 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}>
                  <TextInput
                    placeholder="Entrez votre nom complet"
                    value={formData.fullName}
                    onChangeText={(value) =>
                      handleInputChange("fullName", value)
                    }
                    className="text-gray-900 text-base"
                    autoCapitalize="words"
                  />
                </View>
                {errors.fullName && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </Text>
                )}
              </View>

              {/* Email */}
              <View>
                <Text className="text-gray-700 font-medium mb-2 text-sm">
                  Numero de téléphone
                </Text>
                <View
                  className={`border rounded-xl px-4 py-0  ${errors.phone ? "border-red-500" : "border-gray-300"}`}>
                  <TextInput
                    placeholder="Entrez votre numero de téléphone"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange("phone", value)}
                    className="text-gray-900 text-base"
                    keyboardType="phone-address"
                    autoCapitalize="none"
                  />
                </View>
                {errors.phone && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </Text>
                )}
              </View>

              {/* Mot de passe */}
              <View>
                <Text className="text-gray-700 font-medium mb-2 text-sm">
                  Mot de passe
                </Text>
                <View
                  className={`border rounded-xl px-4 py-0  flex-row items-center ${errors.password ? "border-red-500" : "border-gray-300"}`}>
                  <TextInput
                    placeholder="Entrez votre mot de passe"
                    value={formData.password}
                    onChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                    secureTextEntry={!showPassword}
                    className="flex-1 text-gray-900 text-base"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2">
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Confirmation mot de passe */}
              <View>
                <Text className="text-gray-700 font-medium mb-2 text-sm">
                  Confirmer le mot de passe
                </Text>
                <View
                  className={`border rounded-xl px-4 py-0 flex-row items-center ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}>
                  <TextInput
                    placeholder="Confirmez votre mot de passe"
                    value={formData.confirmPassword}
                    onChangeText={(value) =>
                      handleInputChange("confirmPassword", value)
                    }
                    secureTextEntry={!showConfirmPassword}
                    className="flex-1 text-gray-900 text-base"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2">
                    <Ionicons
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
            </View>

            {/* Bouton d'inscription */}
            <TouchableOpacity
              onPress={handleSignUp}
              className="bg-blue-600 rounded-xl py-4 mt-8 shadow-lg"
              activeOpacity={0.8}>
              <Text className="text-white text-center font-bold text-lg">
                S'inscrire
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500">ou</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Boutons sociaux */}
            <View className="space-y-3">
              <TouchableOpacity className="border border-gray-300 rounded-xl py-3 flex-row items-center justify-center">
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text className="ml-3 text-gray-700 font-medium">
                  Continuer avec Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="border border-gray-300 rounded-xl py-3 flex-row items-center justify-center">
                <Ionicons name="logo-apple" size={20} color="#000" />
                <Text className="ml-3 text-gray-700 font-medium">
                  Continuer avec Apple
                </Text>
              </TouchableOpacity>
            </View>

            {/* Lien vers connexion */}
            <View className="flex-row justify-center mt-8 mb-6">
              <Text className="text-gray-600">Déjà un compte ? </Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
                <Text className="text-blue-600 font-semibold">
                  Se connecter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
