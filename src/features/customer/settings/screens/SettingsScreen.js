// src/features/customer/settings/screens/SettingsScreen.js
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { useAuthentication } from "../../../../services/AuthenticationContext";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { users } from "../../../../data/mockData";

const SettingsContainer = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const UserInfoContainer = styled.View`
  flex: 1;
  margin-right: ${(props) => props.theme.space[2]};
  align-items: flex-start;
`;

const AvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const EmailText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.secondary};
`;

const SectionTitle = styled(CustomText)`
  padding: ${(props) => props.theme.space[3]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const SettingsItemRow = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const SettingsItemText = styled.View`
  flex: 1;
  margin-left: ${(props) => props.theme.space[3]};
`;

const SectionContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout } = useAuthentication();
  const user = users[0];

  // Settings sections data
  const accountItems = [
    {
      title: "Account Settings",
      subtitle: "Manage your personal information",
      icon: "manage-accounts",
      onPress: () => navigation.navigate("AccountSettings"),
    },
    {
      title: "Reservations",
      subtitle: "View and manage your restaurant reservations",
      icon: "book-online",
      onPress: () => navigation.navigate("Reservations"),
    },
    {
      title: "Payment Methods",
      subtitle: "Manage your saved payment options",
      icon: "payment",
      onPress: () => navigation.navigate("PaymentMethods"),
    },
  ];

  const preferencesItems = [
    {
      title: "Notifications",
      subtitle: "Manage your notification settings",
      icon: "notifications",
      onPress: () => {},
    },
    {
      title: "Language",
      subtitle: "Change your preferred language",
      icon: "translate",
      onPress: () => {},
    },
    {
      title: "Appearance",
      subtitle: "Customize the app's look and feel",
      icon: "palette",
      onPress: () => {},
    },
  ];

  const supportItems = [
    {
      title: "Help",
      subtitle: "Get support and read FAQs",
      icon: "help",
      onPress: () => {},
    },
    {
      title: "About",
      subtitle: "Learn more about SeatMaster",
      icon: "info",
      onPress: () => {},
    },
    {
      title: "Logout",
      subtitle: "Sign out from your account",
      icon: "logout",
      iconColor: (props) => props.theme.colors.text.error,
      onPress: onLogout,
    },
  ];

  const renderSettingsItems = (items) => {
    return items.map((item, index) => (
      <SettingsItemRow key={index} onPress={item.onPress}>
        <MaterialIcons
          name={item.icon}
          size={24}
          color={item.iconColor || "#262626"}
        />
        <SettingsItemText>
          <CustomText variant="body" style={{ fontWeight: "bold" }}>
            {item.title}
          </CustomText>
          <CustomText variant="body" style={{ color: "#757575" }}>
            {item.subtitle}
          </CustomText>
        </SettingsItemText>
        <MaterialIcons name="chevron-right" size={24} color="#757575" />
      </SettingsItemRow>
    ));
  };

  return (
    <SafeArea>
      <SettingsContainer>
        {/* Profile section */}
        <ProfileContainer>
          <UserInfoContainer>
            <CustomText variant="h3">{user.username}</CustomText>
            <EmailText variant="caption">{user.email}</EmailText>
            <EmailText variant="caption">{user.phoneNumber}</EmailText>
          </UserInfoContainer>
          <AvatarContainer>
            <TouchableOpacity onPress={() => {}}>
              <Avatar.Image
                size={80}
                source={user.profileImage}
                backgroundColor={(props) => props.theme.colors.brand.primary}
              />
            </TouchableOpacity>
          </AvatarContainer>
        </ProfileContainer>

        {/* Account section */}
        <SectionContainer>
          <SectionTitle variant="body">ACCOUNT</SectionTitle>
          {renderSettingsItems(accountItems)}
        </SectionContainer>

        {/* Preferences section */}
        <SectionContainer>
          <SectionTitle variant="body">PREFERENCES</SectionTitle>
          {renderSettingsItems(preferencesItems)}
        </SectionContainer>

        {/* Support section */}
        <SectionContainer>
          <SectionTitle variant="body">SUPPORT</SectionTitle>
          {renderSettingsItems(supportItems)}
        </SectionContainer>
      </SettingsContainer>
    </SafeArea>
  );
};
