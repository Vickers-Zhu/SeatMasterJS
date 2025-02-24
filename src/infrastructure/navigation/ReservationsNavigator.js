// navigation/ReservationsNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";

import { ReservationsScreen } from "../../features/customer/reservations/screens/ReservationsScreen";

const ReservationStack = createStackNavigator();

export const ReservationsNavigator = () => {
  const theme = useTheme(); // Access the theme using styled-components
  const getNumericValue = (value) => parseInt(value.replace("px", ""), 10);

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
          fontSize: getNumericValue(theme.fontSizes.h4), // Use numerical value
          fontFamily: theme.fonts.heading, // Use heading font from theme
          fontWeight: theme.fontWeights.regular, // Use numerical value
          lineHeight: getNumericValue(theme.fontSizes.h2), // Ensure line height matches font size
          paddingLeft: getNumericValue(theme.space[2]), // Added padding left
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
