// features/reservations/components/ReservationCard.styles.js

import styled from "styled-components/native";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-paper";

/**
 * Styled Components for ReservationCard
 */

// Main Card Container
export const ReservationCardContainer = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 98%;
  align-self: center;
  border-radius: 8px;

  /* Remove elevation for Android */
  elevation: 0;

  /* Remove shadow for iOS */
  shadow-color: transparent;
  shadow-offset: {
    width: 0px;
    height: 0px;
  }
  shadow-opacity: 0;
  shadow-radius: 0px;
`;

// Cover Image of the Restaurant
export const ReservationCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 150px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

// Info Container for Reservation Details
export const Info = styled(View)`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: 0;
  margin-top: -5px;
`;

// Section for Reservation Details and Track Button
export const Section = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.space[2]};
`;

// Container for Reservation Details (Time, Seats, Date)
export const ReservationDetails = styled(View)`
  flex-direction: column;
`;

// Styled Text for Reservation Details
export const DetailText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
`;

// Styled TouchableOpacity for Track Button
export const TrackButton = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.primary};
  border-radius: 25px;
`;

// Styled Text Inside Track Button
export const TrackButtonText = styled(Text)`
  padding: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) =>
    parseInt(props.theme.fontSizes.body.replace("px", ""), 10)};
  color: ${(props) => props.theme.colors.bg.primary};
  text-align: center;
`;
