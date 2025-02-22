import React, { useState } from "react";
import { TouchableOpacity, View, Text, useWindowDimensions } from "react-native";
import styled from "styled-components/native";

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const FIXED_BUTTON_SIZE = 60;
const FIXED_MARGIN_RIGHT = 16;

const TableButton = styled(TouchableOpacity)`
  background-color: ${({ status, theme }) =>
    status === "occupied"
      ? "#ff4d4d"
      : status === "reserved"
      ? "#ffd11a"
      : "#b3ffb3"};
  margin-right: ${({ marginRight }) => marginRight}px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
`;

export const TableMatrix = ({
  tableStatuses: initialTableStatuses,
  onTablePress,
}) => {
  // tableStatuses is an object keyed by "row-col"
  // Each entry is { id, row, col, status }
  const [tableStatuses, setTableStatuses] = useState(initialTableStatuses);
  const { width: screenWidth } = useWindowDimensions();

  // Calculate the maximum rows and columns from the provided statuses
  const entries = Object.values(tableStatuses);
  const maxRow = entries.length > 0 ? Math.max(...entries.map(e => e.row)) : 0;
  const maxCol = entries.length > 0 ? Math.max(...entries.map(e => e.col)) : 0;
  const rows = maxRow + 1;
  const columns = maxCol + 1;
  
  const horizontalPadding = 32;
  const totalRequiredWidth =
    columns * FIXED_BUTTON_SIZE + (columns - 1) * FIXED_MARGIN_RIGHT;
  const availableWidth = screenWidth - horizontalPadding;
  const scale =
    totalRequiredWidth > availableWidth ? availableWidth / totalRequiredWidth : 1;
  
  const buttonSize = FIXED_BUTTON_SIZE * scale;
  const marginRight = FIXED_MARGIN_RIGHT * scale;

  const handlePress = (row, col, currentStatus) => {
    const key = `${row}-${col}`;
    const newStatus = currentStatus === "empty" ? "occupied" : "empty";
    console.log(`Table pressed: key=${key}, oldStatus=${currentStatus}, newStatus=${newStatus}`);
    setTableStatuses((prev) => ({
      ...prev,
      [key]: { id: prev[key]?.id || key, row, col, status: newStatus },
    }));
    if (onTablePress) {
      onTablePress(key, newStatus);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Row key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const entry = tableStatuses[key];
            if (entry) {
              return (
                <TableButton
                  key={key}
                  status={entry.status}
                  marginRight={marginRight}
                  onPress={() => handlePress(rowIndex, colIndex, entry.status)}
                  style={{ width: buttonSize, height: buttonSize }}
                >
                  <Text>{entry.id}</Text>
                </TableButton>
              );
            } else {
              return (
                <View
                  key={key}
                  style={{ width: buttonSize, height: buttonSize, marginRight }}
                />
              );
            }
          })}
        </Row>
      ))}
    </View>
  );
};