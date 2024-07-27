import React from 'react';
import styled from 'styled-components/native';

import { TabBar as OriginalTabBar } from 'react-native-tab-view';

const CustomTabBarContainer = styled(OriginalTabBar).attrs((props) => ({
  indicatorStyle: {
    backgroundColor: props.theme.colors.text.primary,
  },
  labelStyle: {
    color: props.theme.colors.text.primary,
  },
}))`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const TabBar = (props) => {
  const { routes, scrollToTab, setIndex } = props;

  return (
    <CustomTabBarContainer
      {...props}
      onTabPress={({ route, preventDefault }) => {
        preventDefault();
        const tabIndex = routes.findIndex(r => r.key === route.key);
        scrollToTab(route.key, tabIndex);
      }}
    />
  );
};

export default TabBar;