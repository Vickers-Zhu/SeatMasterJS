// src/features/auth/components/LoginDropDownPicker.js
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DropdownContainer,
  PlaceholderText,
  SelectedItemWrapper,
  FlagText,
  CodeText,
  StyledDropDownPicker,
} from "./LoginDropDownPicker.styles";
import CountryListItem from "./CountryListItem";
import { useTheme } from "styled-components/native";

/**
 * Country code picker component for login screen
 * @param {Array} countryCodes - List of country objects with flag, countryName, and code properties
 * @param {String} selectedCountry - Currently selected country name
 * @param {Function} setSelectedCountry - Function to update selected country
 * @param {Object} style - Additional styles for the container
 */
const LoginDropDownPicker = ({
  countryCodes,
  selectedCountry,
  setSelectedCountry,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const theme = useTheme();

  // Update selected item when selectedCountry or countryCodes change
  useEffect(() => {
    if (selectedCountry && countryCodes) {
      const item = countryCodes.find(
        (item) => item.countryName === selectedCountry
      );
      setSelectedItem(item);
      
    }
  }, [selectedCountry, countryCodes]);

  // Handle selection from dropdown
  const handleSelectItem = (item) => {
    setSelectedCountry(item.countryName);
    setOpen(false);
  };

  // Format items for dropdown
  const dropdownItems = countryCodes.map((item) => ({
    label: `${item.flag}  ${item.code}`,
    value: item.countryName,
    countryName: item.countryName,
    code: item.code,
    flag: item.flag,
  }));

  // Custom renderer for placeholder/selected item
  const renderPlaceholder = () => {
    if (!selectedItem) return <PlaceholderText>Select</PlaceholderText>;

    return (
      <SelectedItemWrapper>
        <FlagText>{selectedItem.flag}</FlagText>
        <CodeText>{selectedItem.code}</CodeText>
        <MaterialIcons
          name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={16}
          color={theme.colors.text.primary}
          style={{ marginLeft: 4 }}
        />
      </SelectedItemWrapper>
    );
  };

  return (
    <DropdownContainer style={style}>
      <StyledDropDownPicker
        open={open}
        value={selectedCountry}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={(val) => {
          const item = countryCodes.find((item) => item.countryName === val);
          setSelectedCountry(item?.countryName);
        }}
        placeholder="Select"
        listMode="SCROLLVIEW"
        renderListItem={({ item }) => (
          <CountryListItem item={item} onPress={handleSelectItem} />
        )}
        searchable={false}
        ArrowUpIconComponent={() => null}
        ArrowDownIconComponent={() => null}
        renderSelectedItemLabel={() => null}
        renderPlaceholder={renderPlaceholder}
      />
    </DropdownContainer>
  );
};

export default LoginDropDownPicker;

// label: `${item.flag} ${item.code}`,
// value: item.countryName,
// countryName: item.countryName,
// code: item.code,
// flag: item.flag,
