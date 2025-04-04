// App.js - Root application file
import React from "react";
import { theme } from "./src/infrastructure/theme";
import { ThemeProvider } from "styled-components/native";
import { AuthenticationContextProvider } from "./src/services/AuthenticationContext";
import { LanguageContextProvider } from "./src/services/LanguageContext";
import { Navigation } from "./src/infrastructure/navigation";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import "./src/services/i18n";

export default function App() {
  return (
    <>
      <LanguageContextProvider>
        <AuthenticationContextProvider>
          <ThemeProvider theme={theme}>
            <Navigation />
          </ThemeProvider>
        </AuthenticationContextProvider>
      </LanguageContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
