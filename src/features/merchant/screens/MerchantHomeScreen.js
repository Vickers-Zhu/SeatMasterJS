// File: src/features/merchant/screens/MerchantHomeScreen.js
import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import SwitchContainer from "../../../components/Switch/Switch";
import { TableMatrix } from "../components/TableMatrix";
import { TimeScroll } from "../components/TimeScroll";
import { SeatView } from "../components/SeatView";
import { tableStatuses, seatingData } from "../../../data/mockData";

// Container for the entire screen.
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: 16px;
  position: relative;
`;

// Wrapper for the main content area (tables or seats).
const MatrixWrapper = styled.View`
  flex: 1;
  margin-top: 16px;
`;

// Animated container for the time scroll overlay.
const AnimatedTimeScrollContainer =
  Animated.createAnimatedComponent(styled.View`
    position: absolute;
    right: 16px;
    top: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
  `);

export const MerchantHomeScreen = () => {
  const [times, setTimes] = useState(generateTimes(5));
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [isSeatMode, setIsSeatMode] = useState(false);
  const [tableStatusesState, setTableStatusesState] = useState(tableStatuses);
  // overlayOpacity controls the transparency of the time scroll overlay.
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  // Function to generate times.
  function generateTimes(count) {
    let timesArray = [];
    let current = new Date();
    current.setSeconds(0);
    current.setMilliseconds(0);
    for (let i = 0; i < count; i++) {
      const hours = current.getHours();
      const minutes = current.getMinutes();
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      timesArray.push(timeString);
      current.setHours(current.getHours() + 1);
    }
    return timesArray;
  }

  // Update times periodically.
  useEffect(() => {
    const updateTimes = () => {
      const newTimes = generateTimes(5);
      setTimes(newTimes);
      setSelectedTime(newTimes[0]);
    };
    updateTimes();
    const interval = setInterval(updateTimes, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    console.log("Time changed to:", time);
  };

  const handleTablePress = (key, status) => {
    // Example logic to update table statuses.
    const newStatus = status === "empty" ? "occupied" : "empty";
    console.log(`Table ${key} changed from ${status} to ${newStatus}`);
    setTableStatusesState((prev) => ({
      ...prev,
      [key]: { ...prev[key], status: newStatus },
    }));
  };

  // Animate overlay to fully transparent (opacity 0) when scrolling begins.
  const onScrollBegin = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Animate overlay to fully opaque (opacity 1) when scrolling ends.
  const onScrollEnd = () => {
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Container>
      <SwitchContainer
        isOn={isSeatMode}
        setIsOn={setIsSeatMode}
        leftLabel="Tables"
        rightLabel="Seats"
        variant="default"
      />
      <MatrixWrapper>
        {isSeatMode ? (
          <Animated.ScrollView
            onScrollBeginDrag={onScrollBegin}
            onScrollEndDrag={onScrollEnd}
            scrollEventThrottle={16}
          >
            <SeatView
              seatingData={seatingData}
              tableStatuses={tableStatusesState}
            />
          </Animated.ScrollView>
        ) : (
          <TableMatrix
            tableStatuses={tableStatusesState}
            onTablePress={handleTablePress}
          />
        )}
      </MatrixWrapper>
      <AnimatedTimeScrollContainer style={{ opacity: overlayOpacity }}>
        <TimeScroll
          times={times}
          selectedTime={selectedTime}
          onTimeChange={handleTimeChange}
        />
      </AnimatedTimeScrollContainer>
    </Container>
  );
};
