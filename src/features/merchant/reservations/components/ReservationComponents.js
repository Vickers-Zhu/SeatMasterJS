// src/features/merchant/reservations/components/ReservationComponents.js
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { CustomText } from "../../../../components/CustomText/CustomText";
import {
  SharedTableItem,
  SharedChairItem,
} from "../../dashboard/components/SharedTableStyles.styles";
import {
  ReservationBlockStyled,
  ReservationName,
  ReservationDetails,
  ReservationPanelStyled,
  ButtonsRow,
  ActionButton,
} from "./ReservationComponents.styles";

// Styled components specific to this file
const TableColumn = styled.View`
  width: ${(props) => props.width}px;
  align-items: center;
  border-left-width: 1px;
  border-left-color: ${(props) => props.theme.colors.ui.tertiary};
  padding-horizontal: ${(props) => props.theme.space[2]};
  padding-vertical: ${(props) => props.theme.space[2]};
`;

const TableItem = styled.View`
  align-items: center;
`;

const ChairsGrid = styled.View`
  flex-direction: column;
  justify-content: center;
  width: 58px;
  margin-top: ${(props) => props.theme.space[1]};
`;

const ChairRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 1px;
`;

const ChairItem = styled(SharedChairItem)`
  width: 22px;
  height: 22px;
  margin: 2px;
  justify-content: center;
  align-items: center;
`;

const ShowMoreButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding-horizontal: ${(props) => props.theme.space[1]};
  padding-vertical: 2px;
  border-radius: 4px;
  margin-top: 4px;
  align-items: center;
`;

const ButtonText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const CounterSeatHeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const CounterSeatTitle = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

// Helper function for arranging chairs in rows
const getChairRows = (chairs, perRow = 2) => {
  const rows = [];
  for (let i = 0; i < chairs.length; i += perRow) {
    rows.push(chairs.slice(i, i + perRow));
  }
  return rows;
};

// Calculate the position of a reservation block
const getReservationPosition = (
  reservation,
  tables,
  counterSeats,
  tableWidth,
  counterSeatWidth,
  timeSlotHeight,
  isCounterSeat = false
) => {
  if (isCounterSeat) {
    const counterSeatIndex = counterSeats.findIndex(
      (seat) => seat.id === reservation.counterSeatId
    );

    if (counterSeatIndex === -1) return null;

    const left = counterSeatIndex * counterSeatWidth;

    const [hours, minutes] = reservation.time.split(":").map(Number);
    const startMinutes = (hours - 9) * 60 + minutes;
    const top = (startMinutes / 30) * timeSlotHeight;

    const height = (reservation.duration / 30) * timeSlotHeight;

    return {
      left,
      top,
      width: counterSeatWidth,
      height,
    };
  } else {
    const tableIndex = tables.findIndex(
      (table) => table.id === reservation.tableId
    );

    if (tableIndex === -1) return null;

    const counterSeatsWidth = counterSeats.length * counterSeatWidth;
    const left = counterSeatsWidth + tableIndex * tableWidth;

    const [hours, minutes] = reservation.time.split(":").map(Number);
    const startMinutes = (hours - 9) * 60 + minutes;
    const top = (startMinutes / 30) * timeSlotHeight;

    const height = (reservation.duration / 30) * timeSlotHeight;

    return {
      left,
      top,
      width: tableWidth,
      height,
    };
  }
};

