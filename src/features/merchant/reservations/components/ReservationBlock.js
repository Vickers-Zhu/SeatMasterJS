// src/features/merchant/reservations/components/ReservationBlock.js
import React from "react";
import {
  ReservationBlock as StyledReservationBlock,
  ReservationName,
  ReservationDetails,
} from "./MerchantReservation.styles";
import { getReservationPosition } from "../utils/reservationUtils";
import { GRID_CONSTANTS } from "../utils/reservationGridUtils";

const ReservationBlock = ({
  reservation,
  tables,
  counterSeats,
  isSelected,
  onPress,
}) => {
  const { TABLE_WIDTH, COUNTER_SEAT_WIDTH, TIME_SLOT_HEIGHT } = GRID_CONSTANTS;

  let position;

  if (reservation.isCounterSeat) {
    position = getReservationPosition(
      reservation,
      tables,
      counterSeats,
      TABLE_WIDTH,
      COUNTER_SEAT_WIDTH,
      TIME_SLOT_HEIGHT,
      true
    );
  } else {
    position = getReservationPosition(
      reservation,
      tables,
      counterSeats,
      TABLE_WIDTH,
      COUNTER_SEAT_WIDTH,
      TIME_SLOT_HEIGHT
    );
  }

  if (!position) return null;

  return (
    <StyledReservationBlock
      {...position}
      status={reservation.status}
      onPress={() => onPress(reservation)}
      style={{
        borderWidth: isSelected ? 2 : 0,
        borderColor: "blue",
      }}
    >
      <ReservationName>{reservation.customerName}</ReservationName>
      <ReservationDetails>
        {reservation.time} • {reservation.people}{" "}
        {reservation.people > 1 ? "people" : "person"}
      </ReservationDetails>
    </StyledReservationBlock>
  );
};

export default ReservationBlock;
