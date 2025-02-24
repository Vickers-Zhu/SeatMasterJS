// src/features/settings/screens/SettingsScreen.styles.js

import styled from "styled-components/native";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { CustomText } from "../../../../components/CustomText/CustomText";

export const SafeArea = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const SettingsContainer = styled(ScrollView)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ProfileContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const UserInfoContainer = styled(View)`
  flex: 1;
  margin-right: ${(props) => props.theme.space[2]};
  align-items: flex-start;
`;

export const AvatarContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const EmailText = styled(CustomText)`
  margin-left: ${(props) => props.theme.space[1]};
`;
