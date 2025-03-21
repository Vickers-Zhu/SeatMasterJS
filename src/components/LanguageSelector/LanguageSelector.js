// src/components/LanguageSelector/LanguageSelector.js
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";

import { CustomText } from "../CustomText/CustomText";

const languages = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

const LanguageButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  border-radius: 15px;
`;

const LanguageText = styled(CustomText)`
  margin-right: ${(props) => props.theme.space[2]};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const DropdownContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 8px;
  padding: ${(props) => props.theme.space[2]};
  min-width: 160px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 5;
  z-index: 1000;
`;

const LanguageOption = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  border-bottom-width: ${(props) => (props.isLast ? "0" : "0.5px")};
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const LanguageSelector = ({
  currentLanguage = "en",
  onChangeLanguage,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLanguage = (languageCode) => {
    if (onChangeLanguage) {
      onChangeLanguage(languageCode);
    }
    setIsOpen(false);
  };

  return (
    <View style={[{ position: "relative" }, style]}>
      <LanguageButton onPress={toggleDropdown}>
        <LanguageText>{t("languages." + currentLanguage)}</LanguageText>
        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={22}
          color="#262626"
        />
      </LanguageButton>

      {isOpen && (
        <DropdownContainer>
          {languages.map((language, index) => (
            <LanguageOption
              key={language.code}
              isLast={index === languages.length - 1}
              onPress={() => handleSelectLanguage(language.code)}
            >
              <LanguageText>{t("languages." + language.code)}</LanguageText>
            </LanguageOption>
          ))}
        </DropdownContainer>
      )}
    </View>
  );
};

export default LanguageSelector;
