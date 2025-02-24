// features/reservations/screens/ReservationsScreen.js

import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { reservations } from "../../../../data/mockData";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { Separator } from "../../../../components/Separator/Separator";
import { ReservationCard } from "../components/ReservationCard";
import { PastReservationCard } from "../components/PastReservationCard";

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
  const navigation = useNavigation();

  // Filter reservations based on status
  const currentReservations = reservations.filter(
    (reservation) =>
      reservation.status === "Confirmed" || reservation.status === "Pending"
  );
  const pastReservations = reservations.filter(
    (reservation) => reservation.status === "Completed"
  );

  return (
    <Container>
      <ScrollView>
        {/* Current Reservations */}
        <Spacer position="top" size="small" />
        <SectionTitle variant="title">Current Reservations</SectionTitle>
        {currentReservations.map((reservation, index) => (
          <React.Fragment key={reservation.id}>
            <ReservationCard reservation={reservation} />
            {currentReservations.length > 2 &&
              index < currentReservations.length - 1 && (
                <Separator type="full" />
              )}
          </React.Fragment>
        ))}
        <Separator type="full" />

        {/* Past Reservations */}
        <SectionTitle variant="title">Past Reservations</SectionTitle>
        <Spacer position="top" size="small" />
        {pastReservations.map((reservation, index) => (
          <React.Fragment key={reservation.id}>
            <PastReservationCard reservation={reservation} />
            {index < pastReservations.length - 1 && (
              <Separator type="partial" />
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </Container>
  );
};
