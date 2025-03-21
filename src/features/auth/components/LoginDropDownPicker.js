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

const LoginDropDownPicker = ({
  countryCodes,
  selectedCountry,
  setSelectedCountry,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (selectedCountry && countryCodes) {
      const item = countryCodes.find(
        (item) => item.countryName === selectedCountry
      );
      setSelectedItem(item);
    }
  }, [selectedCountry, countryCodes]);

  const handleSelectItem = (item) => {
    setSelectedCountry(item.countryName);
    setOpen(false);
  };

  const dropdownItems = countryCodes.map((item) => ({
    label: `${item.flag}  ${item.code}`, // I dont know why it show as the place holder
    value: item.countryName,
    countryName: item.countryName,
    code: item.code,
    flag: item.flag,
  }));

  // Not worked
  // const renderPlaceholder = () => {
  //   // If no item is selected, show placeholder text
  //   if (!selectedItem) {
  //     return <PlaceholderText>Select</PlaceholderText>;
  //   }

  //   // If an item is selected, show the selected item
  //   return (
  //     <SelectedItemWrapper>
  //       <FlagText>{selectedItem.flag}</FlagText>
  //       <CodeText>{selectedItem.code}</CodeText>
  //       <MaterialIcons
  //         name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"}
  //         size={16}
  //         color={theme.colors.text.primary}
  //         style={{ marginLeft: 4 }}
  //       />
  //     </SelectedItemWrapper>
  //   );
  // };

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
        listMode="SCROLLVIEW"
        renderListItem={({ item }) => (
          <CountryListItem item={item} onPress={handleSelectItem} />
        )}
      />
    </DropdownContainer>
  );
};

export default LoginDropDownPicker;
