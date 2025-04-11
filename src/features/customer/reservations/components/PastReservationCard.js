// src/features/customer/reservations/components/PastReservationCard.js
import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import styled, { useTheme } from "styled-components/native";

import { Spacer } from "../../../../components/Spacer/Spacer";
import { CustomText } from "../../../../components/CustomText/CustomText";

import {
  PastReservationCardContainer,
  CircleImage,
  InfoContainer,
  InfoText,
  StatusText,
  ViewStoreButton,
  ViewStoreButtonText,
} from "./PastReservationCard.styles";

// New style for selected state
const SelectedPastCardContainer = styled(PastReservationCardContainer)`
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.bg.secondary : "transparent"};
  border-radius: 8px;
`;

export const PastReservationCard = ({
  reservation = {},
  isSelected = false,
}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const {
    restaurant = {},
    date = "2024-04-01",
    status = "Completed",
  } = reservation;

  const formattedDate =
    typeof date === "string" ? date : format(date, "MMM d, yyyy");

  return (
    <SelectedPastCardContainer isSelected={isSelected}>
      <CircleImage source={{ uri: restaurant.photos[0] }} />
      <InfoContainer>
        <CustomText variant="title">{restaurant.name}</CustomText>
        <Spacer position="top" size="small" />
        <InfoText>Reserved Date: {formattedDate}</InfoText>
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
        <ViewStoreButtonText>View</ViewStoreButtonText>
      </ViewStoreButton>
    </SelectedPastCardContainer>
  );
};
