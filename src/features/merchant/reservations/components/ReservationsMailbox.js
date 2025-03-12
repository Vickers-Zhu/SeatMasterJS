import React, { useState, useRef, useEffect } from "react";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Status colors
const COLORS = {
  PENDING: {
    bg: "#ffd11a",
    text: "#a67f00",
  },
  CONFIRMED: {
    bg: "#4CAF50",
    text: "#FFFFFF",
  },
  CANCELED: {
    bg: "#ff4d4d",
    text: "#FFFFFF",
  },
};

// Component styles
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ReservationCard = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 4px;
  margin: 2px 12px;
  padding: 10px 12px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  elevation: 1;
  border-left-width: 3px;
  border-left-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return COLORS.PENDING.bg;
      case "confirmed":
        return COLORS.CONFIRMED.bg;
      default:
        return COLORS.CANCELED.bg;
    }
  }};
`;

const StatusIndicator = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 3px;
  padding: 2px 4px;
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return COLORS.PENDING.bg;
      case "confirmed":
        return COLORS.CONFIRMED.bg;
      default:
        return COLORS.CANCELED.bg;
    }
  }};
`;

const StatusText = styled(CustomText)`
  font-size: 10px;
  font-weight: bold;
  color: ${(props) => {
    switch (props.status) {
      case "pending":
        return COLORS.PENDING.text;
      case "confirmed":
        return COLORS.CONFIRMED.text;
      default:
        return COLORS.CANCELED.text;
    }
  }};
`;

const CardTitle = styled(CustomText)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  margin-right: 65px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 2px;
`;

const DetailIcon = styled(MaterialIcons)`
  margin-right: 4px;
  font-size: 14px;
`;

const DetailText = styled(CustomText)`
  font-size: 12px;
`;

const SectionHeader = styled.View`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding: 6px 12px;
`;

const SectionHeaderText = styled(CustomText)`
  font-size: 16px;
  font-weight: bold;
`;

const SwipeHintContainer = styled(Animated.View)`
  padding: 16px;
  align-items: center;
  margin-bottom: 8px;
