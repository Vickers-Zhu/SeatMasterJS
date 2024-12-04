// src/features/settings/screens/AccountSettingsScreen.js

import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Avatar, IconButton } from "react-native-paper";
import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { CustomText } from "../../../components/CustomText/CustomText";
import { Separator } from "../../../components/Separator/Separator";

// Styled Components
const SettingsContainer = styled(ScrollView)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Centers the title */
  padding: ${(props) => props.theme.space[2]};
  position: relative;
`;

const CloseButtonWrapper = styled.View`
  position: absolute;
  left: ${(props) =>
    props.theme.space[2]}; /* Keeps the close button on the left */
`;

const SectionTitle = styled(CustomText)`
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[3]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const FrameLine = styled.View`
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1); /* Similar to the separator */
  margin: ${(props) => props.theme.space[1]};
  border-radius: 8px; /* Optional: for rounded edges */
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${(props) => props.theme.space[0]};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

const ItemTextContainer = styled.View`
  flex-direction: column;
`;

const BoldText = styled(CustomText)`
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const InfoText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const AccountSettingsScreen = ({ navigation }) => {
  // User Data State
  const [userData, setUserData] = useState({
    name: "Vickers Zhu",
    phoneNumber: "+81 **** ****",
    email: "****@example.com",
  });

  return (
    <SafeArea>
      <SettingsContainer>
        {/* Header */}
        <Header>
          {/* Close Button */}
          <CloseButtonWrapper>
            <IconButton
              icon="close"
              size={24}
              onPress={() => navigation.goBack()}
            />
          </CloseButtonWrapper>

          {/* Centered Title */}
          <CustomText variant="title">SeatMaster Account</CustomText>
        </Header>

        {/* Frame Line */}
        <FrameLine>
          {/* Account Info Section */}
          <SectionTitle variant="h4">Account Info</SectionTitle>

          {/* Profile Image */}
          <ProfileContainer>
            <Avatar.Image
              size={80}
              source={require("../../../../assets/images/user_profile.jpg")}
            />
          </ProfileContainer>

          {/* Basic Info Section */}
          <SectionTitle variant="h5">Basic Info</SectionTitle>

          {/* Name Item */}
          <ItemContainer>
            <ItemTextContainer>
              <BoldText variant="body">Name</BoldText>
              <InfoText variant="body">{userData.name}</InfoText>
            </ItemTextContainer>
            <IconButton icon="chevron-right" size={24} />
          </ItemContainer>
          <Separator type="full" />

          {/* Phone Number Item */}
          <ItemContainer>
            <ItemTextContainer>
              <BoldText variant="body">Phone Number</BoldText>
              <InfoText variant="body">{userData.phoneNumber}</InfoText>
            </ItemTextContainer>
            <IconButton icon="chevron-right" size={24} />
          </ItemContainer>
          <Separator type="full" />

          {/* Email Item */}
          <ItemContainer>
            <ItemTextContainer>
              <BoldText variant="body">Email</BoldText>
              <InfoText variant="body">{userData.email}</InfoText>
            </ItemTextContainer>
            <IconButton icon="chevron-right" size={24} />
          </ItemContainer>
          <Separator type="full" />
        </FrameLine>
      </SettingsContainer>
    </SafeArea>
  );
};
