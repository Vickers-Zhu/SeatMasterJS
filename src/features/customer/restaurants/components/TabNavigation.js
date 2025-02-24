// src/features/restaurants/components/TabNavigation.js
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
  return (
    <Animated.View style={{ opacity: renderOpacity }}>
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
  );
};

export default TabNavigation;
