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

import TimeColumn from "../components/TimeColumn";
import TableHeader from "../components/TableHeader";
import ReservationGrid from "../components/ReservationGrid";
import ReservationDetailsPanel from "../components/ReservationDetailsPanel";

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

import { calculateCurrentTimePosition } from "../utils/reservationUtils";

export const MerchantReservationsScreen = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [expandedTableIds, setExpandedTableIds] = useState(new Set());
  const [areAllExpanded, setAreAllExpanded] = useState(false);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

  const [verticalScrollRef, setVerticalScrollRef] = useState(null);
  const leftColumnScrollRef = useRef(null);
  const headerScrollRef = useRef(null);
  const gridScrollRef = useRef(null);

  const tableWidth = 100;
  const timeColumnWidth = 60;
  const timeSlotHeight = 30;

  const tables = seatingData.tables;

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

  const toggleAllTables = () => {
    if (areAllExpanded) {
      setExpandedTableIds(new Set());
    } else {
      const allTableIds = new Set(tables.map((table) => table.id));
      setExpandedTableIds(allTableIds);
    }
    setAreAllExpanded(!areAllExpanded);
  };

  const handleReservationPress = (reservation) => {
    setSelectedReservation(
      selectedReservation?.id === reservation.id ? null : reservation
    );
  };

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
    if (verticalScrollRef) {
      verticalScrollRef.scrollTo({
        y: event.nativeEvent.contentOffset.y,
        animated: false,
      });
    }
  };

  useEffect(() => {
    const updateTimePosition = () => {
      setCurrentTimePosition(calculateCurrentTimePosition(timeSlotHeight));
    };

    updateTimePosition();

    const interval = setInterval(updateTimePosition, 60000);

    return () => clearInterval(interval);
  }, [timeSlotHeight]);

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
        <HeaderContainer>
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

        <ContentContainer>
          <TimeColumn
            timeSlots={timeSlots}
            scrollRef={leftColumnScrollRef}
            onScroll={handleLeftColumnScroll}
            areAllExpanded={areAllExpanded}
            toggleAllTables={toggleAllTables}
            currentTimePosition={currentTimePosition}
          />

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

      <ReservationDetailsPanel
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(null)}
      />
    </Container>
  );
};

export default MerchantReservationsScreen;
