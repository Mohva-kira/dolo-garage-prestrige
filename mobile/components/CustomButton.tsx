import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

const getBgVariantStyle = (variant: any) => {
  switch (variant) {
    case "secondary":
      return { backgroundColor: "#6B7280" }; // gris
    case "danger":
      return { backgroundColor: "#EF4444" }; // rouge
    case "success":
      return { backgroundColor: "#22C55E" }; // vert
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: "#D1D5DB",
        borderWidth: 0.5,
      };
    default:
      return { backgroundColor: "#3B82F6" }; // bleu
  }
};

const getTextVariantStyle = (variant: any) => {
  switch (variant) {
    case "primary":
      return { color: "#000" }; // gris
    case "secondary":
      return { color: "#6B7280" }; // gris
    case "danger":
      return { color: "#EF4444" }; // rouge
    case "success":
      return { color: "#22C55E" }; // vert
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: "#D1D5DB",
        borderWidth: 0.5,
      };
    default:
      return { color: "#fff" }; // bleu
  }
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 9999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#a3a3a3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 4, // Pour Android
    backgroundColor: "#3B82F6", // Couleur par défaut, à surcharger
  },
});

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[getBgVariantStyle(bgVariant)]}
      className={`p-3   rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${className}`}
      {...props}>
      {IconLeft && <IconLeft />}

      <Text
        className={`text-lg font-bold  `}
        style={[getTextVariantStyle(textVariant)]}>
        {title}
      </Text>

      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
