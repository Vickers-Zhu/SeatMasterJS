// src/features/merchant/components/TimeScroll.js
import React, { useRef } from "react";
import styled from "styled-components/native";
import { Animated } from "react-native";

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const CONTAINER_WIDTH = 100; // Thinner component width
const PADDING_VERTICAL = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;

const Container = styled.View`
  height: ${CONTAINER_HEIGHT}px;
  width: ${CONTAINER_WIDTH}px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  overflow: hidden;
  border-radius: 8px;
`;

const StyledAnimatedItem = styled(Animated.View)`
  height: ${ITEM_HEIGHT}px;
  justify-content: center;
  align-items: center;
`;

const TimeText = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.body};
`;

export const TimeScroll = ({ times, selectedTime, onTimeChange }) => {
  // Animated value to track scrolling
  const scrollY = useRef(new Animated.Value(0)).current;

  // Determine which time is selected based on the scroll offset
  const handleMomentumScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (index >= 0 && index < times.length) {
      onTimeChange(times[index]);
    }
  };

  return (
    <Container>
      <Animated.ScrollView
        contentContainerStyle={{ paddingVertical: PADDING_VERTICAL }}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {times.map((time, index) => {
          // Define interpolation ranges for each item based on its ideal center position
          const inputRange = [
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
          ];

          // Scale interpolation (smaller away from center)
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: "clamp",
          });

          // Opacity interpolation (more transparent away from center)
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          // RotateX interpolation for a 3D twist effect
          const rotateX = scrollY.interpolate({
            inputRange,
            outputRange: ["30deg", "0deg", "-30deg"],
            extrapolate: "clamp",
          });

          return (
            <StyledAnimatedItem
              key={index}
              style={{
                transform: [{ perspective: 1000 }, { rotateX }, { scale }],
                opacity,
              }}
            >
              <TimeText>{time}</TimeText>
            </StyledAnimatedItem>
          );
        })}
      </Animated.ScrollView>
    </Container>
  );
};
