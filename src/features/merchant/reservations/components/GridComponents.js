// src/features/merchant/reservations/components/GridComponents.js
import React from "react";
import { View } from "react-native";
import { ColumnContainer, GridCell } from "./MerchantReservation.styles";
import ReservationBlock from "./ReservationBlock";
import TableHeader from "./TableHeader";
import CounterSeatHeader from "./CounterSeatHeader";
import { GRID_CONSTANTS } from "../utils/reservationGridUtils";

// Main grid content including columns, cells, and reservations
export const GridContent = ({
  timeSlots,
  tables,
  counterSeats,
  tableReservations,
  counterSeatReservations,
  selectedReservation,
  currentTimePosition,
  onReservationPress,
}) => {
  const { TABLE_WIDTH, COUNTER_SEAT_WIDTH, TIME_SLOT_HEIGHT } = GRID_CONSTANTS;

  return (
    <View style={{ position: "relative" }}>
      {/* Grid columns structure */}
      <View style={{ flexDirection: "row" }}>
        {/* Counter Seat Columns - Placed first */}
        {counterSeats.map((seat) => (
          <ColumnContainer
            key={`counter-column-${seat.id}`}
            style={{ width: COUNTER_SEAT_WIDTH }}
          >
            {timeSlots.map((time, timeIndex) => (
              <GridCell
                key={`cell-${timeIndex}-counter-${seat.id}`}
                style={{ width: COUNTER_SEAT_WIDTH }}
              />
            ))}
          </ColumnContainer>
        ))}

        {/* Table Columns */}
        {tables.map((table) => (
          <ColumnContainer
            key={`table-column-${table.id}`}
            style={{ width: TABLE_WIDTH }}
          >
            {timeSlots.map((time, timeIndex) => (
              <GridCell
                key={`cell-${timeIndex}-table-${table.id}`}
                style={{ width: TABLE_WIDTH }}
              />
            ))}
          </ColumnContainer>
        ))}
      </View>

      {/* Current Time Indicator */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: currentTimePosition,
          height: 2,
          backgroundColor: "#ff3b30",
          zIndex: 5,
        }}
      />

      {/* Counter Seat Reservations - Placed first */}
      {counterSeatReservations.map((reservation) => (
        <ReservationBlock
          key={`counter-${reservation.id}`}
          reservation={reservation}
          tables={tables}
          counterSeats={counterSeats}
          isSelected={selectedReservation?.id === reservation.id}
          onPress={onReservationPress}
        />
      ))}

      {/* Table Reservations */}
      {tableReservations.map((reservation) => (
        <ReservationBlock
          key={reservation.id}
          reservation={reservation}
          tables={tables}
          counterSeats={counterSeats}
          isSelected={selectedReservation?.id === reservation.id}
          onPress={onReservationPress}
        />
      ))}
    </View>
  );
};

// Header row with both counter seats and tables
export const HeaderContent = ({
  tables,
  counterSeats,
  tableStatuses,
  expandedTableIds,
  expandedCounterSeatIds,
  toggleExpandTable,
  toggleExpandCounterSeat,
}) => {
  const { TABLE_WIDTH, COUNTER_SEAT_WIDTH } = GRID_CONSTANTS;

  return (
    <View style={{ flexDirection: "row" }}>
      {/* Counter Seats Headers - Placed first */}
      {counterSeats.map((seat) => (
        <CounterSeatHeader
          key={seat.id}
          seat={seat}
          isExpanded={expandedCounterSeatIds.has(seat.id)}
          toggleExpandSeat={toggleExpandCounterSeat}
          width={COUNTER_SEAT_WIDTH}
        />
      ))}

      {/* Tables Headers */}
      {tables.map((table) => (
        <TableHeader
          key={table.id}
          table={table}
          tableStatus={tableStatuses[`2-${table.id % 4}`]?.status}
          expandedTableIds={expandedTableIds}
          toggleExpandTable={toggleExpandTable}
          width={TABLE_WIDTH}
        />
      ))}
    </View>
  );
};
