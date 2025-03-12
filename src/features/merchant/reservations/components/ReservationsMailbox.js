// src/features/merchant/reservations/components/ReservationsMailbox.js
import React, { useState, useRef } from "react";
import {
  FlatList,
  Animated,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

// Styled components for the mailbox UI
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ReservationCard = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 8px;
  margin: 8px 16px;
  padding: 16px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 3;
  border-left-width: 5px;
  border-left-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#ffd11a";
      case "confirmed":
        return "#b3ffb3";
      default:
        return "#ff4d4d";
    }
  }};
`;

const StatusIndicator = styled.View`
  position: absolute;
  right: 16px;
  top: 16px;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#ffd11a";
      case "confirmed":
        return "#b3ffb3";
      default:
        return "#ff4d4d";
    }
  }};
`;

const StatusText = styled(CustomText)`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#a67f00";
      case "confirmed":
        return "#138000";
      default:
        return "#b30000";
    }
  }};
`;

const CardTitle = styled(CustomText)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  margin-right: 80px; /* Make space for status indicator */
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 4px;
`;

const DetailIcon = styled(MaterialIcons)`
  margin-right: 8px;
`;

const DetailText = styled(CustomText)`
  font-size: 14px;
`;

const SectionHeader = styled.View`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding: 8px 16px;
`;

const SectionHeaderText = styled(CustomText)`
  font-size: 16px;
  font-weight: bold;
`;

const SwipeHintContainer = styled.View`
  padding: 16px;
  align-items: center;
  margin-bottom: 8px;
`;

const SwipeHintText = styled(CustomText)`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const SwipeActionContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
  background-color: ${(props) => props.backgroundColor};
`;

const SwipeActionText = styled(CustomText)`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const NoReservationsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const NoReservationsText = styled(CustomText)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: center;
`;

