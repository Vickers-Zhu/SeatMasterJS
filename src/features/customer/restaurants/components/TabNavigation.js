// src/features/customer/restaurants/components/TabNavigation.js

import React from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { Animated } from "react-native";
import RestaurantMenu from "./RestaurantMenu";
import Reviews from "./Reviews";
import Others from "./Others";
import TabBar from "./RestaurantTabBar";

const renderSceneMap = {
  menu: RestaurantMenu,
  reviews: Reviews,
  others: Others,
};

const TabNavigation = ({
  index,
  setIndex,
  routes,
  layout,
  renderOpacity,
  scrollToTab,
  heights,
}) => {
  const renderScene = SceneMap(renderSceneMap);

  const handleIndexChange = (newIndex) => {
    // When TabView itself triggers an index change (via swipe),
    // we need to sync with scrollToTab to keep everything aligned
    if (scrollToTab && routes[newIndex]) {
      scrollToTab(routes[newIndex].key, newIndex);
    }
  };

  return (
    <Animated.View style={{ opacity: renderOpacity }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            routes={routes}
            scrollToTab={scrollToTab}
            setIndex={setIndex}
          />
        )}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        swipeEnabled={true}
      />
    </Animated.View>
  );
};

export default TabNavigation;
