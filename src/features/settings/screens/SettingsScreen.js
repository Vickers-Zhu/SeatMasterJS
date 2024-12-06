// src/features/settings/screens/SettingsScreen.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";

// Components
import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../components/Spacer/Spacer";
import { CustomText } from "../../../components/CustomText/CustomText";

// Styled Components
import {
  SettingsContainer,
  ProfileContainer,
  UserInfoContainer,
  AvatarContainer,
  SettingsItem,
  EmailText,
} from "./SettingsScreen.styles";

export const SettingsScreen = ({ navigation }) => {
  const userProfileImage = require("../../../../assets/images/user_profile.jpg");

  return (
    <SafeArea>
      <SettingsContainer>
        <ProfileContainer>
          <UserInfoContainer>
            {/* Username */}
            <CustomText variant="h3">Guest User</CustomText>
            <Spacer position="top" size="small" />
            {/* Email */}
            <EmailText variant="caption">guest@example.com</EmailText>
          </UserInfoContainer>
          <AvatarContainer>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Avatar.Image
                size={100}
                source={userProfileImage}
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
          />
        </List.Section>
      </SettingsContainer>
    </SafeArea>
  );
};
