import React, { useState } from "react";
import { View } from "react-native";
import { StyledDropDownPicker } from "./LoginDropDownPicker.styles";
import CountryListItem from "./CountryListItem";

const LoginDropDownPicker = ({
  countryCodes,
  selectedCountry,
  setSelectedCountry,
  containerWidth,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledDropDownPicker
      open={open}
      value={selectedCountry}
      items={countryCodes.map((item) => ({
        label: `${item.flag} ${item.code}`,
        value: item.countryName,
        countryName: item.countryName,
        code: item.code,
        flag: item.flag,
      }))}
      setOpen={setOpen}
      setValue={(val) => {
        const selectedItem = countryCodes.find(
          (item) => item.countryName === val
        );
        setSelectedCountry(selectedItem?.countryName);
      }}
      placeholder="Select"
      listMode="SCROLLVIEW"
      renderListItem={({ item }) => (
        <CountryListItem
          item={item}
          onPress={(selectedItem) => {
            setSelectedCountry(selectedItem.countryName);
            setOpen(false);
          }}
        />
      )}
      containerWidth={containerWidth}
    />
  );
};

export default LoginDropDownPicker;
