// src/features/merchant/screens/MerchantSettingsScreen.js
import React from "react";
import styled from "styled-components/native";

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

export const MerchantSettingsScreen = () => {
  return (
    <Container>
      <Title>Merchant Settings Screen</Title>
    </Container>
  );
};
