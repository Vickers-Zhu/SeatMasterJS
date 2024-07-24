import React from 'react';
import { ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { globalScreenOptions } from '../options/GlobalScreenOptions';
import { RestaurantsScreen } from '../../features/restaurants/screens/RestaurantsScreen';
import { RestaurantDetailScreen } from '../../features/restaurants/screens/RestaurantDetailScreen';

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
      <RestaurantStack.Screen 
        name="RestaurantDetailScreen" 
        component={RestaurantDetailScreen} 
        options={globalScreenOptions.restaurantDetail}
      />
    </RestaurantStack.Navigator>
  );
};
