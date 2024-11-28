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

import { restaurants } from "../../../data/mockData"; // Import restaurants data

export const PastReservationCard = ({ reservation = {} }) => {
  const navigation = useNavigation();

  const {
    name = "Restaurant Name",
    photo = "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    date = "2024-04-01",
    status = "Completed", // Extendable for other statuses
  } = reservation;

  // Find the corresponding restaurant based on the photo URL
  const correspondingRestaurant = restaurants.find((restaurant) =>
    restaurant.photos.includes(photo)
  );

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
          if (correspondingRestaurant) {
            // Navigate to RestaurantDetailScreen with restaurant data
            navigation.navigate("RestaurantDetailScreen", {
              restaurant: correspondingRestaurant,
            });
          } else {
            console.log(`No corresponding restaurant found for ${name}`);
          }
        }}
      >
        <ViewStoreButtonText>View Store</ViewStoreButtonText>
      </ViewStoreButton>
    </PastReservationCardContainer>
  );
};
