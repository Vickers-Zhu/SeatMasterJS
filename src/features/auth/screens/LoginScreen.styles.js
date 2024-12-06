// src/features/auth/screens/LoginScreen.styles.js

import styled from "styled-components/native";
import { CustomText } from "../../../components/CustomText/CustomText";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[4]};
`;

export const Logo = styled.Image`
  height: 100px;
  width: 100px;
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const InputContainer = styled.View`
  width: 100%;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const TextInput = styled.TextInput`
  width: 100%;
  padding: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.space[2]};
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.primary};
  border-radius: ${(props) => props.theme.space[1]};
  align-items: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

export const ButtonText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const LinkText = styled(CustomText)`
  margin-top: ${(props) => props.theme.space[2]};
  color: ${(props) => props.theme.colors.text.secondary};
  text-decoration: underline;
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const ErrorText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
  margin-top: ${(props) => props.theme.space[1]};
`;

export const TitleText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.primary};
  padding-bottom: ${(props) => props.theme.space[4]};
  font-size: ${(props) => props.theme.fontSizes.title};
`;
