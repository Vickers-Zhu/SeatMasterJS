import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const SwitchBackground = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.disabled};
  border-radius: 25px;
  width: 200px; /* Make the container longer */
  height: 50px;
  padding: 3px;
`;

const Capsule = styled(Animated.View)`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 25px;
  margin: 3px; 
`;

const TextWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  color: ${(props) => props.theme.colors.text.primary};
`;

const SwitchContainer = ({ isReservation, setIsReservation }) => {
  const capsulePosition = useRef(new Animated.Value(isReservation ? 96 : 0)).current;

  useEffect(() => {
    Animated.timing(capsulePosition, {
      toValue: isReservation ? 96 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isReservation]);

  return (
    <Container>
      <SwitchBackground>
        <Capsule style={{ left: capsulePosition }} />
        <TouchableWithoutFeedback onPress={() => setIsReservation(false)}>
          <TextWrapper>
            <Label>General</Label>
          </TextWrapper>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setIsReservation(true)}>
          <TextWrapper>
            <Label>Reservation</Label>
          </TextWrapper>
        </TouchableWithoutFeedback>
      </SwitchBackground>
    </Container>
  );
};

export default SwitchContainer;