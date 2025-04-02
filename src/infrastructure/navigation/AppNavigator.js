// src/infrastructure/navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import { useAuthentication } from "../../services/AuthenticationContext";
import { globalScreenOptions } from "../options/GlobalScreenOptions";
import { RestaurantsNavigator } from "./RestaurantsNavigator";
import { CheckoutNavigator } from "./CheckoutNavigator";
import { ReservationsNavigator } from "./ReservationsNavigator";
import { MerchantNavigator } from "./MerchantNavigator";
import { SettingsNavigator } from "./SettingsNavigator";
import { RestaurantDetailScreen } from "../../features/customer/restaurants/screens/RestaurantDetailScreen";
import { AccountSettingsScreen } from "../../features/customer/settings/screens/AccountSettingsScreen";

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

// HomeTabs component for customer view
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
      component={SettingsNavigator}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

// Main app navigation structure
export const AppNavigator = () => {
  const { user } = useAuthentication();
  const role = user?.role;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {role === "customer" ? (
        <>
          <Stack.Screen name="Home" component={HomeTabs} />

          <Stack.Screen
            name="RestaurantDetailScreen"
            component={RestaurantDetailScreen}
            options={({ route }) => ({
              ...globalScreenOptions.restaurantDetail,
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
