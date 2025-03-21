// src/features/merchant/settings/screens/MerchantSettingsScreen.js
import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";

import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { Separator } from "../../../../components/Separator/Separator";
import { useAuthentication } from "../../../../services/AuthenticationContext";

// Sample merchant profile data - this would come from your auth/data service
const merchantProfile = {
  name: "Restaurant Owner",
  email: "restaurant@example.com",
  restaurantName: "Gourmet Delights",
  profileImage: require("../../../../../assets/images/user_profile.jpg"),
  phoneNumber: "+81 80 6748 5678",
};

// Styled components
const SettingsContainer = styled(ScrollView)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ProfileContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

const UserInfoContainer = styled(View)`
  flex: 1;
  margin-right: ${(props) => props.theme.space[2]};
  align-items: flex-start;
`;

const AvatarContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const EmailText = styled(CustomText)`
  margin-top: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const RestaurantNameText = styled(CustomText)`
  margin-top: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const StatusBadge = styled(View)`
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
`;

export const MerchantSettingsScreen = ({ navigation }) => {
  const { onLogout } = useAuthentication();

  return (
    <SafeArea>
      <SettingsContainer>
        {/* Profile Section */}
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
        <Separator type="full" />

        {/* Account Section */}
        <SectionTitle variant="body">ACCOUNT</SectionTitle>
        <List.Section>
          <SettingsItem
            title="Profile Settings"
            description="Edit your personal information"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="account-cog"
              />
            )}
            onPress={() => {}}
          />
          <SettingsItem
            title="Restaurant Information"
            description="Update restaurant details"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="store"
              />
            )}
            onPress={() => {}}
          />
          <SettingsItem
            title="Menu Management"
            description="Add, edit, or remove menu items"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="food"
              />
            )}
            onPress={() => {}}
          />
        </List.Section>

        {/* Business Settings Section */}
        <SectionTitle variant="body">BUSINESS SETTINGS</SectionTitle>
        <List.Section>
          <SettingsItem
            title="Seating Layout"
            description="Manage tables and seating arrangement"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="table-furniture"
              />
            )}
            onPress={() => navigation.navigate("Home")}
          />
          <SettingsItem
            title="Reservation Settings"
            description="Configure reservation rules and availability"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="calendar-clock"
              />
            )}
            onPress={() => navigation.navigate("Reservations")}
          />
          <SettingsItem
            title="Business Hours"
            description="Set your restaurant opening hours"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="clock-outline"
              />
            )}
            onPress={() => {}}
          />
        </List.Section>

        {/* System Section */}
        <SectionTitle variant="body">SYSTEM</SectionTitle>
        <List.Section>
          <SettingsItem
            title="Notifications"
            description="Manage notification preferences"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="bell"
              />
            )}
            onPress={() => {}}
          />
          <SettingsItem
            title="Payment Methods"
            description="Configure payment options"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="credit-card"
              />
            )}
            onPress={() => {}}
          />
          <SettingsItem
            title="Help & Support"
            description="Contact customer support"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="help-circle"
              />
            )}
            onPress={() => {}}
          />
          <SettingsItem
            title="Logout"
            description="Sign out from your account"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.error}
                icon="logout"
              />
            )}
            onPress={onLogout}
          />
        </List.Section>
        <Spacer position="bottom" size="large" />
      </SettingsContainer>
    </SafeArea>
  );
};
