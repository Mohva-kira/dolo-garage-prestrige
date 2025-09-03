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
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SignIn = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validateAfricanPhoneNumber = (phone) => {
    // Nettoyer le numéro (supprimer espaces, tirets, parenthèses)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

    // Regex pour numéros africains (indicatifs principaux)
    const africanPhoneRegex =
      /^(\+?(?:27|33|212|213|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|248|249|250|251|252|253|254|255|256|257|258|260|261|262|263|264|265|266|267|268|269|290|291|297|298|299|354|356|357|358|370|371|372|373|374|375|376|377|378|380|381|382|383|385|386|387|389|420|421|423|500|501|502|503|504|505|506|507|508|509|590|591|592|593|594|595|596|597|598|599|670|672|673|674|675|676|677|678|679|680|681|682|683|684|685|686|687|688|689|690|691|692|850|852|853|855|856|880|886|960|961|962|963|964|965|966|967|968|970|971|972|973|974|975|976|977|992|993|994|995|996|998))[0-9]{6,10}$/;

    // Regex spécifique pour les principaux pays africains
    const specificPatterns = {
      // Maroc (+212)
      morocco: /^(\+?212|0)[5-7][0-9]{8}$/,
      // Algérie (+213)
      algeria: /^(\+?213|0)[5-7][0-9]{8}$/,
      // Tunisie (+216)
      tunisia: /^(\+?216)[2-57-9][0-9]{7}$/,
      // Égypte (+20)
      egypt: /^(\+?20)[1][0-9]{9}$/,
      // Nigeria (+234)
      nigeria: /^(\+?234)[7-9][0-1][0-9]{8}$/,
      // Afrique du Sud (+27)
      southAfrica: /^(\+?27)[6-8][0-9]{8}$/,
      // Kenya (+254)
      kenya: /^(\+?254)[7][0-9]{8}$/,
      // Ghana (+233)
      ghana: /^(\+?233)[2-5][0-9]{7}$/,
      // Côte d'Ivoire (+225)
      ivoryCoast: /^(\+?225)[0-9]{8}$/,
      // Sénégal (+221)
      senegal: /^(\+?221)[7][0-9]{8}$/,
      // Mali (+223)
      mali: /^(\+?223)[6-9][0-9]{7}$/,
      // Burkina Faso (+226)
      burkinaFaso: /^(\+?226)[6-7][0-9]{7}$/,
      // Cameroun (+237)
      cameroon: /^(\+?237)[6-7][0-9]{8}$/,
      // République Démocratique du Congo (+243)
      drcongo: /^(\+?243)[8-9][0-9]{8}$/,
    };

    // Vérifier d'abord les patterns spécifiques
    for (const pattern of Object.values(specificPatterns)) {
      if (pattern.test(cleanPhone)) {
        return true;
      }
    }

    // Fallback sur la regex générale africaine
    return africanPhoneRegex.test(cleanPhone);
  };

  // Dans la fonction validateForm, remplacer la validation email par :
  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!validateAfricanPhoneNumber(formData.phone)) {
      newErrors.phone =
        "Format de numéro invalide. Utilisez le format: +XXX XXXXXXXX";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    router.replace("/(root)/tabs/home");
    if (validateForm()) {
      try {
        Alert.alert('Succès', 'Connexion réussie !');
        
        // Navigation vers l'onglet home dans les tabs
   
        
      } catch (error) {
        console.error('Erreur de navigation:', error);
        
        // Fallback - essayer d'autres routes
        try {
          router.replace("/tabs/home");
        } catch {
          router.replace("/(tabs)/home");
        }
      }
    }
    
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Supprimer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Mot de passe oublié",
      "Un phone de réinitialisation va être envoyé",
      [{ text: "OK" }]
    );
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
            <View className="mb-8 items-center">
              <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Bienvenue !
              </Text>
              <Text className="text-gray-600 text-base text-center">
                Connectez-vous à votre compte
              </Text>
            </View>

            {/* Formulaire */}
            <View className="space-y-4">
              {/* Email */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">
                  Numéro de téléphone
                </Text>
                <View
                  className={`border rounded-xl px-4 py-3 ${errors.phone ? "border-red-500" : "border-gray-300"}`}>
                  <TextInput
                    placeholder="Ex:  77 12 34 56"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange("phone", value)}
                    className="text-gray-900 text-base"
                    keyboardType="phone-pad"
                    autoComplete="tel"
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
                <Text className="text-gray-700 font-medium mb-2">
                  Mot de passe
                </Text>
                <View
                  className={`border rounded-xl px-4 py-3 flex-row items-center ${errors.password ? "border-red-500" : "border-gray-300"}`}>
                  <TextInput
                    placeholder="Entrez votre mot de passe"
                    value={formData.password}
                    onChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                    secureTextEntry={!showPassword}
                    className="flex-1 text-gray-900 text-base"
                    autoComplete="password"
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
            </View>

            {/* Options : Se souvenir + Mot de passe oublié */}
            <View className="flex-row justify-between items-center mt-4">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center">
                <View
                  className={`w-5 h-5 border-2 rounded mr-2 items-center justify-center ${rememberMe ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                  {rememberMe && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <Text className="text-gray-600">Se souvenir de moi</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text className="text-blue-600 font-medium">
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bouton de connexion */}
            <TouchableOpacity
              onPress={handleSignIn}
              className="bg-blue-600 rounded-xl py-4 mt-8 shadow-lg"
              activeOpacity={0.8}>
              <Text className="text-white text-center font-bold text-lg">
                Se connecter
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

            {/* Lien vers inscription */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600">Pas encore de compte ? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
                <Text className="text-blue-600 font-semibold">S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
