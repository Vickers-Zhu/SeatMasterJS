// import 'expo-dev-client';
import { theme } from "./src/infrastructure/theme";
import { ThemeProvider } from "styled-components/native";
import { AuthenticationContextProvider } from "./src/services/AuthenticationContext";
import { Navigation } from "./src/infrastructure/navigation";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Constants from "expo-constants";

export default function App() {
  return (
    <>
      <AuthenticationContextProvider>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </AuthenticationContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
