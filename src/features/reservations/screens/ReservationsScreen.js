// features/reservations/screens/ReservationsScreen.js

import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

import { reservations } from "../../../data/mockData";
import { CustomText } from "../../../components/CustomText/CustomText";
import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../components/Spacer/Spacer";
import { ReservationCard } from "../components/ReservationCard";
import { PastReservationCard } from "../components/PastReservationCard";
import { Separator } from "../../../components/Separator/Separator";

const Container = styled(SafeArea)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
`;

const SectionTitle = styled(CustomText)`
  margin-left: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
`;

export const ReservationsScreen = () => {
  // Split reservations into current and past (for future differentiation)
  const currentReservations = reservations.slice(0, 1); // First two as current
  const pastReservations = reservations.slice(1); // Remaining as past

  return (
    <Container>
      <ScrollView>
        {/* Current Reservations */}
        <Spacer position="top" size="small" />
        <SectionTitle variant="title">Current Reservations</SectionTitle>
        {currentReservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
        <Separator type="full" />

        {/* Past Reservations */}
        <SectionTitle variant="title">Past Reservations</SectionTitle>
        <Spacer position="top" size="small" />
        {pastReservations.map((reservation) => (
          <React.Fragment key={reservation.id}>
            <PastReservationCard reservation={reservation} />
            <Separator type="partial" />
          </React.Fragment>
        ))}
      </ScrollView>
    </Container>
  );
};
