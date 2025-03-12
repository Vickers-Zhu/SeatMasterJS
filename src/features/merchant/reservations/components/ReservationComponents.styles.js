// src/features/merchant/reservations/components/ReservationComponents.styles.js
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import { Animated } from "react-native";
import { CustomText } from "../../../../components/CustomText/CustomText";

// Tab bar styles
export const TabBar = styled.View`
  flex-direction: row;
  padding: 8px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Tab = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 10px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-width: ${(props) => (props.active ? "2px" : "1px")};
  border-color: ${(props) =>
    props.active
      ? props.theme.colors.ui.primary
      : props.theme.colors.ui.tertiary};
  border-radius: 6px;
  margin-horizontal: 4px;
  elevation: ${(props) => (props.active ? 2 : 0)};
  shadow-opacity: ${(props) => (props.active ? 0.2 : 0)};
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const TabText = styled(CustomText)`
  margin-left: 8px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) =>
    props.active
      ? props.theme.colors.ui.primary
      : props.theme.colors.text.secondary};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

// Reservation visual elements
export const ReservationBlockStyled = styled(TouchableOpacity)`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) =>
    props.status === "confirmed"
      ? "#b3ffb3"
      : props.status === "pending"
      ? "#ffd11a"
      : "#ff4d4d"};
  border-radius: 5px;
  padding: ${(props) => props.theme.space[1]};
  justify-content: space-between;
  z-index: 1;
  box-sizing: border-box;
  ${(props) =>
    props.isSelected &&
    !props.isPending &&
    `
    border-width: 2px;
    border-color: blue;
  `}
`;

export const PendingBorder = styled(Animated.View)`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-width: 3px;
  border-color: #ff6b6b;
  border-radius: 7px;
  z-index: 2;
  pointer-events: none;
`;

export const ReservationName = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const ReservationDetails = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

// Panel styles for details display
export const ReservationPanelStyled = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.ui.tertiary};
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ActionButton = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[2]};
  border-radius: 5px;
  min-width: 100px;
  align-items: center;
  background-color: ${(props) =>
    props.variant === "confirm" ? "#b3ffb3" : "#ff4d4d"};
`;
