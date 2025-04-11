// App.js
import React from "react";
import { theme } from "./src/infrastructure/theme";
import { ThemeProvider } from "styled-components/native";
import { AuthenticationContextProvider } from "./src/services/AuthenticationContext";
import { LanguageContextProvider } from "./src/services/LanguageContext";
import { ReservationProvider } from "./src/services/ReservationContext"; // Add ReservationContext
import { Navigation } from "./src/infrastructure/navigation";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import "./src/services/i18n";

export default function App() {
  return (
    <>
      <LanguageContextProvider>
        <AuthenticationContextProvider>
          <ReservationProvider>
            {/* Wrap with ReservationProvider */}
            <ThemeProvider theme={theme}>
              <Navigation />
            </ThemeProvider>
          </ReservationProvider>
        </AuthenticationContextProvider>
      </LanguageContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
