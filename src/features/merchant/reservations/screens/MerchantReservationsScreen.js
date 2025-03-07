// src/features/merchant/reservations/screens/MerchantReservationsScreen.js
import React, { useState, useRef, useEffect } from "react";
import { ScrollView, View } from "react-native";
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
import TableHeader from "../components/TableHeader";
import ReservationGrid from "../components/ReservationGrid";
import ReservationDetailsPanel from "../components/ReservationDetailsPanel";

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
} from "../components/MerchantReservation.styles";

// Utils
import { calculateCurrentTimePosition } from "../utils/reservationUtils";

export const MerchantReservationsScreen = () => {
  // State
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [expandedTableIds, setExpandedTableIds] = useState(new Set());
  const [areAllExpanded, setAreAllExpanded] = useState(false);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

  // Refs for scrolling
  const [verticalScrollRef, setVerticalScrollRef] = useState(null);
  const leftColumnScrollRef = useRef(null);
  const headerScrollRef = useRef(null);
  const gridScrollRef = useRef(null);

  // Constants
  const tableWidth = 100;
  const timeColumnWidth = 60;
  const timeSlotHeight = 30;

  // Get all tables from seatingData
  const tables = seatingData.tables;

  // Toggle a single table's expanded state
  const toggleExpandTable = (tableId) => {
    setExpandedTableIds((prevExpandedIds) => {
      const newExpandedIds = new Set(prevExpandedIds);
      if (newExpandedIds.has(tableId)) {
        newExpandedIds.delete(tableId);
      } else {
        newExpandedIds.add(tableId);
      }
      return newExpandedIds;
    });
  };

  // Toggle all tables' expanded state
  const toggleAllTables = () => {
    if (areAllExpanded) {
      // Collapse all tables
      setExpandedTableIds(new Set());
    } else {
      // Expand all tables
      const allTableIds = new Set(tables.map((table) => table.id));
      setExpandedTableIds(allTableIds);
    }
    setAreAllExpanded(!areAllExpanded);
  };

  // Handle reservation selection
  const handleReservationPress = (reservation) => {
    setSelectedReservation(
      selectedReservation?.id === reservation.id ? null : reservation
    );
  };

  // Synchronize horizontal scrolling between header and grid
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

  // Synchronize vertical scrolling between time column and grid
  const handleVerticalScroll = (event) => {
    if (leftColumnScrollRef.current) {
      leftColumnScrollRef.current.scrollTo({
        y: event.nativeEvent.contentOffset.y,
        animated: false,
      });
    }
  };

  const handleLeftColumnScroll = (event) => {
    if (verticalScrollRef) {
      verticalScrollRef.scrollTo({
        y: event.nativeEvent.contentOffset.y,
        animated: false,
      });
    }
  };

  // Update current time position
  useEffect(() => {
    const updateTimePosition = () => {
      setCurrentTimePosition(calculateCurrentTimePosition(timeSlotHeight));
    };

    // Calculate initially
    updateTimePosition();

    // Update every minute
    const interval = setInterval(updateTimePosition, 60000);

    return () => clearInterval(interval);
  }, [timeSlotHeight]);

  // Update areAllExpanded state based on expandedTableIds
  useEffect(() => {
    const allTableIds = tables.map((table) => table.id);
    const allExpanded = allTableIds.every((id) => expandedTableIds.has(id));

    if (allExpanded !== areAllExpanded) {
      setAreAllExpanded(allExpanded);
    }
  }, [expandedTableIds, tables, areAllExpanded]);

  return (
    <Container>
      <MainGrid>
        {/* Table Headers */}
        <HeaderContainer>
          {/* Fixed left column header with Expand/Collapse button */}
          <FixedLeftColumn style={{ height: "auto" }}>
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

          {/* Scrollable header area with table headers */}
          <HeaderScrollView
            ref={headerScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleHeaderScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingLeft: timeColumnWidth }}
          >
            <HeaderRow>
              {tables.map((table) => (
                <TableHeader
                  key={table.id}
                  table={table}
                  tableStatus={tableStatuses[`2-${table.id % 4}`]?.status}
                  expandedTableIds={expandedTableIds}
                  toggleExpandTable={toggleExpandTable}
                />
              ))}
            </HeaderRow>
          </HeaderScrollView>
        </HeaderContainer>

        {/* Time and Reservation Grid */}
        <ContentContainer>
          {/* Fixed time column */}
          <TimeColumn
            timeSlots={timeSlots}
            scrollRef={leftColumnScrollRef}
            onScroll={handleLeftColumnScroll}
            areAllExpanded={areAllExpanded}
            toggleAllTables={toggleAllTables}
            currentTimePosition={currentTimePosition}
          />

          {/* Reservation grid */}
          <ReservationGrid
            timeSlots={timeSlots}
            tables={tables}
            reservations={merchantReservations}
            selectedReservation={selectedReservation}
            tableWidth={tableWidth}
            timeSlotHeight={timeSlotHeight}
            onReservationPress={handleReservationPress}
            horizontalScrollRef={gridScrollRef}
            verticalScrollRef={setVerticalScrollRef}
            onHorizontalScroll={handleGridScroll}
            onVerticalScroll={handleVerticalScroll}
            timeColumnWidth={timeColumnWidth}
          />
        </ContentContainer>
      </MainGrid>

      {/* Reservation Details Panel */}
      <ReservationDetailsPanel
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(null)}
      />
    </Container>
  );
};

export default MerchantReservationsScreen;
