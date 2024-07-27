import React from 'react';
import { Switch as RNSwitch, View, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const Label = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 16px;
  margin: 0 10px;
`;

const SwitchContainer = ({ isReservation, setIsReservation }) => {
  return (
    <Container>
      <Label>General</Label>
      <RNSwitch
        trackColor={{ false: "#767577", true: "#81b0ff" }} // Example colors, replace with your theme colors
        thumbColor={isReservation ? "#f5dd4b" : "#f4f3f4"} // Example colors, replace with your theme colors
        ios_backgroundColor="#3e3e3e" // Example colors, replace with your theme colors
        onValueChange={setIsReservation}
        value={isReservation}
      />
      <Label>Reservation</Label>
    </Container>
  );
};

export default SwitchContainer;