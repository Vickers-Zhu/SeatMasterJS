import React from "react";
import {
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system";

import { createStackNavigator } from "@react-navigation/stack";

const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Checkout Navigator</Text>
    </View>
  );
};
