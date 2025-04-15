// src/features/customer/reservations/screens/ReservationsScreen.js
import React, { useState, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components/native";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns";
import { reservations } from "../../../../data/mockData";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { Separator } from "../../../../components/Separator/Separator";
import { ReservationCard } from "../components/ReservationCard";
import { PastReservationCard } from "../components/PastReservationCard";
import { useReservation } from "../../../../services/ReservationContext";
import { FadeInView } from "../../../../components/FadeInView/FadeInView";
import ReservationFlow from "../screens/ReservationFlow";

const Container = styled(SafeArea)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const TabBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const Tab = styled(TouchableOpacity)`
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
  border-bottom-width: 2px;
  border-bottom-color: ${(props) =>
    props.active ? props.theme.colors.ui.primary : "transparent"};
`;

const TabText = styled(CustomText)`
  color: ${(props) =>
    props.active
      ? props.theme.colors.ui.primary
      : props.theme.colors.text.primary};
  font-weight: ${(props) =>
    props.active
      ? props.theme.fontWeights.bold
      : props.theme.fontWeights.regular};
`;

// Section title
const SectionTitle = styled(CustomText)`
  margin-left: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[2]};
`;

// Empty state
const EmptyState = styled.View`
  padding: ${(props) => props.theme.space[4]};
  align-items: center;
  justify-content: center;
`;

const EmptyStateText = styled(CustomText)`
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: ${(props) => props.theme.space[2]};
`;

const ActionButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.ui.primary};
  padding: ${(props) => props.theme.space[2]};
  border-radius: 8px;
  margin-top: ${(props) => props.theme.space[3]};
`;

const ActionButtonText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-left: ${(props) => props.theme.space[1]};
`;

// Reservation details
const ReservationDetails = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[3]};
  margin: ${(props) => props.theme.space[3]};
  border-radius: 8px;
  z-index: 10;
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const DetailIcon = styled(MaterialIcons)`
  margin-right: ${(props) => props.theme.space[2]};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const DetailInfo = styled.View`
  flex: 1;
`;

const DetailLabel = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const DetailValue = styled(CustomText)`
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const DetailsActions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${(props) => props.theme.space[3]};
`;

const DetailsActionButton = styled(TouchableOpacity)`
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
`;

const StatusBadge = styled.View`
  background-color: ${(props) => {
    switch (props.status) {
      case "Confirmed":
        return props.theme.colors.ui.success;
      case "Pending":
        return "#FFC107";
      case "Completed":
        return props.theme.colors.ui.secondary;
      case "Cancelled":
        return props.theme.colors.ui.error;
      default:
        return props.theme.colors.ui.secondary;
    }
  }};
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border-radius: 4px;
  align-self: flex-start;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const StatusText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

// Card related components
const CardContainer = styled.View`
  position: relative;
`;

const DetailButtonOverlay = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  height: 50px;
  width: 80px;
  z-index: 100;
`;

const ViewButtonOverlay = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  width: 60px;
  z-index: 100;
  justify-content: center;
`;

// Backdrop for closing details
const Backdrop = styled(TouchableWithoutFeedback)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
`;

// Overlay for ReservationFlow
const FlowOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.bg.primary};
  z-index: 100;
`;

