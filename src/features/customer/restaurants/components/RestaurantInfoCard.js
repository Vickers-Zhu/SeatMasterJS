import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

import { Spacer } from "../../../../components/Spacer/Spacer";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { Favourite } from "../../../../components/Favourite/Favourite";

import star from "../../../../../assets/icons/star";
import open from "../../../../../assets/icons/open";

import {
  RestaurantCard,
  RestaurantCardCover,
  Address,
  Info,
  Section,
  Rating,
  OperationStatus,
  Icon,
} from "./RestaurantInfoCard.styles";

export const RestaurantInfoCard = ({ restaurant = {}, elevation = 5 }) => {
  const {
    name = "Sick Eats",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ],
    address = "100 random sick avenue",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;
  const ratingArray = Array.from(new Array(Math.floor(rating)));
  return (
    <RestaurantCard elevation={elevation}>
      <View>
        <Favourite restaurant={restaurant} />
        <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      </View>
      <Info>
        <CustomText variant="label">{name}</CustomText>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <OperationStatus>
            {isClosedTemporarily && (
              <CustomText variant="error">CLOSED TEMPORARILY</CustomText>
            )}
            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </OperationStatus>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
