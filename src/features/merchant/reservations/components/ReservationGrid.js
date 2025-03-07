// src/features/merchant/reservations/components/ReservationGrid.js
import React from "react";
import { ScrollView, View } from "react-native";
import { GridContainer, GridRow, GridCell } from "./MerchantReservation.styles";
import ReservationBlock from "./ReservationBlock";
import CurrentTimeIndicator from "./CurrentTimeIndicator";

const ReservationGrid = ({
  timeSlots,
  tables,
  reservations,
  selectedReservation,
  tableWidth,
  timeSlotHeight,
  onReservationPress,
  horizontalScrollRef,
  verticalScrollRef,
  onHorizontalScroll,
  onVerticalScroll,
  timeColumnWidth,
}) => {
  return (
    <ScrollView
      ref={horizontalScrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onHorizontalScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingLeft: timeColumnWidth }}
    >
      <ScrollView
        ref={verticalScrollRef}
        onScroll={onVerticalScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <GridContainer>
          {/* Create the grid cells */}
          {timeSlots.map((time, timeIndex) => (
            <GridRow key={`row-${timeIndex}`}>
              {tables.map((table, tableIndex) => (
                <GridCell key={`cell-${timeIndex}-${tableIndex}`} />
              ))}
            </GridRow>
          ))}

          {/* Current time indicator */}
          <CurrentTimeIndicator timeSlotHeight={timeSlotHeight} />

          {/* Reservation blocks */}
          {reservations.map((reservation) => (
            <ReservationBlock
              key={reservation.id}
              reservation={reservation}
              tables={tables}
              tableWidth={tableWidth}
              timeSlotHeight={timeSlotHeight}
              isSelected={selectedReservation?.id === reservation.id}
              onPress={onReservationPress}
            />
          ))}
        </GridContainer>
      </ScrollView>
    </ScrollView>
  );
};

export default ReservationGrid;
