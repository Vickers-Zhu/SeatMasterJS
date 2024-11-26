// features/reservations/components/ReservationCard.js

import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";

import { Spacer } from "../../../components/Spacer/Spacer";
import { CustomText } from "../../../components/CustomText/CustomText";

import star from "../../../../assets/icons/star";
import open from "../../../../assets/icons/open";

import {
  ReservationCardContainer,
  ReservationCardCover,
  Info,
  Section,
  ReservationDetails,
  DetailText,
  TrackButton,
  TrackButtonText,
} from "./ReservationCard.styles";

export const ReservationCard = ({ reservation = {} }) => {
  const theme = useTheme(); // Access the theme using styled-components

  const {
    name = "Restaurant Name",
    photo = "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    date = "2024-04-01",
    time = "7:00 PM",
    seatsNumber = 4,
    status = "Confirmed", // Possible values: 'Confirmed', 'Pending', 'Cancelled'
  } = reservation;

  return (
    <ReservationCardContainer elevation={0}>
      <ReservationCardCover source={{ uri: photo }} />
      <Info>
        <CustomText variant="title">{name}</CustomText>
        <Section>
          <ReservationDetails>
            <DetailText>Time: {time}</DetailText>
            <DetailText>Seats: {seatsNumber}</DetailText>
            <DetailText>Date: {date}</DetailText>
          </ReservationDetails>
          <TrackButton
            onPress={() => {
              // Handle tracking reservation (e.g., navigate to tracking screen)
              console.log(`Tracking reservation for ${name}`);
            }}
          >
            <TrackButtonText>Track</TrackButtonText>
          </TrackButton>
        </Section>
      </Info>
    </ReservationCardContainer>
  );
};
