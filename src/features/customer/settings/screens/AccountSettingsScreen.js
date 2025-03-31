// src/features/customer/settings/screens/AccountSettingsScreen.js
import React from "react";
import { IconButton, Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { users } from "../../../../data/mockData";
import {
  SettingsContainer,
  Header,
  CloseButtonWrapper,
  SectionTitle,
  ProfileContainer,
  SettingsItemRow,
  SettingsItemText,
  SectionContainer,
} from "./AccountSettingsScreen.styles";

export const AccountSettingsScreen = ({ navigation }) => {
  const user = users[0];

  const basicInfoItems = [
    { 
      title: "Name", 
      value: user.username, 
      icon: "account-circle",
      onPress: () => console.log("Navigate to edit name") 
    },
    { 
      title: "Phone Number", 
      value: user.phoneNumber, 
      icon: "phone",
      onPress: () => console.log("Navigate to edit phone") 
    },
    { 
      title: "Email", 
      value: user.email, 
      icon: "email",
      onPress: () => console.log("Navigate to edit email") 
    },
  ];

  const privacyItems = [
    { 
      title: "Password", 
      value: "Change your password", 
      icon: "lock", 
      onPress: () => console.log("Navigate to change password")
    },
    { 
      title: "Privacy Settings", 
      value: "Manage your data", 
      icon: "security", 
      onPress: () => console.log("Navigate to privacy settings")
    },
  ];

  const preferencesItems = [
    { 
      title: "Notifications", 
      value: "Customize your alerts", 
      icon: "notifications", 
      onPress: () => console.log("Navigate to notifications")
    },
    { 
      title: "Language", 
      value: "English", 
      icon: "language", 
      onPress: () => console.log("Navigate to language settings")
    },
    { 
      title: "Appearance", 
      value: "Light mode", 
      icon: "palette", 
      onPress: () => console.log("Navigate to appearance settings")
    },
  ];

  const renderSettingsItems = (items) => {
    return items.map((item, index) => (
      <SettingsItemRow key={index} onPress={item.onPress}>
        <MaterialIcons name={item.icon} size={24} color="#262626" />
        <SettingsItemText>
          <CustomText variant="body" style={{ fontWeight: "bold" }}>
            {item.title}
          </CustomText>
          <CustomText variant="body" style={{ color: "#757575" }}>
            {item.value}
          </CustomText>
        </SettingsItemText>
        <MaterialIcons name="chevron-right" size={24} color="#757575" />
      </SettingsItemRow>
    ));
  };

  return (
    <SafeArea>
      <SettingsContainer showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <Header>
          <CloseButtonWrapper>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => navigation.goBack()}
            />
          </CloseButtonWrapper>
          <CustomText variant="title">Account Settings</CustomText>
        </Header>

        {/* Profile picture section */}
        <ProfileContainer>
          <Avatar.Image size={80} source={user.profileImage} />
        </ProfileContainer>

        {/* Basic info section */}
        <SectionContainer>
          <SectionTitle variant="body">BASIC INFO</SectionTitle>
          {renderSettingsItems(basicInfoItems)}
        </SectionContainer>

        {/* Privacy section */}
        <SectionContainer>
          <SectionTitle variant="body">PRIVACY & SECURITY</SectionTitle>
          {renderSettingsItems(privacyItems)}
        </SectionContainer>

        {/* Preferences section */}
        <SectionContainer>
          <SectionTitle variant="body">PREFERENCES</SectionTitle>
          {renderSettingsItems(preferencesItems)}
        </SectionContainer>
      </SettingsContainer>
    </SafeArea>
  );
};