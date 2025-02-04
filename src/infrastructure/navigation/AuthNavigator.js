// src/infrastructure/navigation/AuthNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../../features/auth/screens/LoginScreen";
// Import additional authentication screens if needed

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
    </Stack.Navigator>
  );
};
