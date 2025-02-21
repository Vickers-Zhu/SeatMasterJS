// File: src/features/merchant/components/TableLayout.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";

const FloorPlanContainer = styled.View`
  width: 100%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  position: relative;
`;

const TableMarkerContainer = styled(Animated.View)`
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: ${({ status, theme }) =>
    status === "occupied" ? "#ff4d4d" : "#b3ffb3"};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.ui.primary};
`;

const ResetButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.ui.primary};
  padding: 10px;
  border-radius: 8px;
  align-self: center;
  margin-top: 16px;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: bold;
`;

const defaultTablesData = [
  { id: 1, x: 20, y: 30, status: "empty" },
  { id: 2, x: 100, y: 30, status: "occupied" },
  { id: 3, x: 180, y: 30, status: "empty" },
  { id: 4, x: 20, y: 120, status: "reserved" },
  { id: 5, x: 100, y: 120, status: "empty" },
  { id: 6, x: 180, y: 120, status: "occupied" },
];

export const TableLayout = ({ tables = defaultTablesData, onTablePress }) => {
  // Store the initial positions so we can reset later
  const initialPositions = {};
  tables.forEach((table) => {
    initialPositions[table.id] = { x: table.x, y: table.y };
  });

  // For each table, maintain an Animated.ValueXY for position.
  const [positions] = useState(() => {
    const pos = {};
    tables.forEach((table) => {
      pos[table.id] = new Animated.ValueXY({ x: table.x, y: table.y });
    });
    return pos;
  });

  // Reset functionality: reset all markers to their initial positions.
  const resetPositions = () => {
    tables.forEach((table) => {
      Animated.spring(positions[table.id], {
        toValue: {
          x: initialPositions[table.id].x,
          y: initialPositions[table.id].y,
        },
        useNativeDriver: false,
      }).start();
    });
  };

  // Create a pan responder for each table marker.
  const createPanResponder = (tableId) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        positions[tableId].setOffset({
          x: positions[tableId].x._value,
          y: positions[tableId].y._value,
        });
        positions[tableId].setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: positions[tableId].x, dy: positions[tableId].y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        positions[tableId].flattenOffset();
        if (onTablePress) {
          onTablePress(tableId);
        }
      },
    });
  };

  // Create pan responders and store in a ref to avoid re-creating them on every render.
  const panRespondersRef = useRef({});
  useEffect(() => {
    tables.forEach((table) => {
      panRespondersRef.current[table.id] = createPanResponder(table.id);
    });
  }, [tables]);

  return (
    <>
      <FloorPlanContainer>
        {tables.map((table) => (
          <TableMarkerContainer
            key={table.id}
            status={table.status}
            style={positions[table.id].getLayout()}
            {...(panRespondersRef.current[table.id]
              ? panRespondersRef.current[table.id].panHandlers
              : {})}
          >
            <Text>{table.id}</Text>
          </TableMarkerContainer>
        ))}
      </FloorPlanContainer>
      <ResetButton onPress={resetPositions}>
        <ButtonText>Reset Layout</ButtonText>
      </ResetButton>
    </>
  );
};
