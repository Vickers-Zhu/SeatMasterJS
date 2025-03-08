// src/features/merchant/reservations/screens/MerchantReservationsScreen.js
import React, { useState, useEffect } from "react";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import {
  seatingData,
  tableStatuses,
  merchantReservations,
  timeSlots,
} from "../../../../data/mockData";

import TimeColumn from "../components/TimeColumn";
import ReservationDetailsPanel from "../components/ReservationDetailsPanel";
import { GridContent, HeaderContent } from "../components/GridComponents";

import {
  Container,
  MainGrid,
  HeaderContainer,
  HeaderScrollView,
  HeaderRow,
  FixedLeftColumn,
  TimeColumnHeader,
  ContentContainer,
  ExpandAllButton,
  ExpandAllButtonText,
  GridContainer,
} from "../components/MerchantReservation.styles";

import { calculateCurrentTimePosition } from "../utils/reservationUtils";
import {
  GRID_CONSTANTS,
  useExpansionState,
  filterReservations,
  useSynchronizedScrolling,
} from "../utils/reservationGridUtils";

export const MerchantReservationsScreen = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

  const tables = seatingData.tables;
  const counterSeats = seatingData.counterSeats;
  const { tableReservations, counterSeatReservations } =
    filterReservations(merchantReservations);

  const { TIME_COLUMN_WIDTH, TIME_SLOT_HEIGHT } = GRID_CONSTANTS;

  const {
    expandedTableIds,
    expandedCounterSeatIds,
    areAllExpanded,
    toggleExpandTable,
    toggleExpandCounterSeat,
    toggleAllTables,
  } = useExpansionState(tables, counterSeats);

  const {
    refs: {
      verticalScrollRef,
      leftColumnScrollRef,
      headerScrollRef,
      gridScrollRef,
    },
    handlers: {
      handleHeaderScroll,
      handleGridScroll,
      handleVerticalScroll,
      handleLeftColumnScroll,
    },
  } = useSynchronizedScrolling();

  const handleReservationPress = (reservation) => {
    setSelectedReservation(
      selectedReservation?.id === reservation.id ? null : reservation
    );
  };

  useEffect(() => {
    const updateTimePosition = () => {
      setCurrentTimePosition(calculateCurrentTimePosition(TIME_SLOT_HEIGHT));
    };

    updateTimePosition();
    const interval = setInterval(updateTimePosition, 60000);
    return () => clearInterval(interval);
  }, [TIME_SLOT_HEIGHT]);

  return (
    <Container>
      <MainGrid>
        <HeaderContainer>
          <FixedLeftColumn style={{ height: "auto", width: TIME_COLUMN_WIDTH }}>
            <TimeColumnHeader>
              <ExpandAllButton
                onPress={toggleAllTables}
                areAllExpanded={areAllExpanded}
              >
                <ExpandAllButtonText>
                  {areAllExpanded ? "Collapse All" : "Expand All"}
                </ExpandAllButtonText>
              </ExpandAllButton>
            </TimeColumnHeader>
          </FixedLeftColumn>

          <HeaderScrollView
            ref={headerScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleHeaderScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingLeft: TIME_COLUMN_WIDTH }}
          >
            <HeaderRow>
              <HeaderContent
                tables={tables}
                counterSeats={counterSeats}
                tableStatuses={tableStatuses}
                expandedTableIds={expandedTableIds}
                expandedCounterSeatIds={expandedCounterSeatIds}
                toggleExpandTable={toggleExpandTable}
                toggleExpandCounterSeat={toggleExpandCounterSeat}
              />
            </HeaderRow>
          </HeaderScrollView>
        </HeaderContainer>

        <ContentContainer>
          <TimeColumn
            timeSlots={timeSlots}
            scrollRef={leftColumnScrollRef}
            onScroll={handleLeftColumnScroll}
            areAllExpanded={areAllExpanded}
            toggleAllTables={toggleAllTables}
            currentTimePosition={currentTimePosition}
            width={TIME_COLUMN_WIDTH}
          />

          <HeaderScrollView
            ref={gridScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleGridScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingLeft: TIME_COLUMN_WIDTH }}
          >
            <HeaderScrollView
              ref={verticalScrollRef}
              onScroll={handleVerticalScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
              <GridContainer>
                <GridContent
                  timeSlots={timeSlots}
                  tables={tables}
                  counterSeats={counterSeats}
                  tableReservations={tableReservations}
                  counterSeatReservations={counterSeatReservations}
                  selectedReservation={selectedReservation}
                  currentTimePosition={currentTimePosition}
                  onReservationPress={handleReservationPress}
                />
              </GridContainer>
            </HeaderScrollView>
          </HeaderScrollView>
        </ContentContainer>
      </MainGrid>

      <ReservationDetailsPanel
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(null)}
      />
    </Container>
  );
};

export default MerchantReservationsScreen;
