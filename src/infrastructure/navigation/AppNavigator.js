import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RestaurantsNavigator } from './RestaurantsNavigator';
import { colors } from '../../infrastructure/theme/colors';

const TAB_ICON = {
  Restaurants: 'restaurant',
  // Checkout: 'cart',
  // Map: 'map',
  // Settings: 'settings',
  };
const Tab = createBottomTabNavigator();
const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};
  
export const AppNavigator = () => (
  <Tab.Navigator screenOptions={createScreenOptions}>
    <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
  </Tab.Navigator>
);