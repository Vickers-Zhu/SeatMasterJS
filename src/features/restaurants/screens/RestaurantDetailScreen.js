import React, { useState, useRef, useEffect } from "react";
import { Animated, Dimensions, View, Text } from "react-native";
import styled from "styled-components/native";
import { TabView, SceneMap } from "react-native-tab-view";

import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { RestaurantInfoCard } from "../components/RestaurantInfoCard";
import RestaurantMenu from "../components/RestaurantMenu";
import Reviews from "../components/Reviews";
import Others from "../components/Others";
import TabBar from "../components/RestaurantTabBar";
import SwitchContainer from "../../../components/Switch/Switch";
import WebApp from "../../../components/WebApp/WebApp";
import ErrorBoundary from "../../../components/ErrorBoundary/ErrorBoundary";

const Spacing = styled.View`
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const renderSceneMap = {
  menu: RestaurantMenu,
  reviews: Reviews,
  others: Others,
};

export const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
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

  const [isReservation, setIsReservation] = useState(false);
  const [isShowReservationContent, setIsShowReservationContent] =
    useState(false);
  const [opacity] = useState(new Animated.Value(1));
  const [scrollEnabled, setScrollEnabled] = useState(true); // State to control ScrollView's scroll

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
      }, 200); // Ensure the transition happens after the fade-out animation
    });
  };

  const scrollToTab = (tabKey, newIndex) => {
    let yPosition = heights.restaurantInfoCard + heights.switch;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].key === tabKey) break;
      yPosition += heights.content[routes[i].key] || 0;
    }
    scrollViewRef.current.scrollTo({ y: yPosition, animated: true });
    setIndex(newIndex);
  };

  const handleScroll = (event) => {
    const scrollYValue = event.nativeEvent.contentOffset.y;
    let accumulatedHeight = heights.restaurantInfoCard + heights.switch;
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
              isReservation={isReservation}
              setIsReservation={(newValue) => animateAndSwitch(newValue)}
            />
          </View>
          {!isShowReservationContent && !isReservation && (
            <Animated.View style={{ opacity }}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap(renderSceneMap)}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    routes={routes}
                    scrollToTab={scrollToTab}
                    setIndex={setIndex}
                  />
                )}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
              />
            </Animated.View>
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
                  {React.createElement(renderSceneMap[route.key])}
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
            // <View style={{ flex: 1 }}>
            //   <Text>Reservation</Text>
            //   {/* <WebApp /> */}
            // </View>
          )}
        </Animated.ScrollView>
      </View>
    </SafeArea>
  );
};
