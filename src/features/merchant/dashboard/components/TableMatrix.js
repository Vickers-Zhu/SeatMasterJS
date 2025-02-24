// File: src/features/merchant/components/TableMatrix.js
import React, { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { SharedTableItem } from "./SharedTableStyles.styles"; // Using shared table style

const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const FIXED_BUTTON_SIZE = 60;
const FIXED_MARGIN_RIGHT = 16;

export const TableMatrix = ({
  tableStatuses: initialTableStatuses,
  onTablePress,
}) => {
  const [tableStatuses, setTableStatuses] = useState(initialTableStatuses);
  const { width: screenWidth } = useWindowDimensions();

  // Calculate maximum rows and columns based on tableStatuses keys (assumed format "row-col")
  const entries = Object.values(tableStatuses);
  const maxRow =
    entries.length > 0 ? Math.max(...entries.map((e) => e.row)) : 0;
  const maxCol =
    entries.length > 0 ? Math.max(...entries.map((e) => e.col)) : 0;
  const rows = maxRow + 1;
  const columns = maxCol + 1;

  const horizontalPadding = 32;
  const totalRequiredWidth =
    columns * FIXED_BUTTON_SIZE + (columns - 1) * FIXED_MARGIN_RIGHT;
  const availableWidth = screenWidth - horizontalPadding;
  const scale =
    totalRequiredWidth > availableWidth
      ? availableWidth / totalRequiredWidth
      : 1;

  const buttonSize = FIXED_BUTTON_SIZE * scale;
  const marginRight = FIXED_MARGIN_RIGHT * scale;

  const handlePress = (row, col, currentStatus) => {
    const key = `${row}-${col}`;
    const newStatus = currentStatus === "empty" ? "occupied" : "empty";
    console.log(
      `Table pressed: key=${key}, oldStatus=${currentStatus}, newStatus=${newStatus}`
    );
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
                <SharedTableItem
                  key={entry.id} // using table id as the key
                  status={entry.status}
                  onPress={() => handlePress(rowIndex, colIndex, entry.status)}
                  style={{ width: buttonSize, height: buttonSize, marginRight }}
                >
                  <Text>{entry.id}</Text>
                </SharedTableItem>
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