`;

const SwipeHintText = styled(CustomText)`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: center;
`;

const ActionContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

const ActionText = styled(CustomText)`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-left: 8px;
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
  const [hintVisible, setHintVisible] = useState(true);
  const swipeableRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef(null);
  const hideTimerRef = useRef(null);

  // Track scroll for pull detection
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Auto-hide hint after initial display
  useEffect(() => {
    // Initial timeout - hide after 5 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setHintVisible(false));
    }, 5000);

    return () => {
      clearTimeout(timer);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  // Show hint only with strong pull-to-refresh type gesture
  const handleScroll = (event) => {
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime.current;
    const currentY = event.nativeEvent.contentOffset.y;

    // Calculate scroll velocity (pixels per millisecond)
    if (timeDelta > 0) {
      scrollVelocity.current = (lastScrollY.current - currentY) / timeDelta;
    }

    // Strong pull detected at the top (negative because pulling down)
    const isStrongPullUp = scrollVelocity.current > 0.5 && currentY < 10;
    const isScrollingDown = currentY > 30 && currentY > lastScrollY.current;

    // Show hint on strong pull at top
    if (isStrongPullUp && !hintVisible) {
      setHintVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Keep hint visible for a short time
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setHintVisible(false));
      }, 3000);
    }
    // Hide hint when scrolling down
    else if (isScrollingDown && hintVisible) {
      clearTimeout(hideTimerRef.current);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setHintVisible(false));
    }

    // Save current position and time for next calculation
    lastScrollY.current = currentY;
    lastScrollTime.current = currentTime;
  };

  const sortReservations = (reservations) => {
    return [...reservations].sort((a, b) => {
      // Priority by status (pending first)
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;

      // Then sort by time
      const timeA = a.time.split(":").map(Number);
      const timeB = b.time.split(":").map(Number);

      if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0]; // Sort by hour
      return timeA[1] - timeB[1]; // Sort by minute
    });
  };

  // Group reservations by status
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

  // Handler functions with alerts for testing
  const handleConfirm = (id) => {
    Alert.alert(
      "Confirm Reservation",
      `Reservation #${id} has been CONFIRMED.`,
      [{ text: "OK" }]
    );
    // Here you would update the reservation status in your state or database
  };

  const handleCancel = (id) => {
    Alert.alert("Cancel Reservation", `Reservation #${id} has been CANCELED.`, [
      { text: "OK" },
    ]);
    // Here you would update the reservation status in your state or database
  };

  // Action renderers - Pure functions that return appropriate action UI
  const renderRightActions = (progress, dragX) => {
    return (
      <ActionContainer color={COLORS.CONFIRMED.bg}>
        <MaterialIcons name="check-circle" size={24} color="white" />
        <ActionText>CONFIRM</ActionText>
      </ActionContainer>
    );
  };

  const renderLeftActions = (progress, dragX) => {
    return (
      <ActionContainer color={COLORS.CANCELED.bg}>
        <MaterialIcons name="cancel" size={24} color="white" />
        <ActionText>CANCEL</ActionText>
      </ActionContainer>
    );
  };

  // Card renderer
  const renderReservationCard = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <Swipeable
        ref={(ref) => {
          if (ref && expandedId === item.id) {
            swipeableRef.current = ref;
          }
        }}
        friction={2}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableLeftOpen={() => handleCancel(item.id)}
        onSwipeableRightOpen={() => handleConfirm(item.id)}
        onSwipeableWillOpen={(direction) => {
          // Close previous swipeable
          if (swipeableRef.current && expandedId !== item.id) {
            swipeableRef.current.close();
          }
          // Log for debugging
          console.log(`Swiping ${direction} for reservation #${item.id}`);
          setExpandedId(item.id);
        }}
        containerStyle={{ backgroundColor: "transparent" }}
        childrenContainerStyle={{ backgroundColor: "white" }}
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

          <CardTitle numberOfLines={1} ellipsizeMode="tail">
            {item.customerName}
          </CardTitle>

          <DetailRow>
            <DetailIcon name="access-time" color="#757575" />
            <DetailText>
              {item.time} ({item.duration} min)
            </DetailText>
          </DetailRow>

          <DetailRow>
            <DetailIcon name="people" color="#757575" />
            <DetailText>
              {item.people} {item.people > 1 ? "people" : "person"}
            </DetailText>
          </DetailRow>

          {!isExpanded ? (
            <DetailRow>
              <DetailIcon name="event-seat" color="#757575" />
              <DetailText numberOfLines={1} ellipsizeMode="tail">
                {item.isCounterSeat
                  ? `Counter: ${item.counterSeatId}`
                  : `Table: ${item.tableId}`}
              </DetailText>
            </DetailRow>
          ) : (
            <>
              <DetailRow>
                <DetailIcon name="event-seat" color="#757575" />
                <DetailText>
                  {item.isCounterSeat
                    ? `Counter Seat: ${item.counterSeatId}`
                    : `Table: ${item.tableId}`}
                </DetailText>
              </DetailRow>
              {item.note && (
                <DetailRow>
                  <DetailIcon name="notes" color="#757575" />
                  <DetailText>{item.note}</DetailText>
                </DetailRow>
              )}
            </>
          )}
        </ReservationCard>
      </Swipeable>
    );
  };

  // Section header renderer
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

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "hint":
        return hintVisible ? (
          <SwipeHintContainer style={{ opacity: fadeAnim }}>
            <SwipeHintText>
              ← Swipe LEFT to CANCEL{"\n"}
              Swipe RIGHT to CONFIRM →
            </SwipeHintText>
          </SwipeHintContainer>
        ) : null;
      case "header":
        return renderSectionHeader(item.title, item.count);
      case "item":
        return renderReservationCard({ item: item.item });
      default:
        return null;
    }
  };

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
          ref={flatListRef}
          data={sections}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </Container>
    </GestureHandlerRootView>
  );
};

export default ReservationsMailbox;
