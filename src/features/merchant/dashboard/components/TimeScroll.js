// File: src/features/merchant/components/TimeScroll.js
import React, { useRef } from "react";
import styled from "styled-components/native";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const CONTAINER_WIDTH = 60;
const PADDING_VERTICAL = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;

const Container = styled.View`
  height: ${CONTAINER_HEIGHT}px;
  width: ${CONTAINER_WIDTH}px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  overflow: hidden;
  border-radius: 30px;
  position: relative;
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
  const scrollY = useRef(new Animated.Value(0)).current;

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
          const inputRange = [
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: "clamp",
          });

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

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
      {/* Top gradient overlay */}
      <LinearGradient
        colors={["rgba(241,241,241,1)", "rgba(241,241,241,0)"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 20,
        }}
        pointerEvents="none"
      />
      {/* Bottom gradient overlay */}
      <LinearGradient
        colors={["rgba(241,241,241,0)", "rgba(241,241,241,1)"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 20,
        }}
        pointerEvents="none"
      />
    </Container>
  );
};
