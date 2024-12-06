// src/features/settings/screens/AccountSettingsScreen.styles.js
import styled from "styled-components/native";
import { ScrollView, View } from "react-native";
import { Avatar } from "react-native-paper";
import { CustomText } from "../../../components/CustomText/CustomText";

export const SettingsContainer = styled(ScrollView)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Centers the title */
  padding: ${(props) => props.theme.space[2]};
  position: relative;
`;

export const CloseButtonWrapper = styled.View`
  position: absolute;
  left: ${(props) => props.theme.space[2]};
`;

export const SectionTitle = styled(CustomText)`
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[3]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const FrameLine = styled.View`
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  margin: ${(props) => props.theme.space[1]};
  border-radius: 8px;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${(props) => props.theme.space[0]};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

export const ItemTextContainer = styled.View`
  flex-direction: column;
`;

export const BoldText = styled(CustomText)`
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const InfoText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.secondary};
`;
