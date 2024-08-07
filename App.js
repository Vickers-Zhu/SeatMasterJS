// import 'expo-dev-client';
import { theme } from './src/infrastructure/theme';
import { ThemeProvider } from 'styled-components/native';
import { Navigation } from './src/infrastructure/navigation';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';


export default function App() {
  return (
      <>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
        <ExpoStatusBar style="auto" />
      </>
  );
}