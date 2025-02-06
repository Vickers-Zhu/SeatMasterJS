// src/infrastructure/options/GlobalScreenOptions.js
import { Platform } from "react-native";
import { colors } from "../../infrastructure/theme/colors"; // Adjust the path as needed
import { TransitionPresets } from "@react-navigation/stack";

const commonHeaderOptions = {
  headerStyle: {
    height: Platform.select({ ios: 56, android: 66 }),
    backgroundColor: colors.bg.primary,
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
    marginTop: Platform.select({ ios: -45, android: -41 }),
  },
  headerTitleContainerStyle: {
    marginTop: Platform.select({ ios: -50, android: -45 }),
  },
};

// New preset that disables the header
export const globalScreenOptions = {
  common: commonHeaderOptions,
  nonHeader: {
    ...commonHeaderOptions,
    headerShown: false,
  },
  restaurantDetail: {
    headerShown: false,
    // Additional options for restaurant detail can be added here
    // For example:
    // ...TransitionPresets.SlideFromRightIOS,
  },
};
