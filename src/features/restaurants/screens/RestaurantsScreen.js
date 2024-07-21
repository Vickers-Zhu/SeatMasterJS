import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { FadeInView } from '../../../components/FadeInView/FadeInView';
import {Spacer} from '../../../components/Spacer/Spacer';
import { Search } from '../components/Search';
import { RestaurantList } from '../components/RestaurantList.styles';


const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      <Text>Restaurant 1</Text>
      <RestaurantList>
        <Text>Restaurant 1</Text>
        <TouchableOpacity
        >
          <Spacer position="bottom" size="large">
            <FadeInView>
              <Text>Restaurant 1</Text>
            </FadeInView>
          </Spacer>
        </TouchableOpacity>
      </RestaurantList>
    </SafeArea>
  )
}