import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View } from "react-native";

import CountryListItem from "./CountryListItem";

const LoginDropDownPicker = ({
  countryCodes,
  selectedCountry,
  setSelectedCountry,
  containerWidth,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
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
      style={{
        backgroundColor: "#f0f0f0",
        borderColor: "#ccc",
      }}
      dropDownContainerStyle={{
        position: "absolute",
        width: containerWidth,
        backgroundColor: "#ffffff",
        borderColor: "#ccc",
        borderRadius: 12,
      }}
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
    />
  );
};

export default LoginDropDownPicker;