export const ReservationsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const scrollViewRef = useRef(null);
  const theme = useTheme();
  const {
    isLoading,
    getUpcomingReservations,
    getPastReservations,
    cancelReservation,
  } = useReservation();

  // State to manage the reservation flow
  const [showReservationFlow, setShowReservationFlow] = useState(false);
  const [reservationToModify, setReservationToModify] = useState(null);

  // For the demo, we'll use mock data since the context isn't fully implemented
  // In a real app, this would use the context data
  const upcomingReservations = reservations.filter(
    (reservation) =>
      reservation.status === "Confirmed" || reservation.status === "Pending"
  );
  const pastReservations = reservations.filter(
    (reservation) => reservation.status === "Completed"
  );

  // Reset selected reservation when tab changes
  useEffect(() => {
    setSelectedReservation(null);
  }, [activeTab]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEE, MMM d, yyyy");
  };

  const handleReservationPress = (reservation) => {
    setSelectedReservation(
      selectedReservation?.id === reservation.id ? null : reservation
    );
  };

  const closeDetails = () => {
    setSelectedReservation(null);
  };

  const handleCancelReservation = () => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            // In a real app, this would use the context
            // await cancelReservation(selectedReservation.id);
            Alert.alert("Cancelled", "Your reservation has been cancelled.");
            setSelectedReservation(null);
          },
        },
      ]
    );
  };

  const handleModifyReservation = () => {
    // Set the reservation to modify
    setReservationToModify(selectedReservation);
    // Close the details view
    setSelectedReservation(null);
    // Show the reservation flow
    setShowReservationFlow(true);
  };

  const handleMakeNewReservation = () => {
    // Show the reservation flow for a new reservation
    setReservationToModify(null);
    setShowReservationFlow(true);
  };

  const handleBackFromReservation = () => {
    // Hide the reservation flow
    setShowReservationFlow(false);
    setReservationToModify(null);
  };

  const renderEmptyState = () => (
    <EmptyState>
      <MaterialIcons name="event-busy" size={60} color="#757575" />
      <EmptyStateText>
        {activeTab === "upcoming"
          ? "You don't have any upcoming reservations"
          : "You don't have any past reservations"}
      </EmptyStateText>
      {activeTab === "upcoming" && (
        <ActionButton onPress={handleMakeNewReservation}>
          <MaterialIcons name="add" size={20} color="white" />
          <ActionButtonText>Make a Reservation</ActionButtonText>
        </ActionButton>
      )}
    </EmptyState>
  );

  const renderReservationDetails = () => {
    if (!selectedReservation) return null;
    const isPastReservation = selectedReservation.status === "Completed";
    const formattedDuration = selectedReservation.duration
      ? `${Math.floor(selectedReservation.duration / 60)}h${
          selectedReservation.duration % 60 > 0
            ? ` ${selectedReservation.duration % 60}m`
            : ""
        }`
      : "";
    return (
      <>
        <Backdrop onPress={closeDetails}>
          <View style={{ flex: 1 }} />
        </Backdrop>
        <ReservationDetails>
          <StatusBadge status={selectedReservation.status}>
            <StatusText>{selectedReservation.status}</StatusText>
          </StatusBadge>
          <DetailRow>
            <DetailIcon name="restaurant" size={20} />
            <DetailInfo>
              <DetailLabel>Restaurant</DetailLabel>
              <DetailValue>{selectedReservation.restaurant.name}</DetailValue>
            </DetailInfo>
          </DetailRow>
          <DetailRow>
            <DetailIcon name="event" size={20} />
            <DetailInfo>
              <DetailLabel>Date & Time</DetailLabel>
              <DetailValue>
                {formatDate(selectedReservation.date)} at{" "}
                {selectedReservation.time}
                {formattedDuration && ` (${formattedDuration})`}
              </DetailValue>
            </DetailInfo>
          </DetailRow>
          <DetailRow>
            <DetailIcon name="people" size={20} />
            <DetailInfo>
              <DetailLabel>Party Size</DetailLabel>
              <DetailValue>
                {selectedReservation.people || selectedReservation.seatsNumber}{" "}
                people
              </DetailValue>
            </DetailInfo>
          </DetailRow>
          {selectedReservation.chairs &&
            selectedReservation.chairs.length > 0 && (
              <DetailRow>
                <DetailIcon name="event-seat" size={20} />
                <DetailInfo>
                  <DetailLabel>Seating</DetailLabel>
                  <DetailValue>
                    Seats: {selectedReservation.chairs.join(", ")}
                  </DetailValue>
                </DetailInfo>
              </DetailRow>
            )}
          {selectedReservation.counterSeatId && (
            <DetailRow>
              <DetailIcon name="event-seat" size={20} />
              <DetailInfo>
                <DetailLabel>Seating</DetailLabel>
                <DetailValue>
                  Counter Seat: {selectedReservation.counterSeatId}
                </DetailValue>
              </DetailInfo>
            </DetailRow>
          )}
          {selectedReservation.note && (
            <DetailRow>
              <DetailIcon name="notes" size={20} />
              <DetailInfo>
                <DetailLabel>Special Requests</DetailLabel>
                <DetailValue>{selectedReservation.note}</DetailValue>
              </DetailInfo>
            </DetailRow>
          )}
          {!isPastReservation && (
            <DetailsActions>
              <DetailsActionButton onPress={handleModifyReservation}>
                <MaterialIcons name="edit" size={24} color="#262626" />
                <CustomText>Modify</CustomText>
              </DetailsActionButton>
              <DetailsActionButton
                onPress={() => {
                  navigation.navigate("RestaurantDetailScreen", {
                    restaurant: selectedReservation.restaurant,
                  });
                  setSelectedReservation(null);
                }}
              >
                <MaterialIcons name="info" size={24} color="#262626" />
                <CustomText>Details</CustomText>
              </DetailsActionButton>
              <DetailsActionButton onPress={handleCancelReservation}>
                <MaterialIcons name="cancel" size={24} color="#F44336" />
                <CustomText style={{ color: "#F44336" }}>Cancel</CustomText>
              </DetailsActionButton>
            </DetailsActions>
          )}
        </ReservationDetails>
      </>
    );
  };

  if (showReservationFlow) {
    return (
      <SafeArea>
        <FlowOverlay>
          <View
            style={{ flexDirection: "row", padding: 16, alignItems: "center" }}
          >
            <TouchableOpacity onPress={handleBackFromReservation}>
              <MaterialIcons name="arrow-back" size={24} color="#262626" />
            </TouchableOpacity>
            <CustomText variant="title" style={{ marginLeft: 16 }}>
              {reservationToModify
                ? "Modify Reservation"
                : "Make a Reservation"}
            </CustomText>
          </View>
          <ReservationFlow
            restaurant={reservationToModify?.restaurant}
            existingReservation={reservationToModify}
            onCancel={handleBackFromReservation}
          />
        </FlowOverlay>
      </SafeArea>
    );
  }

  return (
    <Container>
      <TabBar>
        <Tab
          active={activeTab === "upcoming"}
          onPress={() => setActiveTab("upcoming")}
        >
          <TabText active={activeTab === "upcoming"}>Upcoming</TabText>
        </Tab>
        <Tab active={activeTab === "past"} onPress={() => setActiveTab("past")}>
          <TabText active={activeTab === "past"}>Past</TabText>
        </Tab>
      </TabBar>
      {selectedReservation && renderReservationDetails()}
      <ScrollView ref={scrollViewRef} onScrollBeginDrag={closeDetails}>
        {activeTab === "upcoming" && (
          <>
            {upcomingReservations.length > 0 ? (
              <>
                <SectionTitle variant="title">
                  Upcoming Reservations
                </SectionTitle>
                {upcomingReservations.map((reservation, index) => (
                  <FadeInView key={reservation.id} duration={300 + index * 100}>
                    <CardContainer>
                      <ReservationCard
                        reservation={reservation}
                        isSelected={selectedReservation?.id === reservation.id}
                      />
                      <DetailButtonOverlay
                        onPress={() => handleReservationPress(reservation)}
                      />
                    </CardContainer>
                    {index < upcomingReservations.length - 1 && (
                      <Separator type="full" />
                    )}
                  </FadeInView>
                ))}
              </>
            ) : (
              renderEmptyState()
            )}
          </>
        )}
        {activeTab === "past" && (
          <>
            {pastReservations.length > 0 ? (
              <>
                <SectionTitle variant="title">Past Reservations</SectionTitle>
                <Spacer position="top" size="small" />
                {pastReservations.map((reservation, index) => (
                  <FadeInView key={reservation.id} duration={300 + index * 100}>
                    <CardContainer>
                      <PastReservationCard
                        reservation={reservation}
                        isSelected={selectedReservation?.id === reservation.id}
                      />
                      <ViewButtonOverlay
                        onPress={() => handleReservationPress(reservation)}
                      />
                    </CardContainer>
                    {index < pastReservations.length - 1 && (
                      <Separator type="partial" />
                    )}
                  </FadeInView>
                ))}
              </>
            ) : (
              renderEmptyState()
            )}
          </>
        )}
      </ScrollView>
    </Container>
  );
};
