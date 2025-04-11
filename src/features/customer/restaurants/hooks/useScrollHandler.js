// src/features/restaurants/hooks/useScrollHandler.js
import { useState, useCallback } from "react";

const useScrollHandler = (routes, heights, setIndex) => {
  const handleScroll = useCallback(
    (event) => {
      const scrollYValue = event.nativeEvent.contentOffset.y;
      let accumulatedHeight =
        heights.restaurantInfoCard + heights.ReservationButton + heights.switch;
      for (let i = 0; i < routes.length; i++) {
        if (
          scrollYValue <
          accumulatedHeight + (heights.content[routes[i].key] || 0) / 2
        ) {
          setIndex(i);
          break;
        }
        accumulatedHeight += heights.content[routes[i].key] || 0;
      }
    },
    [routes, heights, setIndex]
  );

  return handleScroll;
};

export default useScrollHandler;
