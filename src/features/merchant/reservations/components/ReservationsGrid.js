const PendingBorder = styled(Animated.View)`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-width: 3px;
  border-color: #ff6b6b;
  border-radius: 7px;
  z-index: 2;
  pointer-events: none;
`; // src/features/merchant/reservations/components/ReservationsGrid.js
import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, Animated, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { CustomText } from "../../../../components/CustomText/CustomText";

import {
  TableHeader,
  CounterSeatHeader,
  ReservationBlock,
  ReservationDetailsPanel,
} from "./ReservationComponents";

const GRID_CONSTANTS = {
  TABLE_WIDTH: 100,
  COUNTER_SEAT_WIDTH: 60,
  TIME_COLUMN_WIDTH: 60,
  TIME_SLOT_HEIGHT: 30,
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

// Simple tab bar
const TabBar = styled.View`
  flex-direction: row;
  padding: 8px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 10px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-width: ${(props) => (props.active ? "2px" : "1px")};
  border-color: ${(props) =>
    props.active
      ? props.theme.colors.ui.primary
      : props.theme.colors.ui.tertiary};
  border-radius: 6px;
  margin-horizontal: 4px;
  elevation: ${(props) => (props.active ? 2 : 0)};
  shadow-opacity: ${(props) => (props.active ? 0.2 : 0)};
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const TabText = styled(CustomText)`
  margin-left: 8px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) =>
    props.active
      ? props.theme.colors.ui.primary
      : props.theme.colors.text.secondary};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
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
  background-color: ${(props) => props.theme.colors.ui.disabled};
  padding: 4px 8px;
  border-radius: 12px;
  margin-vertical: 8px;
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
  color: ${(props) => props.theme.colors.text.primary};
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

// Parse time strings into minutes since midnight
const parseTimeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

// Get ID from item consistently
const getItemId = (item) => {
  return typeof item === "object" ? item.id : item;
};

// Sort all seating items (tables and counter seats) using smart sorting
const smartSortSeatingItems = (tables, counterSeats, reservations) => {
  if (!tables || !counterSeats || !reservations) {
    return [];
  }

  // Create a unified array with type information
  const allItems = [
    ...tables.map((table) => ({
      item: table,
      type: "table",
      id: getItemId(table),
    })),
    ...counterSeats.map((seat) => ({
      item: seat,
      type: "counterSeat",
      id: getItemId(seat),
    })),
  ];

  const now = new Date();
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  // Create a reservation map for quick lookups
  const reservationMap = new Map();

  // Process all reservations and organize by table/seat ID
  reservations.forEach((res) => {
    const itemKey = res.isCounterSeat
      ? `counter-${res.counterSeatId}`
      : `table-${res.tableId}`;

    if (!reservationMap.has(itemKey)) {
      reservationMap.set(itemKey, []);
    }

    const startTime = parseTimeToMinutes(res.time);
    const endTime = startTime + res.duration;

    reservationMap.get(itemKey).push({
      reservation: res,
      startTime,
      endTime,
      timeUntilStart: startTime - currentTimeInMinutes,
      timeUntilEnd: endTime - currentTimeInMinutes,
    });
  });

  // Process each seating item
  allItems.forEach((seatingItem) => {
    const itemKey = `${seatingItem.type === "table" ? "table" : "counter"}-${
      seatingItem.id
    }`;
    const itemReservations = reservationMap.get(itemKey) || [];

    if (itemReservations.length === 0) {
      // No reservations for this item
      seatingItem.status = "empty";
      seatingItem.priority = Number.MAX_SAFE_INTEGER;
      return;
    }

    // Find upcoming, current, and past reservations
    const upcomingReservations = itemReservations.filter(
      (r) => r.timeUntilStart > 0
    );
    const currentReservations = itemReservations.filter(
      (r) => r.timeUntilStart <= 0 && r.timeUntilEnd > 0
    );
    const pastReservations = itemReservations.filter(
      (r) => r.timeUntilEnd <= 0
    );

    // Determine status and priority
    if (upcomingReservations.length > 0) {
      // Sort by closest upcoming start time
      upcomingReservations.sort((a, b) => a.timeUntilStart - b.timeUntilStart);
      seatingItem.status = "upcoming";
      seatingItem.priority = upcomingReservations[0].timeUntilStart;
      seatingItem.reservation = upcomingReservations[0].reservation;
    } else if (currentReservations.length > 0) {
      // Sort by start time (earliest first)
      currentReservations.sort((a, b) => a.startTime - b.startTime);
      seatingItem.status = "current";
      seatingItem.priority = 1000000 + currentReservations[0].startTime;
      seatingItem.reservation = currentReservations[0].reservation;
    } else if (pastReservations.length > 0) {
      // Sort by most recent end time
      pastReservations.sort((a, b) => b.endTime - a.endTime);
      seatingItem.status = "past";
      seatingItem.priority = 2000000 + (1440 - pastReservations[0].endTime);
      seatingItem.reservation = pastReservations[0].reservation;
    }
  });

  // Sort the items
  allItems.sort((a, b) => {
    // First sort by reservation status
    const statusOrder = { upcoming: 0, current: 1, past: 2, empty: 3 };
    const aStatus = a.status || "empty";
    const bStatus = b.status || "empty";

    if (statusOrder[aStatus] !== statusOrder[bStatus]) {
      return statusOrder[aStatus] - statusOrder[bStatus];
    }

    // Then sort by priority within the same status
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }

    // As a last resort, sort by ID
    return a.id.toString().localeCompare(b.id.toString());
  });

  return allItems;
};