// Table header component
export const TableHeader = ({
  table,
  isExpanded,
  toggleExpand,
  width = 100,
}) => {
  const chairRows = getChairRows(table.chairs, 2);
  const rowsToDisplay = isExpanded ? chairRows : chairRows.slice(0, 1);

  return (
    <TableColumn style={{ width }}>
      <TableItem>
        <SharedTableItem
          status={table.status || "empty"}
          style={{ width: width * 0.6, height: 40 }}
        >
          <CustomText variant="caption">Table {table.id}</CustomText>
        </SharedTableItem>

        <ChairsGrid>
          {rowsToDisplay.map((row, rowIndex) => (
            <ChairRow key={`row-${rowIndex}`}>
              {row.map((chair) => {
                const chairData =
                  typeof chair === "object"
                    ? chair
                    : { id: chair, status: "empty" };
                return (
                  <ChairItem key={chairData.id} status={chairData.status}>
                    <CustomText
                      variant="caption"
                      style={{ fontSize: 10, fontWeight: "bold" }}
                    >
                      {chairData.id.toString().slice(-1)}
                    </CustomText>
                  </ChairItem>
                );
              })}
            </ChairRow>
          ))}
        </ChairsGrid>

        {table.chairs.length > 2 && (
          <ShowMoreButton onPress={toggleExpand}>
            <ButtonText>
              {isExpanded ? "Hide" : `+${table.chairs.length - 2}`}
            </ButtonText>
          </ShowMoreButton>
        )}
      </TableItem>
    </TableColumn>
  );
};

export const CounterSeatHeader = ({
  seat,
  isExpanded,
  toggleExpand,
  width = 60,
}) => {
  const seatData =
    typeof seat === "object" ? seat : { id: seat, status: "empty" };

  return (
    <TableColumn style={{ width }}>
      <CounterSeatHeaderContainer>
        <CounterSeatTitle></CounterSeatTitle>
        <ChairItem status={seatData.status || "empty"} onPress={toggleExpand}>
          <CustomText
            variant="caption"
            style={{ fontSize: 10, fontWeight: "bold" }}
          >
            {seatData.id}
          </CustomText>
        </ChairItem>
      </CounterSeatHeaderContainer>
    </TableColumn>
  );
};

export const ReservationBlock = ({
  reservation,
  tables,
  counterSeats,
  isSelected,
  onPress,
  tableWidth,
  counterSeatWidth,
  timeSlotHeight,
  isCounterSeat = false,
}) => {
  const position = getReservationPosition(
    reservation,
    tables,
    counterSeats,
    tableWidth,
    counterSeatWidth,
    timeSlotHeight,
    isCounterSeat
  );

  if (!position) return null;

  return (
    <ReservationBlockStyled
      {...position}
      status={reservation.status}
      onPress={() => onPress(reservation)}
      isSelected={isSelected}
    >
      <ReservationName>{reservation.customerName}</ReservationName>
      <ReservationDetails>
        {reservation.time} • {reservation.people}{" "}
        {reservation.people > 1 ? "people" : "person"}
      </ReservationDetails>
    </ReservationBlockStyled>
  );
};

export const ReservationDetailsPanel = ({ reservation, onClose }) => {
  if (!reservation) return null;

  return (
    <ReservationPanelStyled>
      <CustomText variant="title">{reservation.customerName}</CustomText>
      <View style={{ marginTop: 8 }}>
        <CustomText variant="body">
          Time: {reservation.time} ({reservation.duration} min)
        </CustomText>
        <CustomText variant="body">
          Party: {reservation.people}{" "}
          {reservation.people > 1 ? "people" : "person"}
        </CustomText>

        {reservation.isCounterSeat ? (
          <CustomText variant="body">
            Counter Seat: {reservation.counterSeatId}
          </CustomText>
        ) : (
          <CustomText variant="body">
            Table: {reservation.tableId} • Chairs:{" "}
            {reservation.chairs ? reservation.chairs.join(", ") : ""}
          </CustomText>
        )}

        {reservation.note && (
          <CustomText variant="body">Note: {reservation.note}</CustomText>
        )}
      </View>

      <View style={{ marginTop: 16 }}>
        <ButtonsRow>
          <ActionButton variant="confirm" onPress={onClose}>
            <CustomText>Confirm</CustomText>
          </ActionButton>
          <ActionButton onPress={onClose}>
            <CustomText>Cancel</CustomText>
          </ActionButton>
        </ButtonsRow>
      </View>
    </ReservationPanelStyled>
  );
};
