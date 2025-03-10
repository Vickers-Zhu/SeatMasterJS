// src/features/merchant/reservations/components/ReservationsGrid.js
import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, Animated } from "react-native";
import styled from "styled-components/native";
import { CustomText } from "../../../../components/CustomText/CustomText";

import {
  TableHeader,
  CounterSeatHeader,
  ReservationBlock,
  ReservationDetailsPanel,
} from "./ReservationComponents";

// Constants
const GRID_CONSTANTS = {
  TABLE_WIDTH: 100,
  COUNTER_SEAT_WIDTH: 60,
  TIME_COLUMN_WIDTH: 60,
  TIME_SLOT_HEIGHT: 30,
};

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const MainGrid = styled.View`
  flex: 1;
  flex-direction: column;
`;

const HeaderContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
  position: relative;
  z-index: 2;
`;

const LeftColumnContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ width }) => width}px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  z-index: 10;
  border-right-width: 1px;
  border-right-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const TimeColumn = styled.View`
  width: ${({ width }) => width}px;
`;

const TimeSlot = styled.View`
  height: ${({ height }) => height}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
  justify-content: center;
  align-items: center;
`;

const TimeText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const ExpandAllButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.areAllExpanded
      ? props.theme.colors.ui.secondary
      : props.theme.colors.ui.primary};
  padding: 4px 8px;
  border-radius: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
  width: 80%;
  align-self: center;
`;

const ExpandAllButtonText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.inverse};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  position: relative;
`;

const GridContainer = styled.View`
  flex: 1;
  position: relative;
`;

const TimeColumnHeader = styled.View`
  width: ${({ width }) => width}px;
  padding: ${(props) => props.theme.space[2]};
  padding-top: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const HeaderScrollView = styled.ScrollView`
  flex-direction: row;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  padding-vertical: ${(props) => props.theme.space[2]};
`;

const CurrentTimeLine = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff3b30;
  z-index: 5;
`;

const CurrentTimeIndicator = styled.View`
  position: absolute;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ff3b30;
  top: -4px;
