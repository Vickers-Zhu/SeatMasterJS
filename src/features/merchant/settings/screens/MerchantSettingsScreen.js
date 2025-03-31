// src/features/merchant/settings/screens/MerchantSettingsScreen.js
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { useAuthentication } from "../../../../services/AuthenticationContext";

const merchantProfile = {
  name: "Restaurant Owner",
  email: "restaurant@example.com",
  restaurantName: "Gourmet Delights",
  profileImage: require("../../../../../assets/images/user_profile.jpg"),
  phoneNumber: "+81 80 6748 5678",
};

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

const RestaurantNameText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const StatusBadge = styled.View`
  background-color: #4caf50;
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border-radius: 12px;
  margin-top: ${(props) => props.theme.space[2]};
  align-self: flex-start;
`;

const StatusText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
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

export const MerchantSettingsScreen = ({ navigation }) => {
  const { onLogout } = useAuthentication();

  // Account section items
  const accountItems = [
    {
      title: "Profile Settings",
      subtitle: "Edit your personal information",
      icon: "person",
      onPress: () => {},
    },
    {
      title: "Restaurant Information",
      subtitle: "Update restaurant details",
      icon: "store",
      onPress: () => navigation.navigate("RestaurantEdit"),
    },
    {
      title: "Menu Management",
      subtitle: "Add, edit, or remove menu items",
      icon: "restaurant-menu",
      onPress: () => {},
    },
  ];

  // Business settings section items
  const businessItems = [
    {
      title: "Seating Layout",
      subtitle: "Manage tables and seating arrangement",
      icon: "chair",
      onPress: () => navigation.navigate("Home"),
    },
    {
      title: "Reservation Settings",
      subtitle: "Configure reservation rules and availability",
      icon: "event",
      onPress: () => navigation.navigate("Reservations"),
    },
    {
      title: "Business Hours",
      subtitle: "Set your restaurant opening hours",
      icon: "schedule",
      onPress: () => {},
    },
  ];

  // System section items
  const systemItems = [
    {
      title: "Notifications",
      subtitle: "Manage notification preferences",
      icon: "notifications",
      onPress: () => {},
    },
    {
      title: "Payment Methods",
      subtitle: "Configure payment options",
      icon: "payment",
      onPress: () => {},
    },
    {
      title: "Help & Support",
      subtitle: "Contact customer support",
      icon: "help",
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
            <CustomText variant="h3">{merchantProfile.name}</CustomText>
            <EmailText variant="caption">{merchantProfile.email}</EmailText>
            <RestaurantNameText variant="body">
              {merchantProfile.restaurantName}
            </RestaurantNameText>
            <StatusBadge>
              <StatusText>ACTIVE</StatusText>
            </StatusBadge>
          </UserInfoContainer>
          <AvatarContainer>
            <TouchableOpacity onPress={() => {}}>
              <Avatar.Image
                size={80}
                source={merchantProfile.profileImage}
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

        {/* Business settings section */}
        <SectionContainer>
          <SectionTitle variant="body">BUSINESS SETTINGS</SectionTitle>
          {renderSettingsItems(businessItems)}
        </SectionContainer>

        {/* System section */}
        <SectionContainer>
          <SectionTitle variant="body">SYSTEM</SectionTitle>
          {renderSettingsItems(systemItems)}
        </SectionContainer>
      </SettingsContainer>
    </SafeArea>
  );
};
