// src/infrastructure/navigation/MerchantNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { MerchantHomeScreen } from "../../features/merchant/dashboard/screens/MerchantHomeScreen";
import { MerchantSettingsScreen } from "../../features/merchant/settings/screens/MerchantSettingsScreen";
import { MerchantReservationsScreen } from "../../features/merchant/reservations/screens/MerchantReservationsScreen";

const Tab = createBottomTabNavigator();

export const MerchantNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Settings") {
            iconName = "settings";
          } else if (route.name === "Reservations") {
            iconName = "calendar";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.text.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
      })}
    >
      <Tab.Screen name="Home" component={MerchantHomeScreen} />
      <Tab.Screen name="Reservations" component={MerchantReservationsScreen} />
      <Tab.Screen name="Settings" component={MerchantSettingsScreen} />
    </Tab.Navigator>
  );
};
