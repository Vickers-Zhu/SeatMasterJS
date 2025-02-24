// features/reservations/components/PastReservationCard.styles.js

import styled from "styled-components/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

/**
 * Styled Components for PastReservationCard
 */

// Main Card Container
export const PastReservationCardContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  border-radius: 8px;
  margin-vertical: ${(props) => props.theme.space[2]};
`;

// Circular Image
export const CircleImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

// Container for Information
export const InfoContainer = styled(View)`
  flex: 1;
  margin-left: ${(props) => props.theme.space[3]};
`;

// Styled Text for Information
export const InfoText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
`;

// Styled Text for Status
export const StatusText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
`;

// Styled TouchableOpacity for View Store Button
export const ViewStoreButton = styled(TouchableOpacity)`
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  border-radius: 25px;
`;

// Styled Text Inside View Store Button
export const ViewStoreButtonText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: center;
`;
