// src/features/customer/reservations/screens/ReservationFlow.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  format,
  addDays,
  addMonths,
  isSameDay,
  isWeekend,
  getDay,
} from "date-fns";
import { CustomText } from "../../../../components/CustomText/CustomText";
import WebApp from "../../../../components/WebApp/WebApp";
import ReservationLayoutView from "../components/ReservationLayoutView";
import { TimeScroll } from "../../../../components/TimeScroll/TimeScroll";
import { Separator } from "../../../../components/Separator/Separator";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { generateTimeSlots } from "../../../merchant/reservations/utils/timeUtils";

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

// Enhanced Date Selector
const DateSelectorContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

const DateItemsContainer = styled.View`
  margin-vertical: ${(props) => props.theme.space[2]};
`;

const DateOption = styled(TouchableOpacity)`
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[2]};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  border-radius: 20px;
  min-width: 80px;
  align-items: center;
  ${(props) =>
    props.unavailable &&
    `
    opacity: 0.5;
  `}
  elevation: ${(props) => (props.selected ? 3 : 0)};
  shadow-opacity: ${(props) => (props.selected ? 0.2 : 0)};
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const DateText = styled(CustomText)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fontWeights.bold
      : props.theme.fontWeights.regular};
`;

const WeekdayText = styled(CustomText)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  margin-top: 2px;
`;

const AvailabilityIndicator = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-top: 2px;
  background-color: ${(props) => {
    if (props.selected) return props.theme.colors.text.inverse;
    switch (props.level) {
      case "high":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "low":
        return "#F44336";
      default:
        return "#BDBDBD";
    }
  }};
`;

// Enhanced Party Size Selector
const PartySelectorContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

const PartyOptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.space[2]};
`;

const PartyOption = styled(TouchableOpacity)`
  min-width: 50px;
  height: 50px;
  margin-right: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  elevation: ${(props) => (props.selected ? 3 : 0)};
  shadow-opacity: ${(props) => (props.selected ? 0.2 : 0)};
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const PartyText = styled(CustomText)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fontWeights.bold
      : props.theme.fontWeights.regular};
`;

// Enhanced Time Selector
const TimeContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

const TimeOptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.space[2]};
`;

const TimeOption = styled(TouchableOpacity)`
  min-width: 80px;
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.availability === "low" &&
    `
    border: 1px solid #F44336;
  `}
  ${(props) =>
    props.availability === "medium" &&
    `
    border: 1px solid #FFC107;
  `}
  elevation: ${(props) => (props.selected ? 3 : 0)};
  shadow-opacity: ${(props) => (props.selected ? 0.2 : 0)};
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const TimeText = styled(CustomText)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fontWeights.bold
      : props.theme.fontWeights.regular};
`;

const TimeAvailabilityIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-top: 4px;
  background-color: ${(props) => {
    if (props.selected) return props.theme.colors.text.inverse;
    switch (props.level) {
      case "high":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "low":
        return "#F44336";
      default:
        return "#BDBDBD";
    }
  }};
`;

const AvailabilityRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${(props) => props.theme.space[2]};
`;

const AvailabilityText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-left: ${(props) => props.theme.space[1]};
`;

const ToggleButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.space[2]};
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const ToggleText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  margin-left: ${(props) => props.theme.space[2]};
`;

const LayoutContainer = styled.View`
  min-height: 250px;
  margin-bottom: ${(props) => props.theme.space[3]};
  border-radius: 12px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const NotesInput = styled.TextInput`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 12px;
  margin-bottom: ${(props) => props.theme.space[3]};
  min-height: 100px;
  color: ${(props) => props.theme.colors.text.primary};
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const ReserveButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.ui.primary};
  padding: ${(props) => props.theme.space[3]};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space[4]};
  elevation: 3;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const ReserveButtonText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const SectionTitle = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

// Helper for determining day availability (would come from restaurant settings)
const getDayAvailability = (date) => {
  const day = getDay(date); // 0 = Sunday, 6 = Saturday

  // Example: Lower availability on weekends
  if (day === 0 || day === 6) return "medium";

  // Example: No availability on Mondays (day === 1)
  if (day === 1) return "unavailable";

  return "high";
};

// Get weekday name
const getWeekdayName = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[getDay(date)];
};

