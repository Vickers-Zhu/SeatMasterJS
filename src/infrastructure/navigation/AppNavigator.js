// src/infrastructure/navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import { globalScreenOptions } from "../options/GlobalScreenOptions";
import { RestaurantsNavigator } from "./RestaurantsNavigator";
import { CheckoutNavigator } from "./CheckoutNavigator";
import { ReservationsNavigator } from "./ReservationsNavigator";
import { SettingsScreen } from "../../features/settings/screens/SettingsScreen";
import { LoginScreen } from "../../features/auth/screens/LoginScreen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/RestaurantDetailScreen";
import { AccountSettingsScreen } from "../../features/settings/screens/AccountSettingsScreen";

const TAB_ICON = {
  Restaurants: "restaurant",
  Checkout: "cart",
  Reservations: "book",
  Settings: "settings",
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const createTabScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

// Home Tabs (contains tab navigators)
const HomeTabs = () => (
  <Tab.Navigator screenOptions={createTabScreenOptions}>
    <Tab.Screen
      name="Restaurants"
      component={RestaurantsNavigator}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Checkout"
      component={CheckoutNavigator}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Reservations"
      component={ReservationsNavigator}
      options={{ header: () => null }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen} // Settings is still a Tab Screen
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

// App Navigator (contains stack navigators)
export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Globally hide headers for simplicity
      }}
    >
      {/* Tabs */}
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Account Settings Screen */}
      <Stack.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={globalScreenOptions.restaurantDetail}
      />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
