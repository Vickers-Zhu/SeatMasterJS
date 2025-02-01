import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MerchantHomeScreen } from "../../features/merchant/screens/MerchantHomeScreen";
import { MerchantSettingsScreen } from "../../features/merchant/screens/MerchantSettingsScreen";

const MerchantStack = createStackNavigator();

export const MerchantNavigator = () => {
  return (
    <MerchantStack.Navigator>
      <MerchantStack.Screen
        name="MerchantHome"
        component={MerchantHomeScreen}
      />
      <MerchantStack.Screen
        name="MerchantSettings"
        component={MerchantSettingsScreen}
      />
    </MerchantStack.Navigator>
  );
};
