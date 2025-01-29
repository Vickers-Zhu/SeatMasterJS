// features/reservations/components/PastReservationCard.js

import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled, { useTheme } from "styled-components/native";

import { Spacer } from "../../../components/Spacer/Spacer";
import { CustomText } from "../../../components/CustomText/CustomText";

import {
  PastReservationCardContainer,
  CircleImage,
  InfoContainer,
  InfoText,
  StatusText,
  ViewStoreButton,
  ViewStoreButtonText,
} from "./PastReservationCard.styles";

export const PastReservationCard = ({ reservation = {} }) => {
  const navigation = useNavigation();

  const {
    restaurant = {},
    date = "2024-04-01",
    status = "Completed",
  } = reservation;

  return (
    <PastReservationCardContainer>
      <CircleImage source={{ uri: restaurant.photos[0] }} />
      <InfoContainer>
        <CustomText variant="title">{restaurant.name}</CustomText>
        <Spacer position="top" size="small" />
        <InfoText>Reserved Date: {date}</InfoText>
        <Spacer position="top" size="small" />
        <StatusText>{status}</StatusText>
      </InfoContainer>
      <ViewStoreButton
        onPress={() => {
          navigation.navigate("RestaurantDetailScreen", {
            restaurant: restaurant,
          });
        }}
      >
        <ViewStoreButtonText>View Store</ViewStoreButtonText>
      </ViewStoreButton>
    </PastReservationCardContainer>
  );
};
