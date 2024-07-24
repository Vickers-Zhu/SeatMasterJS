import React from 'react';
import { StatusBar as RNStatusBar, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const StatusBarBackground = styled(View)`
  background-color: ${(props) => props.backgroundColor || 'transparent'};
`;

const CustomStatusBar = ({ backgroundColor }) => {
  const insets = useSafeAreaInsets();
  return (
    <StatusBarBackground style={{ height: insets.top }} backgroundColor={backgroundColor} />
  );
};

export const GlobalWrapper = ({ children }) => (
  <SafeAreaProvider>
    <RNStatusBar barStyle="dark-content" />
    <CustomStatusBar backgroundColor="white" />
    {children}
  </SafeAreaProvider>
);
