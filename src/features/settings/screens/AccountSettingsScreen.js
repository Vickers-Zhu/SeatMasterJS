// src/features/settings/screens/AccountSettingsScreen.js
import React, { useState } from "react";
import { IconButton, Avatar } from "react-native-paper";

// Components
import { SafeArea } from "../../../components/SafeArea/SafeArea";
import { Separator } from "../../../components/Separator/Separator";
import { CustomText } from "../../../components/CustomText/CustomText";

// Mock Data
import { users } from "../../../data/mockData"; // Import user data

// Styled Components
import {
  SettingsContainer,
  Header,
  CloseButtonWrapper,
  SectionTitle,
  FrameLine,
  ProfileContainer,
  ItemContainer,
  ItemTextContainer,
  BoldText,
  InfoText,
} from "./AccountSettingsScreen.styles";

export const AccountSettingsScreen = ({ navigation }) => {
  const user = users[0]; // Get the first user

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
          <SectionTitle variant="h4">Account Info</SectionTitle>

          {/* Profile Image */}
          <ProfileContainer>
            <Avatar.Image size={80} source={user.profileImage} />
          </ProfileContainer>

          {/* Basic Info Section */}
          <SectionTitle variant="h5">Basic Info</SectionTitle>

          {/* Name Item */}
          <ItemContainer>
            <ItemTextContainer>
              <BoldText variant="body">Name</BoldText>
              <InfoText variant="body">{user.username}</InfoText>
            </ItemTextContainer>
            <IconButton icon="chevron-right" size={24} />
          </ItemContainer>
          <Separator type="full" />

          {/* Phone Number Item */}
          <ItemContainer>
            <ItemTextContainer>
              <BoldText variant="body">Phone Number</BoldText>
              <InfoText variant="body">{user.phoneNumber}</InfoText>
            </ItemTextContainer>
            <IconButton icon="chevron-right" size={24} />
          </ItemContainer>
          <Separator type="full" />

          {/* Email Item */}
          <ItemContainer>
            <ItemTextContainer>
              <BoldText variant="body">Email</BoldText>
              <InfoText variant="body">{user.email}</InfoText>
            </ItemTextContainer>
            <IconButton icon="chevron-right" size={24} />
          </ItemContainer>
          <Separator type="full" />
        </FrameLine>
      </SettingsContainer>
    </SafeArea>
  );
};
