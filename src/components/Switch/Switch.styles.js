import styled from "styled-components/native";
import { Animated, Text } from "react-native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const SwitchBackground = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.disabled};
  border-radius: 25px;
  width: 200px; /* Make the container longer */
  height: 50px;
  padding: 3px;
`;

export const Capsule = styled(Animated.View)`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 25px;
  margin: 3px;
`;

export const TextWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  color: ${(props) => props.theme.colors.text.primary};
`;
