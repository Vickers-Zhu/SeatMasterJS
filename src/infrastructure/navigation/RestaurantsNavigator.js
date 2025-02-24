import React from "react";
import { ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantsScreen } from "../../features/customer/restaurants/screens/RestaurantsScreen";
import { RestaurantDetailScreen } from "../../features/customer/restaurants/screens/RestaurantDetailScreen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    // <Text>Restaurants Navigator</Text>
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        name="RestaurantsScreen"
        component={RestaurantsScreen}
        options={{ headerShown: false }}
      />
    </RestaurantStack.Navigator>
  );
};
