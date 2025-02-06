// src/infrastructure/navigation/MerchantNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MerchantHomeScreen } from "../../features/merchant/screens/MerchantHomeScreen";
import { MerchantSettingsScreen } from "../../features/merchant/screens/MerchantSettingsScreen";
import { globalScreenOptions } from "../options/GlobalScreenOptions";

const Tab = createBottomTabNavigator();

export const MerchantNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...globalScreenOptions.common, // Apply global header styles
        headerShown: true, // Ensure headers are visible for merchant screens
        tabBarIcon: ({ color, size }) => {
          const icons = {
            MerchantHome: "home",
            MerchantSettings: "settings",
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="MerchantHome" component={MerchantHomeScreen} />
      <Tab.Screen name="MerchantSettings" component={MerchantSettingsScreen} />
    </Tab.Navigator>
  );
};
