// features/reservations/components/ReservationCard.js

import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled, { useTheme } from "styled-components/native";

import { Spacer } from "../../../../components/Spacer/Spacer";
import { CustomText } from "../../../../components/CustomText/CustomText";

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
  const navigation = useNavigation();
  const theme = useTheme();

  const {
    restaurant = {},
    date = "2024-04-01",
    time = "7:00 PM",
    seatsNumber = 4,
    status = "Confirmed",
  } = reservation;

  return (
    <ReservationCardContainer elevation={0}>
      <ReservationCardCover source={{ uri: restaurant.photos[0] }} />
      <Info>
        <CustomText variant="title">{restaurant.name}</CustomText>
        <Section>
          <ReservationDetails>
            <DetailText>Time: {time}</DetailText>
            <DetailText>Seats: {seatsNumber}</DetailText>
            <DetailText>Date: {date}</DetailText>
          </ReservationDetails>
          <TrackButton
            onPress={() => {
              navigation.navigate("RestaurantDetailScreen", {
                restaurant: restaurant,
                presentationStyle: "modal",
                openReservationView: true,
              });
            }}
          >
            <TrackButtonText>Track</TrackButtonText>
          </TrackButton>
        </Section>
      </Info>
    </ReservationCardContainer>
  );
};
