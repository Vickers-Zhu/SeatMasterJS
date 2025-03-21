// src/features/auth/components/CountryListItem.styles.js
import styled from "styled-components/native";
import { View, Text } from "react-native";

/**
 * Container for each list item
 */
export const ListItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-bottom-width: 0.5px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
`;

/**
 * Container for country info on the left side
 */
export const CountryInfoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-right: ${(props) => props.theme.space[2]};
`;

/**
 * Text for country flag emoji
 */
export const FlagText = styled(Text)`
  font-size: 20px;
  margin-right: ${(props) => props.theme.space[2]};
`;

/**
 * Text for country name
 */
export const CountryNameText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  flex: 1;
`;

/**
 * Text for country code
 */
export const CodeText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;
