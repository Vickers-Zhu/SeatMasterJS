// src/features/customer/settings/screens/SettingsScreen.js
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { List, Avatar, Divider } from "react-native-paper";
import styled from "styled-components/native";

import { useAuthentication } from "../../../../services/AuthenticationContext";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { Separator } from "../../../../components/Separator/Separator";

// Reusing the same mock data structure
import { users } from "../../../../data/mockData";

// Styled components with improved styling
const SettingsContainer = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
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

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[2]};
`;

const EmailText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.secondary};
`;

const SectionHeader = styled.View`
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const SectionTitle = styled(CustomText)`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout } = useAuthentication();
  const user = users[0];

  return (
    <SafeArea>
      <SettingsContainer>
        {/* Profile Section */}
        <ProfileContainer>
          <UserInfoContainer>
            <CustomText variant="h3">{user.username}</CustomText>
            <Spacer position="top" size="small" />
            <EmailText variant="caption">{user.email}</EmailText>
            <Spacer position="top" size="small" />
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

        {/* Account Section */}
        <SectionHeader>
          <SectionTitle variant="body">ACCOUNT</SectionTitle>
        </SectionHeader>
        <List.Section>
          <SettingsItem
            title="Account Settings"
            description="Manage your personal information"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="account-cog"
              />
            )}
            onPress={() => navigation.navigate("AccountSettings")}
          />
          <Divider />
          <SettingsItem
            title="Reservations"
            description="View and manage your restaurant reservations"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="book"
              />
            )}
            onPress={() => navigation.navigate("Reservations")}
          />
          <Divider />
          <SettingsItem
            title="Payment Methods"
            description="Manage your saved payment options"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="credit-card"
              />
            )}
            onPress={() => navigation.navigate("PaymentMethods")}
          />
        </List.Section>

        {/* Preferences Section */}
        <SectionHeader>
          <SectionTitle variant="body">PREFERENCES</SectionTitle>
        </SectionHeader>
        <List.Section>
          <SettingsItem
            title="Notifications"
            description="Manage your notification settings"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="bell"
              />
            )}
            onPress={() => {}}
          />
          <Divider />
          <SettingsItem
            title="Language"
            description="Change your preferred language"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="translate"
              />
            )}
            onPress={() => {}}
          />
          <Divider />
          <SettingsItem
            title="Appearance"
            description="Customize the app's look and feel"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="palette"
              />
            )}
            onPress={() => {}}
          />
        </List.Section>

        {/* Support Section */}
        <SectionHeader>
          <SectionTitle variant="body">SUPPORT</SectionTitle>
        </SectionHeader>
        <List.Section>
          <SettingsItem
            title="Help"
            description="Get support and read FAQs"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="help-circle"
              />
            )}
            onPress={() => {}}
          />
          <Divider />
          <SettingsItem
            title="About"
            description="Learn more about SeatMaster"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="information"
              />
            )}
            onPress={() => {}}
          />
          <Divider />
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
            onPress={() => {
              onLogout();
            }}
          />
        </List.Section>
        <Spacer position="bottom" size="large" />
      </SettingsContainer>
    </SafeArea>
  );
};