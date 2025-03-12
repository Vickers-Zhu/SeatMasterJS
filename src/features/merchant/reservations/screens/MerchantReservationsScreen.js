// src/features/merchant/reservations/screens/MerchantReservationsScreen.js
import React, { useState } from "react";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { seatingData, merchantReservations } from "../../../../data/mockData";
import { generateTimeSlots } from "../utils/timeUtils";
import ReservationsGrid from "../components/ReservationsGrid";
import ReservationsMailbox from "../components/ReservationsMailbox";
import {
  TabBar,
  Tab,
  TabText,
} from "../components/ReservationComponents.styles";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

// Tab type definitions
const TABS = {
  GRID: "grid",
  SMART: "smart",
  MAILBOX: "mailbox",
};

export const MerchantReservationsScreen = () => {
  const timeSlots = generateTimeSlots();
  const [activeTab, setActiveTab] = useState(TABS.GRID);

  return (
    <SafeArea>
      <Container>
        <TabBar>
          <Tab
            active={activeTab === TABS.GRID}
            onPress={() => setActiveTab(TABS.GRID)}
            activeOpacity={0.6}
          >
            <MaterialIcons
              name="grid-on"
              size={20}
              color={activeTab === TABS.GRID ? "#262626" : "#757575"}
            />
            <TabText active={activeTab === TABS.GRID}>Grid View</TabText>
          </Tab>

          <Tab
            active={activeTab === TABS.SMART}
            onPress={() => setActiveTab(TABS.SMART)}
            activeOpacity={0.6}
          >
            <MaterialIcons
              name="auto-awesome"
              size={20}
              color={activeTab === TABS.SMART ? "#262626" : "#757575"}
            />
            <TabText active={activeTab === TABS.SMART}>Smart View</TabText>
          </Tab>

          <Tab
            active={activeTab === TABS.MAILBOX}
            onPress={() => setActiveTab(TABS.MAILBOX)}
            activeOpacity={0.6}
          >
            <MaterialIcons
              name="mail"
              size={20}
              color={activeTab === TABS.MAILBOX ? "#262626" : "#757575"}
            />
            <TabText active={activeTab === TABS.MAILBOX}>Inbox</TabText>
          </Tab>
        </TabBar>

        {activeTab === TABS.MAILBOX ? (
          <ReservationsMailbox reservations={merchantReservations} />
        ) : (
          <ReservationsGrid
            timeSlots={timeSlots}
            tables={seatingData.tables}
            counterSeats={seatingData.counterSeats}
            reservations={merchantReservations}
            isSmartSorting={activeTab === TABS.SMART}
          />
        )}
      </Container>
    </SafeArea>
  );
};
