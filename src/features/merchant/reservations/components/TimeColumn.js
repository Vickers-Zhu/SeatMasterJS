// src/features/merchant/reservations/components/TimeColumn.js
import React from "react";
import { ScrollView, View } from "react-native";
import { CustomText } from "../../../../components/CustomText/CustomText";
import {
  FixedLeftColumn,
  TimeColumnHeader,
  TimeColumn as StyledTimeColumn,
  TimeSlot,
  TimeText,
  ExpandAllButton,
  ExpandAllButtonText,
} from "./MerchantReservation.styles";

const TimeColumn = ({
  timeSlots,
  scrollRef,
  onScroll,
  areAllExpanded,
  toggleAllTables,
  currentTimePosition,
}) => {
  return (
    <FixedLeftColumn>
      {/* Scrollable time slots */}
      <ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <StyledTimeColumn>
          {timeSlots.map((time) => (
            <TimeSlot key={time}>
              <TimeText>{time}</TimeText>
            </TimeSlot>
          ))}
        </StyledTimeColumn>

        {/* Current time indicator for time column */}
        {currentTimePosition > 0 && (
          <View
            style={{
              position: "absolute",
              right: 0,
              top: currentTimePosition,
              width: 4,
              height: 10,
              backgroundColor: "#ff3b30",
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          />
        )}
      </ScrollView>
    </FixedLeftColumn>
  );
};

export default TimeColumn;
