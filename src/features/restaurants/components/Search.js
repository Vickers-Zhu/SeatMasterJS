import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';


const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const Search = () => {
  keyword = 'TestKeyword';
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
      setSearchKeyword(keyword);
  }, [keyword]);
  
  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search"
        icon="map"
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />
    </SearchContainer>
  )
}