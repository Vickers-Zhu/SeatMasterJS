// src/features/merchant/reservations/components/CurrentTimeIndicator.js
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { calculateCurrentTimePosition } from "../utils/reservationUtils";
import {
  CurrentTimeLine,
  CurrentTimeIndicator as TimeIndicator,
} from "./MerchantReservation.styles";

const CurrentTimeIndicator = ({ timeSlotHeight }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const updateTimePosition = () => {
      const newPosition = calculateCurrentTimePosition(timeSlotHeight);
      setPosition(newPosition);
    };

    // Calculate initially
    updateTimePosition();

    // Update every minute
    const interval = setInterval(updateTimePosition, 60000);

    return () => clearInterval(interval);
  }, [timeSlotHeight]);

  // Don't render if position is negative (outside business hours)
  if (position < 0) return null;

  return (
    <>
      <CurrentTimeLine style={{ top: position }}>
        <TimeIndicator />
      </CurrentTimeLine>

      {/* Small indicator for the time column */}
      <View
        style={{
          position: "absolute",
          left: 0,
          top: position,
          width: 4,
          height: 10,
          backgroundColor: "#ff3b30",
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          zIndex: 20,
        }}
      />
    </>
  );
};

export default CurrentTimeIndicator;
