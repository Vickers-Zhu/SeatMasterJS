// src/features/customer/restaurants/screens/RestaurantDetailScreen.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Animated,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import styled from "styled-components/native";

import { CustomText } from "../../../../components/CustomText/CustomText";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import SwitchContainer from "../../../../components/Switch/Switch";
import WebApp from "../../../../components/WebApp/WebApp";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";
import { BackButton } from "../../../../components/BackButton/BackButton";

import { RestaurantInfoCard } from "../components/RestaurantInfoCard";
import RestaurantMenu from "../components/RestaurantMenu";
import Reviews from "../components/Reviews";
import Others from "../components/Others";
import TabNavigation from "../components/TabNavigation";
import useScrollHandler from "../hooks/useScrollHandler";
import useReservationHandler from "../hooks/useReservationHandler";
import { sampleRestaurantData } from "../../../../data/mockEditRestaurantData";
import { EditButton } from "../../../merchant/settings/components/EditButton";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  position: relative;
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const Spacing = styled.View`
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const formatAddressToString = (address) => {
  if (!address) return "";
  const { street, city, state, postalCode, country } = address;
  const parts = [street, city, state, postalCode, country].filter(Boolean);
  return parts.join(", ");
};

export const RestaurantDetailScreen = ({ route, navigation }) => {
  // Get restaurant data from route params or use default
  const initialRestaurant = route.params?.restaurant || {};
  const [restaurant, setRestaurant] = useState(initialRestaurant);
  const isMerchantView = route.params?.isMerchantView || false;

  // Handle null or undefined restaurant properties safely
  useEffect(() => {
    // Ensure restaurant has all necessary properties to avoid rendering errors
    if (!restaurant.address) {
      setRestaurant((prev) => ({
        ...prev,
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
        },
      }));
    }
  }, []);

  // Update restaurant if coming back from edit screen
  useEffect(() => {
    if (route.params?.updatedRestaurant) {
      setRestaurant(route.params.updatedRestaurant);
    }
  }, [route.params?.updatedRestaurant]);

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

  const { isReservation, isShowReservationContent, opacity, animateAndSwitch } =
    useReservationHandler();

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleScroll = useScrollHandler(routes, heights, setIndex);

  const scrollToTab = useCallback(
    (tabKey, newIndex) => {
      // Calculate the position to scroll to
      let yPosition = heights.restaurantInfoCard + heights.switch;

      // Add heights of all tabs before the target tab
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].key === tabKey) break;
        yPosition += heights.content[routes[i].key] || 0;
      }

      // Use scrollTo with immediate={true} for instant scrolling
      scrollViewRef.current?.scrollTo({
        y: yPosition,
        animated: false, // Set to false for immediate scrolling without animation
      });

      // Update the index immediately
      setIndex(newIndex);
    },
    [heights, routes]
  );
  const handleInteractionStart = () => {
    setScrollEnabled(false);
  };

  const handleInteractionEnd = () => {
    setScrollEnabled(true);
  };

  const handleEditPress = () => {
    navigation.navigate("RestaurantEdit", {
      restaurant: restaurant,
    });
  };

  return (
    <SafeArea>
      <Header>
        <BackButton />
        <CustomText variant="title">
          {isMerchantView ? "Restaurant Details" : "Restaurant"}
        </CustomText>

        {isMerchantView && (
          <EditButton position="absolute" onPress={handleEditPress} />
        )}
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
            <RestaurantInfoCard
              restaurant={{
                ...restaurant,
                address: formatAddressToString(restaurant.address),
                icon:
                  restaurant.icon ||
                  "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                isOpenNow:
                  restaurant.isOpenNow !== undefined
                    ? restaurant.isOpenNow
                    : true,
                rating: restaurant.rating || 4,
                isClosedTemporarily: restaurant.isClosedTemporarily || false,
                placeId: restaurant.id || restaurant.placeId || "1",
              }}
              elevation={0}
            />
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
