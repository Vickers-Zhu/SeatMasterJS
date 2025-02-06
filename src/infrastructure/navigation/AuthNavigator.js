// src/infrastructure/navigation/AuthNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../../features/auth/screens/LoginScreen";
import { globalScreenOptions } from "../options/GlobalScreenOptions";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={globalScreenOptions.nonHeader}>
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* You can add more auth screens here, and they will all have no header */}
    </Stack.Navigator>
  );
};
