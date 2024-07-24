import React, { useState, useRef } from "react";
import { Animated, Dimensions, View, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import styled from 'styled-components/native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { RestaurantInfoCard } from '../components/RestaurantInfoCard';
import RestaurantMenu from '../components/RestaurantMenu';
import Reviews from '../components/Reviews';
import Others from '../components/Others';

const Spacing = styled.View`
  padding-vertical: 10px;
`;

const CustomTabBar = styled(TabBar).attrs((props) => ({
  indicatorStyle: {
    backgroundColor: props.theme.colors.text.primary,
  },
  labelStyle: {
    color: props.theme.colors.text.primary,
  },
}))`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const renderSceneMap = {
  menu: RestaurantMenu,
  reviews: Reviews,
  others: Others,
};

export const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const layout = useRef(Dimensions.get('window')).current;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'menu', title: 'Menu' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'others', title: 'Others' },
  ]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const [heights, setHeights] = useState({
    restaurantInfoCard: 0,
    content: {}
  });

  const scrollToTab = (tabKey, newIndex) => {
    let yPosition = heights.restaurantInfoCard;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].key === tabKey) break;
      yPosition += heights.content[routes[i].key] || 0;
    }
    scrollViewRef.current.scrollTo({ y: yPosition, animated: true });
    setIndex(newIndex);
  };

  const handleScroll = event => {
    const scrollYValue = event.nativeEvent.contentOffset.y;
    let accumulatedHeight = heights.restaurantInfoCard;
    for (let i = 0; i < routes.length; i++) {
      if (scrollYValue < accumulatedHeight + (heights.content[routes[i].key] || 0) / 2) {
        setIndex(i);
        break;
      }
      accumulatedHeight += heights.content[routes[i].key] || 0;
    }
  };

  const renderTabBar = props => (
    <CustomTabBar
      {...props}
      onTabPress={({ route, preventDefault }) => {
        preventDefault();
        const tabIndex = routes.findIndex(r => r.key === route.key);
        scrollToTab(route.key, tabIndex);
      }}
    />
  );

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { listener: handleScroll, useNativeDriver: false }
          )}
          stickyHeaderIndices={[1]} // Sticky indices for TabBar
        >
          <Spacing
            onLayout={(event) =>
              setHeights({ ...heights, restaurantInfoCard: event.nativeEvent.layout.height })
            }
          >
            <RestaurantInfoCard restaurant={restaurant} />
          </Spacing>
          <View>
            <TabView
              navigationState={{ index, routes }}
              renderScene={SceneMap(renderSceneMap)}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
            />
          </View>
          {routes.map(route => (
            <View
              key={route.key}
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
          ))}
        </Animated.ScrollView>
      </View>
    </SafeArea>
  );
};