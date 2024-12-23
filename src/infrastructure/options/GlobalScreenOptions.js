// src/infrastructure/options/GlobalScreenOptions.js
import { Platform } from "react-native";
import { colors } from "../../infrastructure/theme/colors"; // Adjust the path as needed
import { TransitionPresets } from "@react-navigation/stack";

const commonHeaderOptions = {
  headerStyle: {
    height: Platform.OS === "ios" ? 56 : 66, // Adjust the height for iOS and Android
    backgroundColor: colors.bg.primary, // Use your app's primary background color
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.text.primary,
    textAlign: "center",
  },
  headerBackTitleVisible: false,
  headerTitleAlign: "center",
  headerLeftContainerStyle: {
    marginTop: Platform.OS === "ios" ? -45 : -41,
  },
  headerTitleContainerStyle: {
    marginTop: Platform.OS === "ios" ? -50 : -45, // Adjust this value to move the title position up
  },
};

export const globalScreenOptions = {
  common: commonHeaderOptions,
  restaurantDetail: {
    headerShown: false, // Disable default header for RestaurantDetailScreen
    // If you have other specific options for restaurantDetail, add them here
    // For example:
    // ...commonHeaderOptions,
    // ...TransitionPresets.SlideFromRightIOS,
  },
};
