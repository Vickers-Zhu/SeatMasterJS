// src/features/merchant/screens/MerchantSettingsScreen.js
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { useAuthentication } from "../../../../services/AuthenticationContext";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.primary};
`;

const LogoutButton = styled(TouchableOpacity)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.ui.error};
  border-radius: 8px;
`;

const LogoutButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const MerchantSettingsScreen = () => {
  const { onLogout } = useAuthentication();

  return (
    <Container>
      <Title>Merchant Settings Screen</Title>
      <LogoutButton onPress={onLogout}>
        <LogoutButtonText>Logout</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};
