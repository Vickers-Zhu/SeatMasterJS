// src/features/restaurants/hooks/useReservationHandler.js
import { useState } from "react";
import { Animated } from "react-native";

const useReservationHandler = () => {
  const [isReservation, setIsReservation] = useState(false);
  const [isShowReservationContent, setIsShowReservationContent] =
    useState(false);
  const [opacity] = useState(new Animated.Value(1));

  const animateAndSwitch = (newIsReservation) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsReservation(newIsReservation);
      setTimeout(() => {
        setIsShowReservationContent(newIsReservation);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }, 200);
    });
  };

  return {
    isReservation,
    isShowReservationContent,
    opacity,
    animateAndSwitch,
  };
};

export default useReservationHandler;
