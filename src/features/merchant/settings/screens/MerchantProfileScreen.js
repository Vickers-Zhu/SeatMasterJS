// src/features/merchant/settings/screens/MerchantProfileScreen.js
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { BackButton } from "../../../../components/BackButton/BackButton";
import { merchantProfile } from "../../../../data/mockData";
import {
  ProfileContainer,
  Header,
  SectionTitle,
  ProfileImageContainer,
  SettingsItemRow,
  SettingsItemText,
  SectionContainer,
} from "./MerchantProfileScreen.styles";

export const MerchantProfileScreen = ({ navigation }) => {
  // Mock profile data - in a real app, this would come from a context or API
  const [profile, setProfile] = useState(merchantProfile);

  // Basic info items for the restaurant owner
  const basicInfoItems = [
    {
      title: "Name",
      value: profile.name,
      icon: "account-circle",
      onPress: () => console.log("Navigate to edit name"),
    },
    {
      title: "Email",
      value: profile.email,
      icon: "email",
      onPress: () => console.log("Navigate to edit email"),
    },
    {
      title: "Phone Number",
      value: profile.phoneNumber,
      icon: "phone",
      onPress: () => console.log("Navigate to edit phone"),
    },
  ];

  // Restaurant info items
  const restaurantInfoItems = [
    {
      title: "Restaurant Name",
      value: profile.restaurantName,
      icon: "store",
      onPress: () =>
        navigation.navigate("RestaurantEdit", {
          restaurant: { name: profile.restaurantName },
        }),
    },
    {
      title: "Restaurant Address",
      value: "123 Restaurant St, City",
      icon: "place",
      onPress: () => console.log("Navigate to edit address"),
    },
    {
      title: "Business Hours",
      value: "Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM",
      icon: "schedule",
      onPress: () => console.log("Navigate to edit hours"),
    },
  ];

  // Account settings items
  const accountSettingsItems = [
    {
      title: "Password",
      value: "Change your password",
      icon: "lock",
      onPress: () => console.log("Navigate to change password"),
    },
    {
      title: "Notifications",
      value: "Manage notification settings",
      icon: "notifications",
      onPress: () => console.log("Navigate to notifications"),
    },
    {
      title: "Language",
      value: "English",
      icon: "language",
      onPress: () => console.log("Navigate to language settings"),
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
      <ProfileContainer showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton />
          <CustomText variant="title">Merchant Profile</CustomText>
        </Header>

        {/* Profile Image */}
        <ProfileImageContainer>
          <Avatar.Image size={80} source={profile.profileImage} />
          <CustomText
            variant="title"
            style={{ marginTop: 10, marginBottom: 5 }}
          >
            {profile.name}
          </CustomText>
          <CustomText variant="caption" style={{ color: "#757575" }}>
            {profile.restaurantName}
          </CustomText>
        </ProfileImageContainer>

        {/* Basic Info Section */}
        <SectionContainer>
          <SectionTitle variant="body">PERSONAL INFO</SectionTitle>
          {renderSettingsItems(basicInfoItems)}
        </SectionContainer>

        {/* Restaurant Info Section */}
        <SectionContainer>
          <SectionTitle variant="body">RESTAURANT DETAILS</SectionTitle>
          {renderSettingsItems(restaurantInfoItems)}
        </SectionContainer>

        {/* Account Settings Section */}
        <SectionContainer>
          <SectionTitle variant="body">ACCOUNT SETTINGS</SectionTitle>
          {renderSettingsItems(accountSettingsItems)}
        </SectionContainer>
      </ProfileContainer>
    </SafeArea>
  );
};

export default MerchantProfileScreen;
