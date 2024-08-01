import React from 'react';
import { ScrollView, TextInput, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';


import { createStackNavigator } from '@react-navigation/stack';
import Basic3DShape from '../../features/restaurants/components/Test_3D';
import Chairs from '../../features/3d/Chairs';


const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => {
  
  return (
    <View style={{ flex: 1 }}>
      <WebView 
        style={styles.container} 
        source={{uri: 'http://192.168.50.135:3000'}}
      />
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