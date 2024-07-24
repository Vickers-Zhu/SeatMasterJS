import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './AppNavigator';
import {GlobalWrapper} from '../../components/GlobalWrapper/GlobalWrapper';

export const Navigation = () => {
  
  return (
    <GlobalWrapper>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GlobalWrapper>
   );
  };
  