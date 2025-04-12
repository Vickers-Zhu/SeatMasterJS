// src/features/customer/reservations/screens/ReservationFlow.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { format, addDays, isSameDay, getDay } from "date-fns";
import { CustomText } from "../../../../components/CustomText/CustomText";
import ReservationLayoutView from "../components/ReservationLayoutView";
import { TimeScroll } from "../../../../components/TimeScroll/TimeScroll";
import { Separator } from "../../../../components/Separator/Separator";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { generateTimeSlots } from "../../../merchant/reservations/utils/timeUtils";
import * as Styles from "./ReservationFlow.styles";

const getDayAvailability = (date) => {
  const day = getDay(date);
  if (day === 0 || day === 6) return "medium";
  if (day === 1) return "unavailable";
  return "high";
};

const getWeekdayName = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[getDay(date)];
};

const ReservationFlow = ({ restaurant, onComplete }) => {
  const dateScrollRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [partySize, setPartySize] = useState(2);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showLayout, setShowLayout] = useState(false);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const [notes, setNotes] = useState("");
  const [availability, setAvailability] = useState("high");
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [duration, setDuration] = useState(90);

  // Generate dates for selection
  const generateDates = useCallback(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const date = addDays(today, i);
      const availability = getDayAvailability(date);
      dates.push({
        date,
        label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : format(date, "MMM d"),
        weekday: getWeekdayName(date),
        availability,
        isUnavailable: availability === "unavailable",
      });
    }
    return dates;
  }, []);

  // Generate party size options based on restaurant settings
  const generatePartySizeOptions = useCallback(() => {
    const maxPartySize = restaurant?.settings?.maxReservationSize || 20;
    return Array.from({ length: maxPartySize }, (_, i) => i + 1);
  }, [restaurant?.settings?.maxReservationSize]);

  const [dateOptions] = useState(generateDates);
  const [partySizeOptions] = useState(generatePartySizeOptions);

  // Update available time slots based on selected date
  useEffect(() => {
    const allSlots = generateTimeSlots();
    const dayOfWeek = getDay(selectedDate);
    let filteredTimes;

    // Different hours for weekends vs weekdays
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend
      filteredTimes = allSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 10 && hour <= 22;
      });
    } else {
      // Weekday
      filteredTimes = allSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 11 && hour <= 21;
      });
    }

    setAvailableTimes(filteredTimes);

    // Set default time if none selected or current selection isn't available
    if (!selectedTime || !filteredTimes.includes(selectedTime)) {
      const defaultTimeIndex = Math.floor(filteredTimes.length / 2);
      setSelectedTime(filteredTimes[defaultTimeIndex]);
    }
  }, [selectedDate]);

  // Update availability and duration based on party size and time
  useEffect(() => {
    if (!selectedTime) return;

    const hour = parseInt(selectedTime.split(":")[0]);

    // Determine availability level based on party size and time
    if (partySize > 10) {
      setAvailability("low");
    } else if ((hour >= 18 && hour <= 20) || partySize > 6) {
      setAvailability("medium");
    } else {
      setAvailability("high");
    }

    // Set duration based on party size
    if (partySize >= 8) {
      setDuration(120);
    } else if (partySize >= 4) {
      setDuration(90);
    } else {
      setDuration(60);
    }
  }, [selectedTime, partySize]);

  // Reset chair selection when party size or time changes
  useEffect(() => {
    setSelectedChairs([]);
  }, [partySize, selectedTime]);

  // Handlers for interaction with the 3D layout
  const handleInteractionStart = useCallback(() => {
    setScrollEnabled(false);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    setScrollEnabled(true);
  }, []);

  // Handle chair selection from the 3D layout
  const handleChairSelection = useCallback((chairIds) => {
    if (chairIds) {
      setSelectedChairs(chairIds.split(","));
      console.log("Selected chairs in reserv flow:", chairIds.split(","));
    } else {
      setSelectedChairs([]);
    }
  }, []);

  // Generate a unique reservation ID
  const generateReservationId = () => {
    return Math.floor(Math.random() * 10000) + 1;
  };

  // Handle the reservation submission
  const handleReservePress = useCallback(() => {
    if (!selectedDate || !selectedTime) {
      Alert.alert(
        "Missing Information",
        "Please select a date and time for your reservation."
      );
      return;
    }

    // Validate chair selection if layout is shown
    if (showLayout && selectedChairs.length > 0) {
      if (selectedChairs.length < partySize) {
        Alert.alert(
          "Seat Selection Required",
          `Please select ${partySize} seats. You have selected ${selectedChairs.length}.`
        );
        return;
      }
    }

    const customerName = "Current User";
    const reservationDetails = {
      id: generateReservationId(),
      customerName,
      restaurant: restaurant,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      people: partySize,
      duration: duration,
      status: "confirmed",
      note: notes,
    };

    // Include chair information if chairs were selected
    if (selectedChairs.length > 0) {
      reservationDetails.chairs = selectedChairs;
    } else {
      reservationDetails.autoAssigned = true;
    }

    // Confirm the reservation
    Alert.alert(
      "Reservation Confirmed!",
      `Your reservation for ${partySize} ${
        partySize > 1 ? "people" : "person"
      } at ${selectedTime} on ${format(
        selectedDate,
        "EEE, MMM d"
      )} has been confirmed.${
        selectedChairs.length === 0
          ? "\n\nYour seats will be assigned upon arrival."
          : ""
      }`,
      [
        {
          text: "OK",
          onPress: () => onComplete && onComplete(reservationDetails),
        },
      ]
    );
  }, [
    selectedDate,
    selectedTime,
    partySize,
    duration,
    selectedChairs,
    showLayout,
    notes,
    restaurant,
    onComplete,
  ]);

  // Render availability legend
  const renderAvailabilityLegend = () => (
    <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 16 }}>
      <Styles.AvailabilityRow>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#4CAF50",
            marginRight: 4,
          }}
        />
        <Styles.AvailabilityText>High</Styles.AvailabilityText>
      </Styles.AvailabilityRow>
      <Styles.AvailabilityRow style={{ marginLeft: 12 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#FFC107",
            marginRight: 4,
          }}
        />
        <Styles.AvailabilityText>Limited</Styles.AvailabilityText>
      </Styles.AvailabilityRow>
      <Styles.AvailabilityRow style={{ marginLeft: 12 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#F44336",
            marginRight: 4,
          }}
        />
        <Styles.AvailabilityText>Few spots</Styles.AvailabilityText>
      </Styles.AvailabilityRow>
    </View>
  );

  return (
    <Styles.Container scrollEnabled={scrollEnabled}>
      <Styles.HeaderContainer>
        <CustomText variant="h4">Make a Reservation</CustomText>
      </Styles.HeaderContainer>

      {/* Date Selector */}
      <Styles.DateSelectorContainer>
        <Styles.SectionTitle>Date</Styles.SectionTitle>
        <Styles.DateItemsContainer>
          <FlatList
            ref={dateScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dateOptions}
            keyExtractor={(item, index) => `date-${index}`}
            renderItem={({ item }) => (
              <Styles.DateOption
                selected={isSameDay(selectedDate, item.date)}
                unavailable={item.isUnavailable}
                onPress={() =>
                  !item.isUnavailable && setSelectedDate(item.date)
                }
              >
                <Styles.DateText selected={isSameDay(selectedDate, item.date)}>
                  {item.label}
                </Styles.DateText>
                <Styles.WeekdayText
                  selected={isSameDay(selectedDate, item.date)}
                >
                  {item.weekday}
                </Styles.WeekdayText>
                {!item.isUnavailable && (
                  <Styles.AvailabilityIndicator
                    level={item.availability}
                    selected={isSameDay(selectedDate, item.date)}
                  />
                )}
              </Styles.DateOption>
            )}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
          />
        </Styles.DateItemsContainer>
      </Styles.DateSelectorContainer>

      {/* Party Size Selector */}
      <Styles.PartySelectorContainer>
        <Styles.SectionTitle>Party Size</Styles.SectionTitle>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Styles.PartyOptionsContainer>
            {partySizeOptions.map((size) => (
              <Styles.PartyOption
                key={`size-${size}`}
                selected={partySize === size}
                onPress={() => setPartySize(size)}
              >
                <Styles.PartyText selected={partySize === size}>
                  {size}
                </Styles.PartyText>
              </Styles.PartyOption>
            ))}
          </Styles.PartyOptionsContainer>
        </ScrollView>
      </Styles.PartySelectorContainer>

      {/* Time Selector */}
      <Styles.TimeContainer>
        <Styles.SectionTitle>Time</Styles.SectionTitle>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Styles.TimeOptionsContainer>
            {availableTimes.map((time, index) => {
              const hour = parseInt(time.split(":")[0]);
              let timeAvailability = "high";
              if (hour >= 18 && hour <= 20) {
                timeAvailability = "medium";
              } else if (hour === 21) {
                timeAvailability = "low";
              }
              return (
                <Styles.TimeOption
                  key={`time-${index}`}
                  selected={selectedTime === time}
                  availability={timeAvailability}
                  onPress={() => setSelectedTime(time)}
                >
                  <Styles.TimeText selected={selectedTime === time}>
                    {time}
                  </Styles.TimeText>
                  <Styles.TimeAvailabilityIndicator
                    level={timeAvailability}
                    selected={selectedTime === time}
                  />
                </Styles.TimeOption>
              );
            })}
          </Styles.TimeOptionsContainer>
        </ScrollView>
        {renderAvailabilityLegend()}
      </Styles.TimeContainer>

      <Separator type="full" />

      {/* Seat Selection Toggle */}
      <Styles.ToggleButton onPress={() => setShowLayout(!showLayout)}>
        <MaterialIcons
          name={showLayout ? "visibility-off" : "visibility"}
          size={24}
          color="#262626"
        />
        <Styles.ToggleText>
          {showLayout ? "Hide Seating Layout" : "Select Your Seats"}
        </Styles.ToggleText>
      </Styles.ToggleButton>

      {/* 3D Layout for Seat Selection */}
      {showLayout && (
        <Styles.LayoutContainer>
          <ReservationLayoutView
            onTableSelect={handleChairSelection}
            partySize={partySize}
            selectedTime={selectedTime}
            selectedDate={format(selectedDate, "yyyy-MM-dd")}
            onInteractionStart={handleInteractionStart}
            onInteractionEnd={handleInteractionEnd}
          />
        </Styles.LayoutContainer>
      )}

      {/* Special Requests */}
      <Styles.SectionTitle>Special Requests (Optional)</Styles.SectionTitle>
      <Styles.NotesInput
        multiline
        placeholder="Add any special requests or dietary requirements..."
        value={notes}
        onChangeText={setNotes}
        textAlignVertical="top"
      />

      {/* Reserve Button */}
      <Styles.ReserveButton onPress={handleReservePress}>
        <Styles.ReserveButtonText>Reserve Now</Styles.ReserveButtonText>
      </Styles.ReserveButton>

      <View style={{ height: 40 }} />
    </Styles.Container>
  );
};

export default ReservationFlow;
