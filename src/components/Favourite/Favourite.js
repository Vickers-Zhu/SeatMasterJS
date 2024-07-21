import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';


const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ restaurant }) => {

  return (
    <FavouriteButton
    >
      <AntDesign
        name={false ? 'heart' : 'hearto'}
        size={24}
        color={false ? 'red' : 'white'}
      />
    </FavouriteButton>
  );
};
