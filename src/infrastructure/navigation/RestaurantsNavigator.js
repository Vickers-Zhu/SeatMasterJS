import React from 'react';
import { ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <Text>Restaurants Navigator</Text>
    // <RestaurantStack.Navigator
    //   headerMode="none"
    //   screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    // >
    //   <RestaurantStack.Screen
    //     name="Restaurants"
    //     component={RestaurantsScreen}
    //   />
    //   <RestaurantStack.Screen
    //     name="RestaurantDetail"
    //     component={RestaurantDetailScreen}
    //   />
    // </RestaurantStack.Navigator>
  );
};
