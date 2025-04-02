// src/infrastructure/navigation/index.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { GlobalWrapper } from "../../components/GlobalWrapper/GlobalWrapper";
import { useAuthentication } from "../../services/AuthenticationContext";

export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();

  return (
    <GlobalWrapper>
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </GlobalWrapper>
  );
};
