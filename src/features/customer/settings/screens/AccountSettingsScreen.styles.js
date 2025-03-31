// src/features/customer/settings/screens/AccountSettingsScreen.styles.js
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { CustomText } from "../../../../components/CustomText/CustomText";

export const SettingsContainer = styled(ScrollView)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  position: relative;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const CloseButtonWrapper = styled.View`
  position: absolute;
  left: ${(props) => props.theme.space[2]};
`;

export const SectionTitle = styled(CustomText)`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  margin-bottom: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[3]};
`;

export const SectionContainer = styled.View`
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const SettingsItemRow = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const SettingsItemText = styled.View`
  flex: 1;
  margin-left: ${(props) => props.theme.space[3]};
`;
