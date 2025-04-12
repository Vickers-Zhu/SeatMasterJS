// src/features/customer/reservations/components/ReservationCard.js
import React from "react";
import { View } from "react-native";
import { format, isToday, isTomorrow } from "date-fns";
import styled, { useTheme } from "styled-components/native";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { MaterialIcons } from "@expo/vector-icons";
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

const SelectedIndicator = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid ${(props) => props.theme.colors.ui.primary};
  border-radius: 8px;
  pointer-events: none;
`;

const StatusContainer = styled.View`
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  background-color: ${(props) => {
    switch (props.status) {
      case "Confirmed":
        return "#4CAF50";
      case "Pending":
        return "#FFC107";
      default:
        return "#757575";
    }
  }};
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border-radius: 4px;
`;

const StatusText = styled(CustomText)`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: bold;
`;

const IconRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${(props) => props.theme.space[1]};
`;

const formatDate = (date) => {
  if (isToday(new Date(date))) return "Today";
  if (isTomorrow(new Date(date))) return "Tomorrow";
  return format(new Date(date), "EEE, MMM d");
};

export const ReservationCard = ({ reservation = {}, isSelected = false }) => {
  const theme = useTheme();
  const {
    restaurant = {},
    date = "2024-04-01",
    time = "7:00 PM",
    seatsNumber = 4,
    people = 4,
    status = "Confirmed",
  } = reservation;
  
  // Use either seatsNumber or people for party size display (whichever is defined)
  const partySize = people || seatsNumber;

  return (
    <ReservationCardContainer elevation={0}>
      <ReservationCardCover source={{ uri: restaurant.photos[0] }} />
      <StatusContainer status={status}>
        <StatusText>{status}</StatusText>
      </StatusContainer>
      <Info>
        <CustomText variant="title">{restaurant.name}</CustomText>
        <Section>
          <ReservationDetails>
            <IconRow>
              <MaterialIcons
                name="event"
                size={16}
                color={theme.colors.text.primary}
              />
              <Spacer position="left" size="small" />
              <DetailText>{formatDate(date)}</DetailText>
            </IconRow>
            <IconRow>
              <MaterialIcons
                name="schedule"
                size={16}
                color={theme.colors.text.primary}
              />
              <Spacer position="left" size="small" />
              <DetailText>{time}</DetailText>
            </IconRow>
            <IconRow>
              <MaterialIcons
                name="people"
                size={16}
                color={theme.colors.text.primary}
              />
              <Spacer position="left" size="small" />
              <DetailText>
                {partySize} {partySize === 1 ? "person" : "people"}
              </DetailText>
            </IconRow>
          </ReservationDetails>
          <TrackButton>
            <TrackButtonText>Details</TrackButtonText>
          </TrackButton>
        </Section>
      </Info>
      {isSelected && <SelectedIndicator />}
    </ReservationCardContainer>
  );
};