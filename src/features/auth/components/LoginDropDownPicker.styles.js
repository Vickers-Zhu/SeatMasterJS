// src/features/auth/components/LoginDropDownPicker.styles.js
import styled from "styled-components/native";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text } from "react-native";

/**
 * Container for the dropdown picker
 */
export const DropdownContainer = styled(View)`
  position: relative;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 8px;
`;

/**
 * Text for placeholder state
 */
export const PlaceholderText = styled(Text)`
  color: ${(props) => props.theme.colors.text.disabled};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  padding-horizontal: ${(props) => props.theme.space[2]};
`;

/**
 * Wrapper for the selected item content
 */
export const SelectedItemWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${(props) => props.theme.space[2]};
`;

/**
 * Text for flag emoji
 */
export const FlagText = styled(Text)`
  font-size: 20px;
  margin-right: ${(props) => props.theme.space[2]};
`;

/**
 * Text for country code
 */
export const CodeText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;

/**
 * Styled dropdown picker with comprehensive theme-based styling
 */
export const StyledDropDownPicker = styled(DropDownPicker).attrs(
  ({ theme }) => ({
    // Main container styling
    style: {
      backgroundColor: theme.colors.bg.secondary,
      borderColor: theme.colors.ui.tertiary,
      borderRadius: 8,
      minHeight: 50,
      borderWidth: 1,
      width: "100%",
    },
    
    // Dropdown container styling
    dropDownContainerStyle: {
      position: "absolute",
      width: "100%",
      backgroundColor: theme.colors.bg.primary,
      borderColor: theme.colors.ui.tertiary,
      borderWidth: 1,
      borderTopWidth: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 1000,
    },
    
    // Placeholder styling
    placeholderStyle: {
      color: theme.colors.text.disabled,
      fontFamily: theme.fonts.body,
      fontSize: 16,
    },
    
    // Selected item container styling
    selectedItemContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: parseInt(theme.space[2]),
    },
    
    // List item container styling
    listItemContainerStyle: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    // Parent list container styling
    listParentContainerStyle: {
      maxHeight: 250,
    },
    
    // Item separator styling
    itemSeparatorStyle: {
      backgroundColor: theme.colors.ui.tertiary,
      height: 0.5,
    },
  })
)`
  z-index: 2000;
`;