import React from 'react';
import { ScrollView, TextInput, Text, TouchableOpacity, View } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
import Basic3DShape from '../../features/restaurants/components/Test_3D';

const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => (
  <View style={{ flex: 1 }}>
    <Basic3DShape />
    <Text>Checkout Navigator</Text>
  </View>
);