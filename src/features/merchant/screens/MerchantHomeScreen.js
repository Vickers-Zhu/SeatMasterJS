// File: src/features/merchant/screens/MerchantHomeScreen.js
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { TimeScroll } from "../components/TimeScroll";
import { TableMatrix } from "../components/TableMatrix";
import SwitchContainer from "../../../components/Switch/Switch";
import { tableStatuses as initialTableStatusesData } from "../../../data/mockData";

// Generates an array of times starting from the current time, stepping by 1 hour.
const generateTimes = (count) => {
  let times = [];
  let current = new Date();
  current.setSeconds(0);
  current.setMilliseconds(0);
  for (let i = 0; i < count; i++) {
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    times.push(timeString);
    current.setHours(current.getHours() + 1);
  }
  return times;
};

// Placeholder component for the seat-level view
const SeatMatrixPlaceholder = () => (
  <View style={{ padding: 16 }}>
    <Text>Seat-level view placeholder</Text>
  </View>
);

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: 16px;
  position: relative;
`;

const MatrixWrapper = styled.View`
  flex: 1;
  margin-top: 16px;
`;

const TimeScrollContainer = styled.View`
  position: absolute;
  right: 16px;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const MerchantHomeScreen = () => {
  const [times, setTimes] = useState(generateTimes(5));
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [isSeatMode, setIsSeatMode] = useState(false);

  // Use tableStatuses imported from mockData.js as the initial state.
  const [tableStatuses, setTableStatuses] = useState(initialTableStatusesData);

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
    const newStatus = status === "empty" ? "occupied" : "empty";
    console.log(
      `HomeScreen: Table ${key} changed from ${status} to ${newStatus}`
    );
    setTableStatuses((prev) => ({
      ...prev,
      [key]: { ...prev[key], status: newStatus },
    }));
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
          <SeatMatrixPlaceholder />
        ) : (
          <TableMatrix
            tableStatuses={tableStatuses}
            onTablePress={handleTablePress}
          />
        )}
      </MatrixWrapper>
      <TimeScrollContainer>
        <TimeScroll
          times={times}
          selectedTime={selectedTime}
          onTimeChange={handleTimeChange}
        />
      </TimeScrollContainer>
    </Container>
  );
};
