// src/features/restaurants/screens/RestaurantDetailScreen.js
import React, { useState, useRef, useEffect } from "react";
import { Animated, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import { IconButton } from "react-native-paper";

import { CustomText } from "../../../../components/CustomText/CustomText";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import SwitchContainer from "../../../../components/Switch/Switch";
import WebApp from "../../../../components/WebApp/WebApp";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";

import { RestaurantInfoCard } from "../components/RestaurantInfoCard";
import RestaurantMenu from "../components/RestaurantMenu";
import Reviews from "../components/Reviews";
import Others from "../components/Others";
import TabNavigation from "../components/TabNavigation";
import useScrollHandler from "../hooks/useScrollHandler";
import useReservationHandler from "../hooks/useReservationHandler";

const Spacing = styled.View`
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Centers the title */
  padding: ${(props) => props.theme.space[2]};
  position: relative;
  background-color: ${(props) => props.theme.colors.bg.primary}; /* Optional */
`;

export const CloseButtonWrapper = styled.View`
  position: absolute;
  left: ${(props) => props.theme.space[2]};
`;

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant, openReservationView } = route.params;
  const layout = useRef(Dimensions.get("window")).current;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "menu", title: "Menu" },
    { key: "reviews", title: "Reviews" },
    { key: "others", title: "Others" },
  ]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const [heights, setHeights] = useState({
    restaurantInfoCard: 0,
    switch: 0,
    content: {},
  });

  useEffect(() => {
    if (openReservationView) {
      animateAndSwitch(true);
    }
  }, [openReservationView]);

  const { isReservation, isShowReservationContent, opacity, animateAndSwitch } =
    useReservationHandler();

  const [scrollEnabled, setScrollEnabled] = useState(true); // State to control ScrollView's scroll

  const handleScroll = useScrollHandler(routes, heights, setIndex);

  const scrollToTab = (tabKey, newIndex) => {
    let yPosition = heights.restaurantInfoCard + heights.switch;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].key === tabKey) break;
      yPosition += heights.content[routes[i].key] || 0;
    }
    scrollViewRef.current.scrollTo({ y: yPosition, animated: true });
    setIndex(newIndex);
  };

  // Callback when interaction starts
  const handleInteractionStart = () => {
    setScrollEnabled(false);
  };

  // Callback when interaction ends
  const handleInteractionEnd = () => {
    setScrollEnabled(true);
  };

  return (
    <SafeArea>
      <Header>
        {/* Close Button */}
        <CloseButtonWrapper>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Close"
          />
        </CloseButtonWrapper>

        {/* Centered Title */}
        <CustomText variant="title">RestaurantDetail</CustomText>
      </Header>
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          scrollEnabled={scrollEnabled}
          ref={scrollViewRef}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { listener: handleScroll, useNativeDriver: false }
          )}
          stickyHeaderIndices={isReservation ? [] : [2]}
        >
          <Spacing
            onLayout={(event) =>
              setHeights({
                ...heights,
                restaurantInfoCard: event.nativeEvent.layout.height,
              })
            }
          >
            <RestaurantInfoCard restaurant={restaurant} elevation={0} />
          </Spacing>

          <View
            onLayout={(event) =>
              setHeights({
                ...heights,
                switch: event.nativeEvent.layout.height,
              })
            }
          >
            <SwitchContainer
              isOn={isReservation}
              setIsOn={(newValue) => animateAndSwitch(newValue)}
              leftLabel="General"
              rightLabel="Reservation"
              variant="default"
            />
          </View>

          {!isShowReservationContent && !isReservation && (
            <TabNavigation
              index={index}
              setIndex={setIndex}
              routes={routes}
              layout={layout}
              renderOpacity={opacity}
              scrollToTab={scrollToTab}
              heights={heights}
            />
          )}

          {!isShowReservationContent &&
            !isReservation &&
            routes.map((route) => (
              <Animated.View key={route.key} style={{ opacity }}>
                <View
                  onLayout={(event) =>
                    setHeights({
                      ...heights,
                      content: {
                        ...heights.content,
                        [route.key]: event.nativeEvent.layout.height,
                      },
                    })
                  }
                >
                  {React.createElement(
                    route.key === "menu"
                      ? RestaurantMenu
                      : route.key === "reviews"
                      ? Reviews
                      : Others
                  )}
                </View>
              </Animated.View>
            ))}

          {isShowReservationContent && isReservation && (
            <Animated.View style={{ opacity, flex: 1 }}>
              <ErrorBoundary>
                <WebApp
                  onInteractionStart={handleInteractionStart}
                  onInteractionEnd={handleInteractionEnd}
                />
              </ErrorBoundary>
            </Animated.View>
          )}
        </Animated.ScrollView>
      </View>
    </SafeArea>
  );
};

export { RestaurantDetailScreen };
