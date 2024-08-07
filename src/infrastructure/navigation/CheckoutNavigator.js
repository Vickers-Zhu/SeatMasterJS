import React from 'react';
import { ScrollView, TextInput, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';


import { createStackNavigator } from '@react-navigation/stack';
import Chairs from '../../features/3d/Chairs';
import WebApp from '../../components/WebApp/WebApp';


const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => {
  
  return (
    <View style={{ flex: 1 }}>
      <WebApp />
      {/* <Chairs /> */}
      <Text>Checkout Navigator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
});