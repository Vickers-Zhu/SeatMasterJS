// File: src/infrastructure/navigation/MerchantNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MerchantHomeScreen } from "../../features/merchant/screens/MerchantHomeScreen";
import { MerchantSettingsScreen } from "../../features/merchant/screens/MerchantSettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

const Tab = createBottomTabNavigator();

export const MerchantNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "Home" ? "home" : "settings";
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
      <Tab.Screen name="Settings" component={MerchantSettingsScreen} />
    </Tab.Navigator>
  );
};
