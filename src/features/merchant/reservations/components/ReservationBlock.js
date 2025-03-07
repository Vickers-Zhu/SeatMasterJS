// src/features/merchant/reservations/components/ReservationBlock.js
import React from "react";
import {
  ReservationBlock as StyledReservationBlock,
  ReservationName,
  ReservationDetails,
} from "./MerchantReservation.styles";
import { getReservationPosition } from "../utils/reservationUtils";

const ReservationBlock = ({
  reservation,
  tables,
  tableWidth,
  timeSlotHeight,
  isSelected,
  onPress,
}) => {
  const position = getReservationPosition(
    reservation,
    tables,
    tableWidth,
    timeSlotHeight
  );

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