// Traditional sorting: Tables first, then counter seats, both sorted by ID
const traditionalSortSeatingItems = (tables, counterSeats) => {
  if (!tables || !counterSeats) {
    return [];
  }

  // Create a unified array with type information, sort by ID numerically
  const tableItems = tables
    .map((table) => ({
      item: table,
      type: "table",
      id: getItemId(table),
    }))
    .sort((a, b) => {
      // Extract numeric part for sorting
      const aNum = parseInt(a.id.toString().replace(/\D/g, "")) || 0;
      const bNum = parseInt(b.id.toString().replace(/\D/g, "")) || 0;
      return aNum - bNum;
    });

  const counterItems = counterSeats
    .map((seat) => ({
      item: seat,
      type: "counterSeat",
      id: getItemId(seat),
    }))
    .sort((a, b) => {
      // Extract numeric part for sorting
      const aNum = parseInt(a.id.toString().replace(/\D/g, "")) || 0;
      const bNum = parseInt(b.id.toString().replace(/\D/g, "")) || 0;
      return aNum - bNum;
    });

  // Tables first, then counter seats
  return [...tableItems, ...counterItems];
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
  const [sortedItems, setSortedItems] = useState([]);
  const [isSmartSorting, setIsSmartSorting] = useState(true);

  // Pre-compute sorted items for both sorting methods to eliminate waiting when switching
  const [traditionalSorted, setTraditionalSorted] = useState([]);
  const [smartSorted, setSmartSorted] = useState([]);

  // Animation for breathing effect on pending reservations
  const [breathingAnim] = useState(new Animated.Value(0.4));

  // Set up breathing animation
  useEffect(() => {
    // Create the breathing animation sequence
    const breathe = () => {
      Animated.sequence([
        Animated.timing(breathingAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false, // Changed to false for border animation
        }),
        Animated.timing(breathingAnim, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: false, // Changed to false for border animation
        }),
      ]).start(() => breathe()); // Restart animation when complete
    };

    // Start the animation
    breathe();

    // Clean up
    return () => breathingAnim.stopAnimation();
  }, []);

  // Pre-compute all sorting options when data changes
  useEffect(() => {
    const traditional = traditionalSortSeatingItems(tables, counterSeats);
    const smart = smartSortSeatingItems(tables, counterSeats, reservations);

    setTraditionalSorted(traditional);
    setSmartSorted(smart);

    // Set the current sorted items based on selected mode
    setSortedItems(isSmartSorting ? smart : traditional);
  }, [tables, counterSeats, reservations]);

  // Update sorted items immediately when sorting method changes
  useEffect(() => {
    setSortedItems(isSmartSorting ? smartSorted : traditionalSorted);
  }, [isSmartSorting, smartSorted, traditionalSorted]);

  useEffect(() => {
    const updateTimePosition = () => {
      setCurrentTimePosition(calculateCurrentTimePosition(TIME_SLOT_HEIGHT));
    };

    updateTimePosition();
    const interval = setInterval(updateTimePosition, 60000);
    return () => clearInterval(interval);
  }, [TIME_SLOT_HEIGHT]);

  // Toggle expansion functions
  const toggleExpand = (id, isTable) => {
    if (isTable) {
      setExpandedTableIds((prevExpanded) => {
        const newExpanded = new Set(prevExpanded);
        if (newExpanded.has(id)) {
          newExpanded.delete(id);
        } else {
          newExpanded.add(id);
        }
        return newExpanded;
      });
    } else {
      setExpandedCounterSeatIds((prevExpanded) => {
        const newExpanded = new Set(prevExpanded);
        if (newExpanded.has(id)) {
          newExpanded.delete(id);
        } else {
          newExpanded.add(id);
        }
        return newExpanded;
      });
    }
  };

  const toggleAllTables = () => {
    if (areAllExpanded) {
      setExpandedTableIds(new Set());
      setExpandedCounterSeatIds(new Set());
    } else {
      setExpandedTableIds(new Set(tables.map((table) => getItemId(table))));
      setExpandedCounterSeatIds(
        new Set(counterSeats.map((seat) => getItemId(seat)))
      );
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

  // Refs for synchronized scrolling
  const verticalScrollRef = useRef(null);
  const leftColumnScrollRef = useRef(null);
  const headerScrollRef = useRef(null);
  const gridScrollRef = useRef(null);

  // Calculate content height
  const contentHeight = timeSlots.length * TIME_SLOT_HEIGHT;

  // Render header for an item (either table or counter seat)
  const renderItemHeader = (seatingItem) => {
    const { item, type, id } = seatingItem;

    if (type === "table") {
      const isExpanded = expandedTableIds.has(id);
      return (
        <TableHeader
          key={`table-${id}`}
          table={item}
          isExpanded={isExpanded}
          toggleExpand={() => toggleExpand(id, true)}
          width={TABLE_WIDTH}
        />
      );
    } else {
      // counter seat
      const isExpanded = expandedCounterSeatIds.has(id);
      return (
        <CounterSeatHeader
          key={`counter-${id}`}
          seat={item}
          isExpanded={isExpanded}
          toggleExpand={() => toggleExpand(id, false)}
          width={COUNTER_SEAT_WIDTH}
        />
      );
    }
  };

  // Get width for an item based on its type
  const getItemWidth = (type) => {
    return type === "table" ? TABLE_WIDTH : COUNTER_SEAT_WIDTH;
  };

  // Render reservation blocks
  const renderReservationBlocks = () => {
    // Create a map of the sorted item positions
    const itemPositionMap = {};
    let currentPosition = 0;

    sortedItems.forEach((item) => {
      const key = `${item.type === "table" ? "table" : "counter"}-${item.id}`;
      itemPositionMap[key] = currentPosition;
      currentPosition += getItemWidth(item.type);
    });

    return (
      <>
        {reservations.map((reservation) => {
          const isCounterSeat = !!reservation.isCounterSeat;
          const itemKey = isCounterSeat
            ? `counter-${reservation.counterSeatId}`
            : `table-${reservation.tableId}`;

          // Skip if we don't have this item in our sorted grid
          if (!(itemKey in itemPositionMap)) {
            return null;
          }

          // Calculate position based on the sortedItems layout
          const position = itemPositionMap[itemKey];
          const width = isCounterSeat ? COUNTER_SEAT_WIDTH : TABLE_WIDTH;

          return (
            <ReservationBlockStyled
              key={`res-${reservation.id}`}
              left={position}
              top={
                ((parseTimeToMinutes(reservation.time) - 9 * 60) / 30) *
                TIME_SLOT_HEIGHT
              }
              width={width}
              height={(reservation.duration / 30) * TIME_SLOT_HEIGHT}
              status={reservation.status}
              onPress={() => handleReservationPress(reservation)}
              isSelected={selectedReservation?.id === reservation.id}
              isPending={reservation.status === "pending"}
            >
              {reservation.status === "pending" && (
                <PendingBorder style={{ opacity: breathingAnim }} />
              )}
              <ReservationName>{reservation.customerName}</ReservationName>
              <ReservationDetails>
                {reservation.time} • {reservation.people}{" "}
                {reservation.people > 1 ? "people" : "person"}
              </ReservationDetails>
            </ReservationBlockStyled>
          );
        })}
      </>
    );
  };

  // Define the reservation block styled component directly here
  // This ensures we have access to the component for use in the render method
  const ReservationBlockStyled = styled.TouchableOpacity`
    position: absolute;
    left: ${(props) => props.left}px;
    top: ${(props) => props.top}px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: ${(props) =>
      props.status === "confirmed"
        ? "#b3ffb3"
        : props.status === "pending"
        ? "#ffd11a"
        : "#ff4d4d"};
    border-radius: 5px;
    padding: ${(props) => props.theme.space[1]};
    justify-content: space-between;
    z-index: 1;
    box-sizing: border-box;
    ${(props) =>
      props.isSelected &&
      !props.isPending &&
      `
      border-width: 2px;
      border-color: blue;
    `}
  `;

  const ReservationName = styled(CustomText)`
    font-size: ${(props) => props.theme.fontSizes.caption};
    font-weight: ${(props) => props.theme.fontWeights.bold};
  `;

  const ReservationDetails = styled(CustomText)`
    font-size: ${(props) => props.theme.fontSizes.caption};
  `;

  return (
    <Container>
      {/* Simple Tab Bar */}
      <TabBar>
        <Tab
          active={!isSmartSorting}
          onPress={() => setIsSmartSorting(false)}
          activeOpacity={0.6}
        >
          <MaterialIcons
            name="format-list-numbered"
            size={20}
            color={!isSmartSorting ? "#262626" : "#757575"}
          />
          <TabText active={!isSmartSorting}>Traditional</TabText>
        </Tab>
        <Tab
          active={isSmartSorting}
          onPress={() => setIsSmartSorting(true)}
          activeOpacity={0.6}
        >
          <MaterialIcons
            name="auto-awesome"
            size={20}
            color={isSmartSorting ? "#262626" : "#757575"}
          />
          <TabText active={isSmartSorting}>Smart</TabText>
        </Tab>
      </TabBar>

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
              {/* Render all items headers in sorted order */}
              {sortedItems.map(renderItemHeader)}
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
                  {/* All item columns */}
                  {sortedItems.map((seatingItem, index) => (
                    <View
                      key={`item-col-${seatingItem.id}`}
                      style={{ width: getItemWidth(seatingItem.type) }}
                    >
                      {timeSlots.map((time, timeIndex) => (
                        <View
                          key={`item-cell-${index}-${timeIndex}`}
                          style={{
                            width: getItemWidth(seatingItem.type),
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

                {}
                <CurrentTimeLine style={{ top: currentTimePosition }}>
                  <CurrentTimeIndicator />
                </CurrentTimeLine>

                {}
                {renderReservationBlocks()}
              </GridContainer>
            </ScrollView>
          </HeaderScrollView>
        </ContentContainer>
      </MainGrid>

      {}
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
