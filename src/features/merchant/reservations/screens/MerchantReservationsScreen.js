// src/features/merchant/reservations/screens/MerchantReservationsScreen.js
import React, { useState, useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { CustomText } from "../../../../components/CustomText/CustomText";
import {
  seatingData,
  tableStatuses,
  merchantReservations,
  timeSlots,
} from "../../../../data/mockData";

// Components
import TimeColumn from "../components/TimeColumn";
import ReservationDetailsPanel from "../components/ReservationDetailsPanel";
import { GridContent, HeaderContent } from "../components/GridComponents";

// Styles
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

// Utilities
import { calculateCurrentTimePosition } from "../utils/reservationUtils";
import {
  GRID_CONSTANTS,
  useExpansionState,
  filterReservations,
} from "../utils/reservationGridUtils";

export const MerchantReservationsScreen = () => {
  // State
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

  // Data
  const tables = seatingData.tables;
  const counterSeats = seatingData.counterSeats;
  const { tableReservations, counterSeatReservations } =
    filterReservations(merchantReservations);

  // Constants
  const { TIME_COLUMN_WIDTH, TIME_SLOT_HEIGHT } = GRID_CONSTANTS;

  // Expansion state management
  const {
    expandedTableIds,
    expandedCounterSeatIds,
    areAllExpanded,
    toggleExpandTable,
    toggleExpandCounterSeat,
    toggleAllTables,
  } = useExpansionState(tables, counterSeats);

  // Scroll refs
  const verticalScrollRef = useRef(null);
  const leftColumnScrollRef = useRef(null);
  const headerScrollRef = useRef(null);
  const gridScrollRef = useRef(null);

  // Handle selecting a reservation
  const handleReservationPress = (reservation) => {
    setSelectedReservation(
      selectedReservation?.id === reservation.id ? null : reservation
    );
  };

  // Synchronized scrolling handlers
  const handleHeaderScroll = (event) => {
    if (gridScrollRef.current) {
      gridScrollRef.current.scrollTo({
        x: event.nativeEvent.contentOffset.x,
        y: 0,
        animated: false,
      });
    }
  };

  const handleGridScroll = (event) => {
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollTo({
        x: event.nativeEvent.contentOffset.x,
        y: 0,
        animated: false,
      });
    }
  };

  const handleVerticalScroll = (event) => {
    if (leftColumnScrollRef.current) {
      leftColumnScrollRef.current.scrollTo({
        y: event.nativeEvent.contentOffset.y,
        animated: false,
      });
    }
  };

  const handleLeftColumnScroll = (event) => {
    if (verticalScrollRef.current) {
      verticalScrollRef.current.scrollTo({
        y: event.nativeEvent.contentOffset.y,
        animated: false,
      });
    }
  };

  // Update time position
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
              <CustomText variant="caption">Time</CustomText>
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

          <ScrollView
            ref={gridScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleGridScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingLeft: TIME_COLUMN_WIDTH }}
          >
            <ScrollView
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
            </ScrollView>
          </ScrollView>
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
