// src/features/settings/screens/SettingsScreen.js
import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../components/Spacer/Spacer";
import { CustomText } from "../../../components/CustomText/CustomText";

// Styled Components
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
  margin-left: ${(props) => props.theme.space[1]};
`;

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
            <TouchableOpacity
              onPress={() => navigation.navigate("AccountSettings")}
            >
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
            // Uncomment and replace with appropriate navigation
            // onPress={() => navigation.navigate('Help')}
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
            // Uncomment to integrate with logout logic
            // onPress={onLogout}
          />
        </List.Section>
      </SettingsContainer>
    </SafeArea>
  );
};
