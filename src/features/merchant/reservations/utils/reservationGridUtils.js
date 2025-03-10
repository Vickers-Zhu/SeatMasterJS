// src/features/merchant/reservations/utils/reservationGridUtils.js
import { useState, useEffect, useRef } from "react";

export const GRID_CONSTANTS = {
  TABLE_WIDTH: 100,
  COUNTER_SEAT_WIDTH: 60,
  TIME_COLUMN_WIDTH: 60,
  TIME_SLOT_HEIGHT: 30,
};

export const useExpansionState = (tables, counterSeats) => {
  const [expandedTableIds, setExpandedTableIds] = useState(new Set());
  const [expandedCounterSeatIds, setExpandedCounterSeatIds] = useState(
    new Set()
  );
  const [areAllExpanded, setAreAllExpanded] = useState(false);

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

  const toggleExpandCounterSeat = (seatId) => {
    setExpandedCounterSeatIds((prevExpandedIds) => {
      const newExpandedIds = new Set(prevExpandedIds);
      if (newExpandedIds.has(seatId)) {
        newExpandedIds.delete(seatId);
      } else {
        newExpandedIds.add(seatId);
      }
      return newExpandedIds;
    });
  };

  const toggleAllTables = () => {
    if (areAllExpanded) {
      setExpandedTableIds(new Set());
      setExpandedCounterSeatIds(new Set());
    } else {
      const allTableIds = new Set(tables.map((table) => table.id));
      const allCounterSeatIds = new Set(counterSeats.map((seat) => seat.id));
      setExpandedTableIds(allTableIds);
      setExpandedCounterSeatIds(allCounterSeatIds);
    }
    setAreAllExpanded(!areAllExpanded);
  };

  useEffect(() => {
    const allTableIds = tables.map((table) => table.id);
    const allCounterSeatIds = counterSeats.map((seat) => seat.id);

    const allTablesExpanded = allTableIds.every((id) =>
      expandedTableIds.has(id)
    );
    const allCounterSeatsExpanded = allCounterSeatIds.every((id) =>
      expandedCounterSeatIds.has(id)
    );

    const allExpanded = allTablesExpanded && allCounterSeatsExpanded;

    if (allExpanded !== areAllExpanded) {
      setAreAllExpanded(allExpanded);
    }
  }, [
    expandedTableIds,
    expandedCounterSeatIds,
    tables,
    counterSeats,
    areAllExpanded,
  ]);

  return {
    expandedTableIds,
    expandedCounterSeatIds,
    areAllExpanded,
    toggleExpandTable,
    toggleExpandCounterSeat,
    toggleAllTables,
  };
};

export const useSynchronizedScrolling = () => {
  const verticalScrollRef = useRef(null);
  const leftColumnScrollRef = useRef(null);
  const headerScrollRef = useRef(null);
  const gridScrollRef = useRef(null);

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

  return {
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
  };
};

export const filterReservations = (reservations) => {
  const tableReservations = reservations.filter((res) => !res.isCounterSeat);
  const counterSeatReservations = reservations.filter(
    (res) => res.isCounterSeat
  );
  return { tableReservations, counterSeatReservations };
};
