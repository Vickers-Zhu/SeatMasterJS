import React from "react";
import {
  ListItemContainer,
  CountryInfoContainer,
  FlagText,
  CountryNameText,
  CodeText,
} from "./CountryListItem.styles";
import { TouchableOpacity } from "react-native";

const CountryListItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.6}>
    <ListItemContainer>
      <CountryInfoContainer>
        <FlagText>{item.flag}</FlagText>
        <CountryNameText>{item.countryName}</CountryNameText>
      </CountryInfoContainer>
      <CodeText>{item.code}</CodeText>
    </ListItemContainer>
  </TouchableOpacity>
);

export default CountryListItem;
