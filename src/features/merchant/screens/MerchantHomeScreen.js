// File: src/features/merchant/screens/MerchantHomeScreen.js
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { TimeScroll } from "../components/TimeScroll";
import { SeatMatrix } from "../components/SeatMatrix";

// Generates an array of times starting from the current time, stepping by 1 hour.
const generateTimes = (count) => {
  let times = [];
  let current = new Date();
  // Reset seconds and milliseconds for cleaner display
  current.setSeconds(0);
  current.setMilliseconds(0);
  for (let i = 0; i < count; i++) {
    // Format time as HH:MM (24-hour format)
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

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MerchantHomeScreen = () => {
  const [times, setTimes] = useState(generateTimes(5));
  const [selectedTime, setSelectedTime] = useState(times[0]);

  // Update times every minute so the first element syncs with the current clock
  useEffect(() => {
    const updateTimes = () => {
      const newTimes = generateTimes(5);
      setTimes(newTimes);
      setSelectedTime(newTimes[0]); // Always keep the current time as first element
    };

    // Update immediately and then every minute (6000 ms)
    updateTimes();
    const interval = setInterval(updateTimes, 6000);
    return () => clearInterval(interval);
  }, []);

  const seatMatrix = [
    [0, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 1, 1, 0],
  ];

  const [seatStatuses, setSeatStatuses] = useState({
    "0-1": "empty",
    "0-2": "empty",
    "1-0": "empty",
    "1-1": "occupied",
    "1-2": "empty",
    "1-3": "empty",
    "2-0": "reserved",
    "2-1": "empty",
    "2-2": "empty",
    "2-3": "occupied",
    "3-1": "empty",
    "3-2": "empty",
  });

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    console.log("Time changed to:", time);
  };

  const handleSeatPress = (seatId, status) => {
    const newStatus = status === "empty" ? "occupied" : "empty";
    setSeatStatuses((prev) => ({ ...prev, [seatId]: newStatus }));
  };

  return (
    <Container>
      <Content style={{ flex: 3 }}>
        <SeatMatrix
          matrix={seatMatrix}
          seatStatuses={seatStatuses}
          onSeatPress={handleSeatPress}
        />
      </Content>
      <Content style={{ flex: 1, alignItems: "flex-end", paddingRight: 8 }}>
        <TimeScroll
          times={times}
          selectedTime={selectedTime}
          onTimeChange={handleTimeChange}
        />
      </Content>
    </Container>
  );
};
