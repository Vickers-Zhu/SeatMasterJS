// src/features/customer/restaurants/components/RestaurantTabBar.js
import React, { useRef, useEffect, useCallback, useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";

const TabBar = (props) => {
  const { routes, navigationState, scrollToTab, setIndex } = props;
  const theme = useTheme();

  // Animation value for indicator position
  const indicatorPosition = useRef(
    new Animated.Value(navigationState.index * (100 / routes.length))
  ).current;

  // Track animation progress to determine active state
  const [animationProgress, setAnimationProgress] = useState(
    navigationState.index
  );

  // Keep track of the indicator animation
  const animationRef = useRef(null);

  // Update indicator position when navigation state changes
  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = Animated.timing(indicatorPosition, {
      toValue: navigationState.index * (100 / routes.length),
      duration: 100,
      useNativeDriver: false,
    });

    animationRef.current.start();

    // Setup listener to track animation progress for active state
    const listenerId = indicatorPosition.addListener(({ value }) => {
      // Convert position to index by dividing by segment length
      const currentSegmentValue = value / (100 / routes.length);
      // Round to get closest index - this determines which tab appears active
      const closestIndex = Math.round(currentSegmentValue);
      if (closestIndex !== animationProgress) {
        setAnimationProgress(closestIndex);
      }
    });

    return () => {
      indicatorPosition.removeListener(listenerId);
    };
  }, [navigationState.index, routes.length, indicatorPosition]);

  // Handle tab press
  const handleTabPress = useCallback(
    (route, index) => {
      if (navigationState.index !== index && scrollToTab) {
        // Call scrollToTab but don't update index directly
        scrollToTab(route.key, index);
      }
    },
    [scrollToTab, navigationState.index]
  );

  return (
    <View style={[styles.tabBar, { backgroundColor: theme.colors.bg.primary }]}>
      {routes.map((route, i) => {
        // Tab is only visually active when indicator has arrived at this position
        const isActive = animationProgress === i;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => handleTabPress(route, i)}
            activeOpacity={0.7}
          >
            <Animated.Text
              style={{
                color: isActive
                  ? theme.colors.text.primary
                  : theme.colors.text.secondary,
                fontFamily: theme.fonts.body,
                fontSize: parseInt(theme.fontSizes.body, 10),
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}

      {/* Animated indicator bar */}
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: theme.colors.text.primary,
            left: indicatorPosition.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            width: `${100 / routes.length}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 48,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    position: "relative",
    backgroundColor: "white",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    borderRadius: 1,
  },
});

export default TabBar;
