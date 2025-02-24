import React, { useState, useEffect, useRef } from "react";
import { Animated, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import SwitchContainer from "../../../../components/Switch/Switch";
import { Separator } from "../../../../components/Separator/Separator";

import { tableStatuses, seatingData } from "../../../../data/mockData";

import { TableMatrix } from "../components/TableMatrix";
import { TimeScroll } from "../components/TimeScroll";
import { SeatView } from "../components/SeatView";
import CounterSeats from "../components/CounterSeats";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: 16px;
  position: relative;
`;

const MatrixWrapper = styled.View`
  flex: 1;
  margin-top: 16px;
`;

const AnimatedTimeScrollContainer = Animated.createAnimatedComponent(
  styled.View`
    position: absolute;
    right: 16px;
    top: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
  `
);

export const MerchantHomeScreen = () => {
  const [times, setTimes] = useState(generateTimes(5));
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [isSeatMode, setIsSeatMode] = useState(false);
  const [tableStatusesState, setTableStatusesState] = useState(tableStatuses);
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  function generateTimes(count) {
    let timesArray = [];
    let current = new Date();
    current.setSeconds(0);
    current.setMilliseconds(0);
    for (let i = 0; i < count; i++) {
      const hours = current.getHours();
      const minutes = current.getMinutes();
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      timesArray.push(timeString);
      current.setHours(current.getHours() + 1);
    }
    return timesArray;
  }

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = generateTimes(5);
      setTimes(newTimes);
      setSelectedTime(newTimes[0]);
    };
    updateTimes();
    const interval = setInterval(updateTimes, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    console.log("Time changed to:", time);
  };

  const handleTablePress = (key, status) => {
    const newStatus = status === "empty" ? "occupied" : "empty";
    console.log(`Table ${key} changed from ${status} to ${newStatus}`);
    setTableStatusesState((prev) => ({
      ...prev,
      [key]: { ...prev[key], status: newStatus },
    }));
  };

  const onScrollBegin = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEnd = () => {
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Container>
      <SwitchContainer
        isOn={isSeatMode}
        setIsOn={setIsSeatMode}
        leftLabel="Tables"
        rightLabel="Seats"
        variant="default"
      />
      <MatrixWrapper>
        {isSeatMode ? (
          <Animated.ScrollView
            onScrollBeginDrag={onScrollBegin}
            onScrollEndDrag={onScrollEnd}
            scrollEventThrottle={16}
          >
            <SeatView
              seatingData={seatingData}
              tableStatuses={tableStatusesState}
            />
          </Animated.ScrollView>
        ) : (
          <>
            <TableMatrix
              tableStatuses={tableStatusesState}
              onTablePress={handleTablePress}
            />
            <Separator type="full" />
            <CounterSeats counterSeats={seatingData.counterSeats} />
          </>
        )}
      </MatrixWrapper>
      <AnimatedTimeScrollContainer style={{ opacity: overlayOpacity }}>
        <TimeScroll
          times={times}
          selectedTime={selectedTime}
          onTimeChange={handleTimeChange}
        />
      </AnimatedTimeScrollContainer>
    </Container>
  );
};