const ReservationFlow = ({ restaurant, onComplete }) => {
  // Reference for date selection horizontal scroll
  const dateScrollRef = useRef(null);

  // State variables
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [partySize, setPartySize] = useState(2);
  const [allTimeSlots, setAllTimeSlots] = useState(generateTimeSlots());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showLayout, setShowLayout] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [notes, setNotes] = useState("");
  const [availability, setAvailability] = useState("high");
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // Generate dates for selection (up to 2 months)
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    // Generate dates for the next 2 months
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
  };

  // Generate party size options (1-20 default, can be customized by restaurant)
  const generatePartySizeOptions = () => {
    // Default max party size
    const maxPartySize = restaurant?.settings?.maxReservationSize || 20;

    const sizes = [];
    for (let i = 1; i <= maxPartySize; i++) {
      sizes.push(i);
    }
    return sizes;
  };

  const [dateOptions] = useState(generateDates);
  const [partySizeOptions] = useState(generatePartySizeOptions);

  // Filter available time slots based on day and party size
  useEffect(() => {
    // In a real app, this would be based on restaurant settings and availability
    const allSlots = generateTimeSlots();

    // Filter times based on day of week
    const dayOfWeek = getDay(selectedDate);

    let filteredTimes = allSlots;

    // Example: Weekend has different hours
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      filteredTimes = allSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 10 && hour <= 22;
      });
    } else {
      filteredTimes = allSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 11 && hour <= 21;
      });
    }

    setAvailableTimes(filteredTimes);

    // Select a default time (middle of the day)
    if (!selectedTime || !filteredTimes.includes(selectedTime)) {
      const defaultTimeIndex = Math.floor(filteredTimes.length / 2);
      setSelectedTime(filteredTimes[defaultTimeIndex]);
    }
  }, [selectedDate]);

  // Calculate availability based on time and party size
  useEffect(() => {
    // In a real app, this would make an API call to check availability
    if (!selectedTime) return;

    const timeIndex = availableTimes.indexOf(selectedTime);
    const hour = parseInt(selectedTime.split(":")[0]);

    // Example logic for availability calculation
    if (partySize > 10) {
      setAvailability("low");
    } else if ((hour >= 18 && hour <= 20) || partySize > 6) {
      setAvailability("medium");
    } else {
      setAvailability("high");
    }
  }, [selectedTime, partySize, availableTimes]);

  const handleInteractionStart = () => {
    setScrollEnabled(false);
  };

  const handleInteractionEnd = () => {
    setScrollEnabled(true);
  };

  // Handle reservation submission
  const handleReservePress = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert(
        "Missing Information",
        "Please select a date and time for your reservation."
      );
      return;
    }

    // In a real app, this would make an API call to create the reservation
    const reservationDetails = {
      restaurant: restaurant.name,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      partySize: partySize,
      tableId: selectedTable || "Not specified",
      notes: notes,
      status: "Confirmed",
    };

    Alert.alert(
      "Reservation Confirmed!",
      `Your reservation for ${partySize} ${
        partySize > 1 ? "people" : "person"
      } at ${selectedTime} on ${format(
        selectedDate,
        "EEE, MMM d"
      )} has been confirmed.`,
      [
        {
          text: "OK",
          onPress: () => onComplete && onComplete(reservationDetails),
        },
      ]
    );
  };

  const handleTableSelection = (tableId) => {
    setSelectedTable(tableId);
  };

  // Get availability color indicator
  const getAvailabilityColor = (level) => {
    switch (level) {
      case "high":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "low":
        return "#F44336";
      default:
        return "#BDBDBD";
    }
  };

  const renderAvailabilityLegend = () => {
    return (
      <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 16 }}>
        <AvailabilityRow>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#4CAF50",
              marginRight: 4,
            }}
          />
          <AvailabilityText>High</AvailabilityText>
        </AvailabilityRow>
        <AvailabilityRow style={{ marginLeft: 12 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#FFC107",
              marginRight: 4,
            }}
          />
          <AvailabilityText>Limited</AvailabilityText>
        </AvailabilityRow>
        <AvailabilityRow style={{ marginLeft: 12 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#F44336",
              marginRight: 4,
            }}
          />
          <AvailabilityText>Few spots</AvailabilityText>
        </AvailabilityRow>
      </View>
    );
  };

  return (
    <Container scrollEnabled={scrollEnabled}>
      <HeaderContainer>
        <CustomText variant="h4">Make a Reservation</CustomText>
      </HeaderContainer>

      {/* Date Selection */}
      <DateSelectorContainer>
        <SectionTitle>Date</SectionTitle>
        <DateItemsContainer>
          <FlatList
            ref={dateScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dateOptions}
            keyExtractor={(item, index) => `date-${index}`}
            renderItem={({ item }) => (
              <DateOption
                selected={isSameDay(selectedDate, item.date)}
                unavailable={item.isUnavailable}
                onPress={() =>
                  !item.isUnavailable && setSelectedDate(item.date)
                }
              >
                <DateText selected={isSameDay(selectedDate, item.date)}>
                  {item.label}
                </DateText>
                <WeekdayText selected={isSameDay(selectedDate, item.date)}>
                  {item.weekday}
                </WeekdayText>
                {!item.isUnavailable && (
                  <AvailabilityIndicator
                    level={item.availability}
                    selected={isSameDay(selectedDate, item.date)}
                  />
                )}
              </DateOption>
            )}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
          />
        </DateItemsContainer>
      </DateSelectorContainer>

      {/* Party Size Selection */}
      <PartySelectorContainer>
        <SectionTitle>Party Size</SectionTitle>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <PartyOptionsContainer>
            {partySizeOptions.map((size) => (
              <PartyOption
                key={`size-${size}`}
                selected={partySize === size}
                onPress={() => setPartySize(size)}
              >
                <PartyText selected={partySize === size}>{size}</PartyText>
              </PartyOption>
            ))}
          </PartyOptionsContainer>
        </ScrollView>
      </PartySelectorContainer>

      {/* Time Selection */}
      <TimeContainer>
        <SectionTitle>Time</SectionTitle>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TimeOptionsContainer>
            {availableTimes.map((time, index) => {
              // Calculate availability per time slot (would be from API in real app)
              const hour = parseInt(time.split(":")[0]);
              let timeAvailability = "high";

              if (hour >= 18 && hour <= 20) {
                timeAvailability = "medium";
              } else if (hour === 21) {
                timeAvailability = "low";
              }

              return (
                <TimeOption
                  key={`time-${index}`}
                  selected={selectedTime === time}
                  availability={timeAvailability}
                  onPress={() => setSelectedTime(time)}
                >
                  <TimeText selected={selectedTime === time}>{time}</TimeText>
                  <TimeAvailabilityIndicator
                    level={timeAvailability}
                    selected={selectedTime === time}
                  />
                </TimeOption>
              );
            })}
          </TimeOptionsContainer>
        </ScrollView>

        {renderAvailabilityLegend()}
      </TimeContainer>

      <Separator type="full" />

      {/* Toggle restaurant layout view */}
      <ToggleButton onPress={() => setShowLayout(!showLayout)}>
        <MaterialIcons
          name={showLayout ? "visibility-off" : "visibility"}
          size={24}
          color="#262626"
        />
        <ToggleText>
          {showLayout ? "Hide Restaurant Layout" : "Preview Your Table"}
        </ToggleText>
      </ToggleButton>

      {showLayout && (
        <LayoutContainer>
          <ReservationLayoutView
            onTableSelect={handleTableSelection}
            partySize={partySize}
            selectedTime={selectedTime}
            selectedDate={format(selectedDate, "yyyy-MM-dd")}
            onInteractionStart={handleInteractionStart}
            onInteractionEnd={handleInteractionEnd}
          />
        </LayoutContainer>
      )}

      {/* Special requests section */}
      <SectionTitle>Special Requests (Optional)</SectionTitle>
      <NotesInput
        multiline
        placeholder="Add any special requests or dietary requirements..."
        value={notes}
        onChangeText={setNotes}
        textAlignVertical="top"
      />

      {/* Reserve button */}
      <ReserveButton onPress={handleReservePress}>
        <ReserveButtonText>Reserve Now</ReserveButtonText>
      </ReserveButton>

      {/* Bottom spacing */}
      <View style={{ height: 40 }} />
    </Container>
  );
};

export default ReservationFlow;
