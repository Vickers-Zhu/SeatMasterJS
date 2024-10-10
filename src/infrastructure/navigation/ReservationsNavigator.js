// navigation/ReservationsNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";

import { ReservationsScreen } from "../../features/reservations/screens/ReservationsScreen";

const ReservationStack = createStackNavigator();

/**
 * Utility function to parse font sizes from strings (e.g., "34px") to numbers.
 * @param {string|number} size - The font size with or without "px".
 * @returns {number} - The numerical font size.
 */
const parseFontSize = (size) => {
  if (typeof size === "string" && size.endsWith("px")) {
    return parseInt(size.replace("px", ""), 10);
  }
  return size;
};

/**
 * Utility function to parse font weights from strings (e.g., "400") to numbers.
 * @param {string|number} weight - The font weight as a string or number.
 * @returns {number} - The numerical font weight.
 */
const parseFontWeight = (weight) => {
  if (typeof weight === "string") {
    return parseInt(weight, 10);
  }
  return weight;
};

export const ReservationsNavigator = () => {
  const theme = useTheme(); // Access the theme using styled-components

  return (
    <ReservationStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left", // Align header title to the left
        headerTintColor: theme.colors.text.primary, // Use theme color for header text
        headerStyle: {
          backgroundColor: theme.colors.bg.primary, // Use theme color for header background
          shadowColor: "transparent", // Remove shadow on iOS
          elevation: 0, // Remove shadow on Android
        },
        headerTitleStyle: {
          fontSize: parseFontSize(theme.fontSizes.h4), // Remove 'px' and use numerical value
          fontFamily: theme.fonts.heading, // Use heading font from theme
          fontWeight: parseFontWeight(theme.fontWeights.regular), // Remove 'px' and use numerical value
          lineHeight: parseFontSize(theme.fontSizes.h2), // Ensure line height matches font size
        },
      }}
    >
      <ReservationStack.Screen
        name="ReservationsScreen"
        component={ReservationsScreen}
        options={{
          headerTitle: "Reservations",
        }}
      />
    </ReservationStack.Navigator>
  );
};
