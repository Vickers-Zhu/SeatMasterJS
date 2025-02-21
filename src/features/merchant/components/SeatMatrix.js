// File: src/features/merchant/components/SeatMatrix.js
import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 16px; /* Increased space between rows */
`;

const SeatButton = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  background-color: ${({ status, theme }) =>
    status === "occupied"
      ? "#ff4d4d"
      : status === "reserved"
      ? "#ffd11a"
      : "#b3ffb3"};
  margin-right: 16px; /* Increased space between seats */
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
`;

export const SeatMatrix = ({
  matrix,
  seatStatuses: initialSeatStatuses,
  onSeatPress,
}) => {
  const [seatStatuses, setSeatStatuses] = useState(initialSeatStatuses);

  const handlePress = (seatId, status) => {
    const newStatus = status === "empty" ? "occupied" : "empty";
    setSeatStatuses((prev) => ({ ...prev, [seatId]: newStatus }));
    if (onSeatPress) {
      onSeatPress(seatId, newStatus);
    }
  };

  return (
    <View>
      {matrix.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => {
            if (cell === 1) {
              const seatId = `${rowIndex}-${colIndex}`;
              const status = seatStatuses[seatId] || "empty";
              return (
                <SeatButton
                  key={seatId}
                  status={status}
                  onPress={() => handlePress(seatId, status)}
                >
                  <Text>{seatId}</Text>
                </SeatButton>
              );
            } else {
              return (
                <View
                  key={`${rowIndex}-${colIndex}`}
                  style={{ width: 60, height: 60, marginRight: 16 }}
                />
              );
            }
          })}
        </Row>
      ))}
    </View>
  );
};
