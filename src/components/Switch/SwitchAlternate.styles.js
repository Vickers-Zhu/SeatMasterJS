import styled from "styled-components/native";
import { Animated, Text } from "react-native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.theme.space[2]}; /* using theme spacing */
`;

export const SwitchBackground = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) =>
    props.theme.colors.ui.disabled}; /* alternate background */
  border-radius: 25px;
  width: 200px;
  height: 50px;
  padding: ${(props) => props.theme.space[1]};
`;

export const Capsule = styled(Animated.View)`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: ${(props) =>
    props.theme.colors.ui.primary}; /* white if theme is set accordingly */
  border-radius: 25px;
  margin: ${(props) => props.theme.space[1]};
`;

export const TextWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) =>
    props.active
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
`;