const ReservationsMailbox = ({ reservations }) => {
  const [expandedId, setExpandedId] = useState(null);

  // Create a reference to track the currently open swipeable
  const swipeableRef = useRef(null);

  // Function to handle confirming a reservation
  const handleConfirm = (id) => {
    Alert.alert("Confirm Reservation", "Reservation has been confirmed.");
    // Here you would update the reservation status in your state or database
  };

  // Function to handle canceling a reservation
  const handleCancel = (id) => {
    Alert.alert("Cancel Reservation", "Reservation has been canceled.");
    // Here you would update the reservation status in your state or database
  };

  // Function to sort reservations with pending first, then by time
  const sortReservations = (reservations) => {
    return [...reservations].sort((a, b) => {
      // Priority by status (pending comes first)
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;

      // Then sort by time
      const timeA = a.time.split(":").map(Number);
      const timeB = b.time.split(":").map(Number);

      if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0]; // Sort by hour
      return timeA[1] - timeB[1]; // Sort by minute
    });
  };

  // Group reservations by date (in a real app, you'd have date information)
  const groupedReservations = {
    today: sortReservations(reservations.filter((r) => r.status === "pending")),
    upcoming: sortReservations(
      reservations.filter((r) => r.status === "confirmed")
    ),
    past: sortReservations(
      reservations.filter(
        (r) => r.status !== "pending" && r.status !== "confirmed"
      )
    ),
  };

  // Render each reservation card
  const renderReservationCard = ({ item }) => {
    const isExpanded = expandedId === item.id;

    // Render right actions (confirm button)
    const renderRightActions = (progress, dragX) => {
      const translateX = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [0, 100],
        extrapolate: "clamp",
      });

      return (
        <SwipeActionContainer
          backgroundColor="#b3ffb3"
          style={{ transform: [{ translateX }] }}
        >
          <MaterialIcons name="check-circle" size={24} color="white" />
          <SwipeActionText>Confirm</SwipeActionText>
        </SwipeActionContainer>
      );
    };

    // Render left actions (cancel button)
    const renderLeftActions = (progress, dragX) => {
      const translateX = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [-100, 0],
        extrapolate: "clamp",
      });

      return (
        <SwipeActionContainer
          backgroundColor="#ff4d4d"
          style={{ transform: [{ translateX }] }}
        >
          <MaterialIcons name="cancel" size={24} color="white" />
          <SwipeActionText>Cancel</SwipeActionText>
        </SwipeActionContainer>
      );
    };

    return (
      <Swipeable
        ref={(ref) => {
          if (ref && expandedId === item.id) {
            swipeableRef.current = ref;
          }
        }}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        onSwipeableRightOpen={() => handleConfirm(item.id)}
        onSwipeableLeftOpen={() => handleCancel(item.id)}
        onSwipeableWillOpen={() => {
          // Close previous swipeable
          if (swipeableRef.current && expandedId !== item.id) {
            swipeableRef.current.close();
          }
          setExpandedId(item.id);
        }}
      >
        <ReservationCard
          status={item.status}
          onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
        >
          <StatusIndicator status={item.status}>
            <StatusText status={item.status}>
              {item.status.toUpperCase()}
            </StatusText>
          </StatusIndicator>

          <CardTitle>{item.customerName}</CardTitle>

          <DetailRow>
            <DetailIcon name="access-time" size={16} color="#757575" />
            <DetailText>
              {item.time} ({item.duration} min)
            </DetailText>
          </DetailRow>

          <DetailRow>
            <DetailIcon name="people" size={16} color="#757575" />
            <DetailText>
              {item.people} {item.people > 1 ? "people" : "person"}
            </DetailText>
          </DetailRow>

          <DetailRow>
            <DetailIcon name="event-seat" size={16} color="#757575" />
            <DetailText>
              {item.isCounterSeat
                ? `Counter Seat: ${item.counterSeatId}`
                : `Table: ${item.tableId}`}
            </DetailText>
          </DetailRow>

          {isExpanded && item.note && (
            <DetailRow>
              <DetailIcon name="notes" size={16} color="#757575" />
              <DetailText>{item.note}</DetailText>
            </DetailRow>
          )}
        </ReservationCard>
      </Swipeable>
    );
  };

  // Render section headers
  const renderSectionHeader = (title, count) => (
    <SectionHeader>
      <SectionHeaderText>
        {title} ({count})
      </SectionHeaderText>
    </SectionHeader>
  );

  // Combine all sections into a flat array for FlatList
  const sections = [
    { key: "hint", type: "hint" },
    {
      key: "pendingHeader",
      type: "header",
      title: "Pending Reservations",
      count: groupedReservations.today.length,
    },
    ...groupedReservations.today.map((item) => ({
      key: `pending-${item.id}`,
      type: "item",
      item,
    })),
    {
      key: "upcomingHeader",
      type: "header",
      title: "Confirmed Reservations",
      count: groupedReservations.upcoming.length,
    },
    ...groupedReservations.upcoming.map((item) => ({
      key: `upcoming-${item.id}`,
      type: "item",
      item,
    })),
    {
      key: "pastHeader",
      type: "header",
      title: "Past Reservations",
      count: groupedReservations.past.length,
    },
    ...groupedReservations.past.map((item) => ({
      key: `past-${item.id}`,
      type: "item",
      item,
    })),
  ];

  // Handle rendering different item types
  const renderItem = ({ item }) => {
    switch (item.type) {
      case "hint":
        return (
          <SwipeHintContainer>
            <SwipeHintText>
              ← Swipe left to cancel or right to confirm →
            </SwipeHintText>
          </SwipeHintContainer>
        );
      case "header":
        return renderSectionHeader(item.title, item.count);
      case "item":
        return renderReservationCard({ item: item.item });
      default:
        return null;
    }
  };

  // Check if there are any reservations
  if (!reservations || reservations.length === 0) {
    return (
      <NoReservationsContainer>
        <MaterialIcons name="event-busy" size={60} color="#757575" />
        <NoReservationsText>No reservations found</NoReservationsText>
      </NoReservationsContainer>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <FlatList
          data={sections}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </Container>
    </GestureHandlerRootView>
  );
};

export default ReservationsMailbox;
