import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { Text } from 'react-native';

const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => {

  return (
    <Text>Settings Navigator</Text>
    );
}