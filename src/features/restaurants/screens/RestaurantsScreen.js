import React, { useContext, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "react-native";

import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { FadeInView } from "../../../components/FadeInView/FadeInView";
import { Spacer } from "../../../components/Spacer/Spacer";
import { Search } from "../components/Search";
import { RestaurantList } from "../components/RestaurantList.styles";
import { RestaurantInfoCard } from "../components/RestaurantInfoCard";

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const [isToggled, setIsToggled] = useState(false);

  const restaurants = [
    {
      name: "Sick Eats 1",
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      photos: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      ],
      address: "100 random sick avenue",
      isOpenNow: true,
      rating: 4,
      isClosedTemporarily: true,
      placeId: "1",
    },
    {
      name: "Sick Eats 2",
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      photos: ["https://images.unsplash.com/photo-1553621042-f6e147245754"],
      address: "101 random sick avenue",
      isOpenNow: false,
      rating: 5,
      isClosedTemporarily: false,
      placeId: "2",
    },
    {
      name: "Sick Eats 3",
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      photos: [
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      ],
      address: "102 random sick avenue",
      isOpenNow: true,
      rating: 3,
      isClosedTemporarily: false,
      placeId: "3",
    },
  ];
  return (
    <SafeArea>
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetailScreen", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
