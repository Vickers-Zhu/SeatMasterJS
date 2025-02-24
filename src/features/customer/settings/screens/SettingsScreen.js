// src/features/settings/screens/SettingsScreen.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";

import { useAuthentication } from "../../../../services/AuthenticationContext";

// Components
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../../components/Spacer/Spacer";
import { CustomText } from "../../../../components/CustomText/CustomText";

// Mock Data
import { users } from "../../../../data/mockData"; // Import user data

// Styled Components
import {
  SettingsContainer,
  ProfileContainer,
  UserInfoContainer,
  AvatarContainer,
  SettingsItem,
  EmailText,
} from "./SettingsScreen.styles";
import { use } from "react";

export const SettingsScreen = ({ navigation }) => {
  const { onLogout } = useAuthentication();
  const user = users[0]; // Get the first user (Guest User)

  return (
    <SafeArea>
      <SettingsContainer>
        <ProfileContainer>
          <UserInfoContainer>
            {/* Username */}
            <CustomText variant="h3">{user.username}</CustomText>
            <Spacer position="top" size="small" />
            {/* Email */}
            <EmailText variant="caption">{user.email}</EmailText>
          </UserInfoContainer>
          <AvatarContainer>
            {/* Profile's onPress is now void */}
            <TouchableOpacity onPress={() => {}}>
              <Avatar.Image
                size={100}
                source={user.profileImage}
                backgroundColor={(props) => props.theme.colors.brand.primary}
              />
            </TouchableOpacity>
          </AvatarContainer>
        </ProfileContainer>

        {/* Menu Items */}
        <List.Section>
          <SettingsItem
            title="Account Settings"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="account-cog"
              />
            )}
            onPress={() => navigation.navigate("AccountSettings")}
          />
          <SettingsItem
            title="Reservations"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="book"
              />
            )}
            onPress={() => navigation.navigate("Reservations")}
          />
          <SettingsItem
            title="Payment Methods"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="credit-card"
              />
            )}
            onPress={() => navigation.navigate("PaymentMethods")}
          />
          <SettingsItem
            title="Help"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="help-circle"
              />
            )}
          />
          <SettingsItem
            title="Logout"
            left={(props) => (
              <List.Icon
                {...props}
                color={(props) => props.theme.colors.text.primary}
                icon="logout"
              />
            )}
            // When Logout is pressed, reset the navigation to Login
            onPress={() => {
              onLogout();
            }}
          />
        </List.Section>
      </SettingsContainer>
    </SafeArea>
  );
};
