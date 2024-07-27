// ReservationLayout.js
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLView } from 'expo-gl';
import { OrbitControls } from '@react-three/drei';
import { View } from 'react-native';
import styled from 'styled-components/native';

const Seat = ({ position, onClick }) => {
  return (
    <mesh
      position={position}
      onClick={onClick}
      scale={[1, 1, 1]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

const ReservationLayoutContainer = styled(View)`
  flex: 1;
`;

const ReservationLayout = () => {
  const handleSeatClick = (seatId) => {
    console.log(`Seat ${seatId} clicked`);
  };

  return (
    <ReservationLayoutContainer>
      <GLView style={{ flex: 1 }} onContextCreate={() => {}}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Seat position={[0, 0, 0]} onClick={() => handleSeatClick(1)} />
          <Seat position={[2, 0, 0]} onClick={() => handleSeatClick(2)} />
          <Seat position={[-2, 0, 0]} onClick={() => handleSeatClick(3)} />
          <OrbitControls />
        </Canvas>
      </GLView>
    </ReservationLayoutContainer>
  );
};

export default ReservationLayout;