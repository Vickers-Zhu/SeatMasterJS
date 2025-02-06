// src/infrastructure/navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import { useAuthentication } from "../../services/AuthenticationContext";
import { globalScreenOptions } from "../options/GlobalScreenOptions";
import { RestaurantsNavigator } from "./RestaurantsNavigator";
import { CheckoutNavigator } from "./CheckoutNavigator";
import { ReservationsNavigator } from "./ReservationsNavigator";
import { MerchantNavigator } from "./MerchantNavigator";
import { SettingsNavigator } from "./SettingsNavigator";
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
      component={SettingsNavigator} // Settings is still a Tab Screen
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

// App Navigator (contains stack navigators)
export const AppNavigator = () => {
  const { user } = useAuthentication();
  const role = user?.role;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Globally hide headers for simplicity
      }}
    >
      {role === "customer" ? (
        <>
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          <Stack.Screen name="Home" component={HomeTabs} />
          {/* Tabs */}

          <Stack.Screen
            name="RestaurantDetailScreen"
            component={RestaurantDetailScreen}
            options={({ route }) => ({
              ...globalScreenOptions.restaurantDetail, // Keep global options
              presentation:
                route.params?.presentationStyle === "modal" ? "modal" : "card",
            })}
          />
          <Stack.Screen
            name="AccountSettings"
            component={AccountSettingsScreen}
            options={globalScreenOptions.common}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Merchant" component={MerchantNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
