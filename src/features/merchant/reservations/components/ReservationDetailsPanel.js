// src/features/merchant/reservations/components/ReservationDetailsPanel.js
import React from "react";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { CustomText } from "../../../../components/CustomText/CustomText";
import {
  ReservationPanel,
  ButtonsRow,
  ActionButton,
} from "./MerchantReservation.styles";

const ReservationDetailsPanel = ({ reservation, onClose }) => {
  if (!reservation) return null;

  return (
    <ReservationPanel>
      <CustomText variant="title">{reservation.customerName}</CustomText>
      <Spacer position="top" size="small" />
      <CustomText variant="body">
        Time: {reservation.time} ({reservation.duration} min)
      </CustomText>
      <CustomText variant="body">
        Party: {reservation.people}{" "}
        {reservation.people > 1 ? "people" : "person"}
      </CustomText>

      {/* Show appropriate seating info based on reservation type */}
      {reservation.isCounterSeat ? (
        <CustomText variant="body">
          Counter Seat: {reservation.counterSeatId}
        </CustomText>
      ) : (
        <CustomText variant="body">
          Table: {reservation.tableId} • Chairs: {reservation.chairs.join(", ")}
        </CustomText>
      )}

      {reservation.note && (
        <CustomText variant="body">Note: {reservation.note}</CustomText>
      )}
      <Spacer position="top" size="medium" />
      <ButtonsRow>
        <ActionButton variant="confirm" onPress={onClose}>
          <CustomText>Confirm</CustomText>
        </ActionButton>
        <ActionButton onPress={onClose}>
          <CustomText>Cancel</CustomText>
        </ActionButton>
      </ButtonsRow>
    </ReservationPanel>
  );
};

export default ReservationDetailsPanel;
