// features/reservations/screens/ReservationsScreen.js

import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

import { CustomText } from "../../../components/CustomText/CustomText";
import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../components/Spacer/Spacer";
import { ReservationCard } from "../components/ReservationCard";

const Container = styled(SafeArea)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
`;

const SectionTitle = styled(CustomText)`
  margin-left: ${(props) => props.theme.space[2]};
`;

export const ReservationsScreen = () => {
  // Sample data; replace with actual data fetched from backend or state management
  const reservations = [
    {
      id: 1,
      name: "La Piazza",
      photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      date: "2024-04-01",
      time: "7:00 PM",
      seatsNumber: 4,
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Sushi World",
      photo: "https://images.unsplash.com/photo-1553621042-f6e147245754",
      date: "2024-04-05",
      time: "8:00 PM",
      seatsNumber: 2,
      status: "Pending",
    },
    {
      id: 3,
      name: "Burger House",
      photo: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      date: "2024-03-20",
      time: "6:00 PM",
      seatsNumber: 3,
      status: "Completed",
    },
    {
      id: 4,
      name: "Curry Corner",
      photo: "https://images.unsplash.com/photo-1604908177520-55b6053ebf93",
      date: "2024-03-15",
      time: "7:30 PM",
      seatsNumber: 5,
      status: "Cancelled",
    },
    // Add more reservations as needed
  ];

  // Split reservations into current and past (for future differentiation)
  const currentReservations = reservations.slice(0, 1); // First two as current
  const pastReservations = reservations.slice(2); // Remaining as past

  return (
    <Container>
      <ScrollView>
        {/* Current Reservations */}
        <Spacer position="top" size="small" />
        <SectionTitle variant="title">Current Reservations</SectionTitle>
        {currentReservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}

        <Spacer position="top" size="large" />

        {/* Past Reservations */}
        <SectionTitle variant="title">Past Reservations</SectionTitle>
        <Spacer position="top" size="small" />
        {pastReservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </ScrollView>
    </Container>
  );
};
