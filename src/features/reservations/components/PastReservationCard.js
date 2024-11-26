// features/reservations/components/PastReservationCard.js

import React from "react";
import { View } from "react-native";
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
  const {
    name = "Restaurant Name",
    photo = "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    date = "2024-04-01",
    status = "Completed", // Extendable for other statuses
  } = reservation;

  return (
    <PastReservationCardContainer>
      <CircleImage source={{ uri: photo }} />
      <InfoContainer>
        <CustomText variant="title">{name}</CustomText>
        <Spacer position="top" size="small" />
        <InfoText>Reserved Date: {date}</InfoText>
        <Spacer position="top" size="small" />
        <StatusText>{status}</StatusText>
      </InfoContainer>
      <ViewStoreButton
        onPress={() => {
          // Handle view store action
          console.log(`Viewing store for ${name}`);
        }}
      >
        <ViewStoreButtonText>View Store</ViewStoreButtonText>
      </ViewStoreButton>
    </PastReservationCardContainer>
  );
};
