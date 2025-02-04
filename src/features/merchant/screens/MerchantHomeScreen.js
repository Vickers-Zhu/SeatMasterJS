// src/features/merchant/screens/MerchantHomeScreen.js
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const MerchantHomeScreen = () => {
  return (
    <Container>
      <Title>Merchant Home Screen</Title>
    </Container>
  );
};