`;

// Utility functions
const calculateCurrentTimePosition = (timeSlotHeight) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours < 9 || (hours === 22 && minutes > 30) || hours > 22) {
    return -100;
  }

  const minutesSince9AM = (hours - 9) * 60 + minutes;
  return (minutesSince9AM / 30) * timeSlotHeight;
};

const filterReservations = (reservations) => {
  const tableReservations = reservations.filter((res) => !res.isCounterSeat);
  const counterSeatReservations = reservations.filter(
    (res) => res.isCounterSeat
  );
  return { tableReservations, counterSeatReservations };
};

// Main component
const ReservationsGrid = ({
  timeSlots,
  tables,
  counterSeats,
  reservations,
}) => {
  const {
    TABLE_WIDTH,
    COUNTER_SEAT_WIDTH,
    TIME_COLUMN_WIDTH,
    TIME_SLOT_HEIGHT,
  } = GRID_CONSTANTS;

  // State variables
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);
  const [expandedTableIds, setExpandedTableIds] = useState(new Set());
  const [expandedCounterSeatIds, setExpandedCounterSeatIds] = useState(
    new Set()
  );
  const [areAllExpanded, setAreAllExpanded] = useState(false);

  // Refs for synchronized scrolling
  const verticalScrollRef = useRef(null);
  const leftColumnScrollRef = useRef(null);
  const headerScrollRef = useRef(null);
  const gridScrollRef = useRef(null);

  // Filter reservations
  const { tableReservations, counterSeatReservations } =
    filterReservations(reservations);

  // Calculate content height
  const contentHeight = timeSlots.length * TIME_SLOT_HEIGHT;

  useEffect(() => {
    const updateTimePosition = () => {
      setCurrentTimePosition(calculateCurrentTimePosition(TIME_SLOT_HEIGHT));
    };

    updateTimePosition();
    const interval = setInterval(updateTimePosition, 60000);
    return () => clearInterval(interval);
  }, [TIME_SLOT_HEIGHT]);

  // Toggle expansion functions
  const toggleExpandTable = (tableId) => {
    setExpandedTableIds((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(tableId)) {
        newExpanded.delete(tableId);
      } else {
        newExpanded.add(tableId);
      }
      return newExpanded;
    });
  };

  const toggleExpandCounterSeat = (seatId) => {
    setExpandedCounterSeatIds((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(seatId)) {
        newExpanded.delete(seatId);
      } else {
        newExpanded.add(seatId);
      }
      return newExpanded;
    });
  };

  const toggleAllTables = () => {
    if (areAllExpanded) {
      setExpandedTableIds(new Set());
      setExpandedCounterSeatIds(new Set());
    } else {
      setExpandedTableIds(new Set(tables.map((table) => table.id)));
      setExpandedCounterSeatIds(new Set(counterSeats.map((seat) => seat.id)));
    }
    setAreAllExpanded(!areAllExpanded);
  };

  // Scroll sync handlers
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

  // Handle reservation click
  const handleReservationPress = (reservation) => {
    setSelectedReservation(
      selectedReservation?.id === reservation.id ? null : reservation
    );
  };

  // Render table and counter seat headers
  const renderTableHeader = (table) => {
    const isExpanded = expandedTableIds.has(table.id);

    return (
      <TableHeader
        key={`table-${table.id}`}
        table={table}
        isExpanded={isExpanded}
        toggleExpand={() => toggleExpandTable(table.id)}
        width={TABLE_WIDTH}
      />
    );
  };

  const renderCounterSeatHeader = (seat) => {
    const isExpanded = expandedCounterSeatIds.has(seat.id);

    return (
      <CounterSeatHeader
        key={`counter-${seat.id}`}
        seat={seat}
        isExpanded={isExpanded}
        toggleExpand={() => toggleExpandCounterSeat(seat.id)}
        width={COUNTER_SEAT_WIDTH}
      />
    );
  };

  // Render reservation blocks
  const renderReservationBlocks = () => {
    return (
      <>
        {tableReservations.map((reservation) => (
          <ReservationBlock
            key={`table-res-${reservation.id}`}
            reservation={reservation}
            tables={tables}
            counterSeats={counterSeats}
            isSelected={selectedReservation?.id === reservation.id}
            onPress={handleReservationPress}
            tableWidth={TABLE_WIDTH}
            counterSeatWidth={COUNTER_SEAT_WIDTH}
            timeSlotHeight={TIME_SLOT_HEIGHT}
          />
        ))}
        {counterSeatReservations.map((reservation) => (
          <ReservationBlock
            key={`counter-res-${reservation.id}`}
            reservation={reservation}
            tables={tables}
            counterSeats={counterSeats}
            isSelected={selectedReservation?.id === reservation.id}
            onPress={handleReservationPress}
            tableWidth={TABLE_WIDTH}
            counterSeatWidth={COUNTER_SEAT_WIDTH}
            timeSlotHeight={TIME_SLOT_HEIGHT}
            isCounterSeat
          />
        ))}
      </>
    );
  };

  return (
    <Container>
      <MainGrid>
        <HeaderContainer>
          <LeftColumnContainer width={TIME_COLUMN_WIDTH}>
            <TimeColumnHeader width={TIME_COLUMN_WIDTH}>
              <ExpandAllButton
                onPress={toggleAllTables}
                areAllExpanded={areAllExpanded}
              >
                <ExpandAllButtonText>
                  {areAllExpanded ? "Collapse All" : "Expand All"}
                </ExpandAllButtonText>
              </ExpandAllButton>
            </TimeColumnHeader>
          </LeftColumnContainer>

          <HeaderScrollView
            ref={headerScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleHeaderScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingLeft: TIME_COLUMN_WIDTH }}
          >
            <HeaderRow>
              {/* Render counter seat headers */}
              {counterSeats.map(renderCounterSeatHeader)}

              {/* Render table headers */}
              {tables.map(renderTableHeader)}
            </HeaderRow>
          </HeaderScrollView>
        </HeaderContainer>

        <ContentContainer>
          <LeftColumnContainer width={TIME_COLUMN_WIDTH}>
            <ScrollView
              ref={leftColumnScrollRef}
              onScroll={handleLeftColumnScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={true}
            >
              <TimeColumn width={TIME_COLUMN_WIDTH}>
                {timeSlots.map((time) => (
                  <TimeSlot
                    key={time}
                    height={TIME_SLOT_HEIGHT}
                    width={TIME_COLUMN_WIDTH}
                  >
                    <TimeText>{time}</TimeText>
                  </TimeSlot>
                ))}
              </TimeColumn>
            </ScrollView>
          </LeftColumnContainer>

          <HeaderScrollView
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
              <GridContainer style={{ height: contentHeight }}>
                {/* Render grid cells */}
                <View style={{ flexDirection: "row" }}>
                  {/* Counter seat columns */}
                  {counterSeats.map((seat, seatIndex) => (
                    <View
                      key={`counter-col-${seat.id}`}
                      style={{ width: COUNTER_SEAT_WIDTH }}
                    >
                      {timeSlots.map((time, timeIndex) => (
                        <View
                          key={`counter-cell-${seatIndex}-${timeIndex}`}
                          style={{
                            width: COUNTER_SEAT_WIDTH,
                            height: TIME_SLOT_HEIGHT,
                            borderLeftWidth: 1,
                            borderBottomWidth: 1,
                            borderLeftColor: "#e1e1e1",
                            borderBottomColor: "#e1e1e1",
                          }}
                        />
                      ))}
                    </View>
                  ))}

                  {/* Table columns */}
                  {tables.map((table, tableIndex) => (
                    <View
                      key={`table-col-${table.id}`}
                      style={{ width: TABLE_WIDTH }}
                    >
                      {timeSlots.map((time, timeIndex) => (
                        <View
                          key={`table-cell-${tableIndex}-${timeIndex}`}
                          style={{
                            width: TABLE_WIDTH,
                            height: TIME_SLOT_HEIGHT,
                            borderLeftWidth: 1,
                            borderBottomWidth: 1,
                            borderLeftColor: "#e1e1e1",
                            borderBottomColor: "#e1e1e1",
                          }}
                        />
                      ))}
                    </View>
                  ))}
                </View>

                {/* Current time indicator */}
                <CurrentTimeLine style={{ top: currentTimePosition }}>
                  <CurrentTimeIndicator />
                </CurrentTimeLine>

                {/* Reservation blocks */}
                {renderReservationBlocks()}
              </GridContainer>
            </ScrollView>
          </HeaderScrollView>
        </ContentContainer>
      </MainGrid>

      {/* Reservation details panel */}
      {selectedReservation && (
        <ReservationDetailsPanel
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </Container>
  );
};

export default ReservationsGrid;
