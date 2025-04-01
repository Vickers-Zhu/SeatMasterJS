// src/components/BackButton/BackButton.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const ButtonWrapper = styled.View`
  position: ${(props) => props.position || "absolute"};
  left: ${(props) => props.theme.space[2]};
  top: ${(props) => props.top || "auto"};
  z-index: 10;
`;

/**
 * A reusable back button component that navigates to the previous screen
 *
 * @param {Object} props - Component props
 * @param {Function} props.onPress - Optional custom onPress function
 * @param {string} props.position - Optional position style, defaults to "absolute"
 * @param {string} props.top - Optional top position, defaults to "auto"
 * @param {number} props.size - Optional icon size, defaults to 24
 * @param {string} props.color - Optional icon color, defaults to "#262626"
 * @returns {React.Component} BackButton component
 */
export const BackButton = ({
  onPress,
  position,
  top,
  size = 24,
  color = "#262626",
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <ButtonWrapper position={position} top={top}>
      <TouchableOpacity onPress={handlePress}>
        <MaterialIcons name="arrow-back" size={size} color={color} />
      </TouchableOpacity>
    </ButtonWrapper>
  );
};
