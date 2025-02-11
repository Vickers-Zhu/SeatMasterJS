// src/features/merchant/screens/MerchantHomeScreen.js
import React, { useState } from "react";
import styled from "styled-components/native";
import { TimeScroll } from "../components/TimeScroll";
// import { SeatMatrix } from "../components/SeatMatrix";

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
  // Sample times array (could be generated dynamically)
  const times = ["10:00", "10:15", "10:30", "10:45", "11:00"];
  const [selectedTime, setSelectedTime] = useState(times[0]);

  // Sample seat layout matrix (0: no seat, 1: seat)
  const seatMatrix = [
    [0, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 1, 1, 0],
  ];

  // State for seat statuses (key: "row-col", value: status)
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
    // TODO: update seatStatuses based on the selected time
    console.log("Time changed to:", time);
  };

  const handleSeatPress = (seatId, status) => {
    // For demonstration: toggling between "empty" and "occupied"
    const newStatus = status === "empty" ? "occupied" : "empty";
    setSeatStatuses((prev) => ({ ...prev, [seatId]: newStatus }));
  };

  return (
    <Container>
      {/* Seat matrix takes up most of the screen */}
      {/* <Content style={{ flex: 3 }}>
        <SeatMatrix 
          matrix={seatMatrix}
          seatStatuses={seatStatuses}
          onSeatPress={handleSeatPress}
        />
      </Content> */}
      {/* Time scroll picker on the side */}
      <Content style={{ flex: 1 }}>
        <TimeScroll
          times={times}
          selectedTime={selectedTime}
          onTimeChange={handleTimeChange}
        />
      </Content>
    </Container>
  );
};
