// src/features/merchant/reservations/screens/MerchantReservationsScreen.js
import React from "react";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { seatingData, merchantReservations } from "../../../../data/mockData";
import { generateTimeSlots } from "../utils/timeUtils";
import ReservationsGrid from "../components/ReservationsGrid";

export const MerchantReservationsScreen = () => {
  // Generate time slots from 9:00 to 22:30
  const timeSlots = generateTimeSlots();

  return (
    <SafeArea>
      <ReservationsGrid
        timeSlots={timeSlots}
        tables={seatingData.tables}
        counterSeats={seatingData.counterSeats}
        reservations={merchantReservations}
      />
    </SafeArea>
  );
};
