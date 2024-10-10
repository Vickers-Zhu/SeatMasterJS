import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import { globalScreenOptions } from "../options/GlobalScreenOptions";
import { RestaurantsNavigator } from "./RestaurantsNavigator";
import { CheckoutNavigator } from "./CheckoutNavigator";
import { ReservationsNavigator } from "./ReservationsNavigator";
import { SettingsNavigator } from "./SettingsNavigator";
import { colors } from "../../infrastructure/theme/colors";

const TAB_ICON = {
  Restaurants: "restaurant",
  Checkout: "cart",
  Reservations: "book",
  Settings: "settings",
};
const Tab = createBottomTabNavigator();
const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    ...globalScreenOptions.common,
  };
};

export const AppNavigator = () => (
  <Tab.Navigator screenOptions={createScreenOptions}>
    <Tab.Screen
      name="Restaurants"
      component={RestaurantsNavigator}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Checkout"
      options={{ headerShown: false }}
      component={CheckoutNavigator}
    />
    <Tab.Screen
      name="Reservations"
      options={{ header: () => null }}
      component={ReservationsNavigator}
    />
    <Tab.Screen
      name="Settings"
      options={{ headerShown: false }}
      component={SettingsNavigator}
    />
  </Tab.Navigator>
);
