// src/features/customer/reservations/components/ReservationLayoutView.js
import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
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

const PartyLimitText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.error};
  font-weight: bold;
`;

const SelectedSeats = styled(CustomText)`
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

/**
 * ReservationLayoutView component for selecting seats in the restaurant layout
 *
 * @param {Object} props - Component props
 * @param {Function} props.onTableSelect - Callback function when seats are selected
 * @param {number} props.partySize - Number of people in the party
 * @param {string} props.selectedTime - Selected reservation time (e.g. "19:00")
 * @param {string} props.selectedDate - Selected reservation date (formatted as YYYY-MM-DD)
 * @param {Function} props.onInteractionStart - Callback when interaction with layout starts
 * @param {Function} props.onInteractionEnd - Callback when interaction with layout ends
 * @returns {JSX.Element} The reservation layout component
 */
const ReservationLayoutView = ({
  onTableSelect,
  partySize,
  selectedTime,
  selectedDate,
  onInteractionStart,
  onInteractionEnd,
}) => {
  // State to track selected seats
  const [selectedItems, setSelectedItems] = useState([]);

  // Reset selections when party size changes
  useEffect(() => {
    setSelectedItems([]);
    if (onTableSelect) {
      onTableSelect(null);
    }
  }, [partySize, onTableSelect]);

  /**
   * Handle selection of chairs/seats from the WebApp
   * @param {Array} items - Array of selected seat IDs
   */
  const handleWebAppSelection = useCallback(
    (items) => {
      // Handle party size limitations
      if (items.length > partySize) {
        // Keep the most recent selections up to the party size limit
        const limitedItems = items.slice(-partySize);

        // Notify user about the limit
        Alert.alert(
          "Selection Limit Reached",
          `You can only select ${partySize} ${
            partySize === 1 ? "seat" : "seats"
          } based on your party size.`
        );

        // Update internal state
        setSelectedItems(limitedItems);

        // Notify parent component about selected items
        if (onTableSelect) {
          onTableSelect(limitedItems.join(","));
        }
      } else {
        // Normal selection within limits
        setSelectedItems(items);

        // Notify parent component
        if (items.length > 0 && onTableSelect) {
          onTableSelect(items.join(","));
        } else if (onTableSelect) {
          onTableSelect(null);
        }
      }
    },
    [partySize, onTableSelect]
  );

  return (
    <Container>
      <InfoBar>
        <InfoText>
          Preview available seats for {partySize}{" "}
          {partySize === 1 ? "person" : "people"} at {selectedTime}
        </InfoText>
        {selectedItems.length > 0 ? (
          <SelectedSeats>
            Selected: {selectedItems.join(", ")}
            {selectedItems.length < partySize &&
              ` (${partySize - selectedItems.length} more needed)`}
          </SelectedSeats>
        ) : (
          <PartyLimitText>Please select up to {partySize} seats</PartyLimitText>
        )}
      </InfoBar>

      <ErrorBoundary>
        <WebApp
          onInteractionStart={onInteractionStart}
          onInteractionEnd={onInteractionEnd}
          selectedItems={selectedItems}
          onSelectedItemsChange={handleWebAppSelection}
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
