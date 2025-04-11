// src/features/customer/reservations/components/ReservationLayoutView.js
// Updated ReservationLayoutView to pass interaction handlers to WebApp

import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomText } from "../../../../components/CustomText/CustomText";
import WebApp from "../../../../components/WebApp/WebApp";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";

const Container = styled.View`
  min-height: 250px;
  margin-bottom: ${(props) => props.theme.space[3]};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const InfoBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const InfoText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const SelectedTable = styled(CustomText)`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
`;

const LegendContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

const LegendColor = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-right: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.color};
`;

const LegendText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const ReservationLayoutView = ({
  partySize,
  selectedTime,
  selectedDate,
  onTableSelect,
  onInteractionStart,
  onInteractionEnd,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (items) => {
    setSelectedItems(items);
    if (items.length === 1 && onTableSelect) {
      onTableSelect(items[0]);
    } else if (items.length === 0 && onTableSelect) {
      onTableSelect(null);
    }
  };

  return (
    <Container>
      <InfoBar>
        <InfoText>
          Preview available tables for {partySize}{" "}
          {partySize === 1 ? "person" : "people"} at {selectedTime}
        </InfoText>
        {selectedItems.length > 0 && (
          <SelectedTable>Selected: {selectedItems.join(", ")}</SelectedTable>
        )}
      </InfoBar>
      <ErrorBoundary>
        <WebApp
          onInteractionStart={onInteractionStart}
          onInteractionEnd={onInteractionEnd}
          onSelectedItemsChange={handleSelectedItems}
        />
      </ErrorBoundary>
      <LegendContainer>
        <LegendItem>
          <LegendColor color="#4CAF50" />
          <LegendText>Selected</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#F44336" />
          <LegendText>Occupied</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#FFC107" />
          <LegendText>Reserved</LegendText>
        </LegendItem>
      </LegendContainer>
    </Container>
  );
};

export default ReservationLayoutView;
