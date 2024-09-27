// src/components/WebApp/styles.js
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { TouchableOpacity, Text, View } from "react-native";

// Container for WebView with dynamic height
export const Container = styled.View`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;

// Styled WebView
export const StyledWebView = styled(WebView)`
  flex: 1;
  width: 100%;
`;

// Footer container
export const Footer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.ui.tertiary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// Text displaying selected chairs
export const SelectedText = styled(Text)`
  flex: 1;
  margin-right: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: ${({ theme }) => theme.fonts.body};
`;

// Cancel button
export const CancelButton = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.ui.error};
  border-radius: 4px;
`;

// Text inside the Cancel button
export const CancelButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.button};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
`;
