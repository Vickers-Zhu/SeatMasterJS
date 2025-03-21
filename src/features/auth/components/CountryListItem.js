// src/features/auth/components/CountryListItem.js
import React from "react";
import {
  ListItemContainer,
  FlagText,
  CodeText,
} from "./CountryListItem.styles";
import { TouchableOpacity } from "react-native";

/**
 * Renders an individual country item in the dropdown list
 * @param {Object} item - Country object with flag, countryName, and code properties
 * @param {Function} onPress - Function to call when item is pressed
 */
const CountryListItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.6}>
    <ListItemContainer>
      <FlagText>{item.flag}</FlagText>
      <CodeText>{item.code}</CodeText>
    </ListItemContainer>
  </TouchableOpacity>
);

export default CountryListItem;
