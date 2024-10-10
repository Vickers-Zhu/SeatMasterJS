//features/settings/screens/SettingsScreen.js
import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { Spacer } from "../../../components/Spacer/Spacer";
import { CustomText } from "../../../components/CustomText/CustomText"; // Updated import
import { colors } from "../../../infrastructure/theme/colors";

// import { AuthenticationContext } from '../../../services/authentication/AuthenticationContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Styled Components
const SettingsContainer = styled(ScrollView)`
  background-color: ${colors.bg.primary};
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
  align-items: flex-start; /* Ensures left alignment */
`;

const AvatarContainer = styled(View)`
  /* Alignment is handled by flex in ProfileContainer */
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

// New Styled Component for Email
const EmailText = styled(CustomText)`
  margin-left: ${(props) => props.theme.space[1]};
`;

export const SettingsScreen = ({ navigation }) => {
  // const { onLogout, user } = useContext(AuthenticationContext);

  const userProfileImage = require("../../../../assets/images/user_profile.jpg");

  return (
    <SafeArea>
      <SettingsContainer>
        <ProfileContainer>
          <UserInfoContainer>
            {/* Username Text */}
            <CustomText variant="h3">Guest User</CustomText>
            <Spacer position="top" size="small" />
            {/* Email Text with Margin Left */}
            <EmailText variant="caption">guest@example.com</EmailText>
          </UserInfoContainer>
          <AvatarContainer>
            <TouchableOpacity
              onPress={() => {
                /* Navigate to profile edit */
              }}
            >
              <Avatar.Image
                size={100}
                source={userProfileImage}
                backgroundColor={colors.brand.primary}
              />
            </TouchableOpacity>
          </AvatarContainer>
        </ProfileContainer>

        <List.Section>
          <SettingsItem
            title="Reservations"
            left={(props) => (
              <List.Icon {...props} color={colors.text.primary} icon="book" />
            )}
            onPress={() => navigation.navigate("Reservations")}
          />
          <SettingsItem
            title="Account Settings"
            left={(props) => (
              <List.Icon
                {...props}
                color={colors.text.primary}
                icon="account-cog"
              />
            )}
            onPress={() => navigation.navigate("AccountSettings")}
          />
          <SettingsItem
            title="Payment Methods"
            left={(props) => (
              <List.Icon
                {...props}
                color={colors.text.primary}
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
                color={colors.text.primary}
                icon="help-circle"
              />
            )}
            // onPress={() => navigation.navigate('Help')}
          />
          <SettingsItem
            title="Logout"
            left={(props) => (
              <List.Icon {...props} color={colors.text.primary} icon="logout" />
            )}
            // onPress={onLogout}
          />
        </List.Section>
      </SettingsContainer>
    </SafeArea>
  );
};
