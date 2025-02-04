import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./AppNavigator";
import { GlobalWrapper } from "../../components/GlobalWrapper/GlobalWrapper";
import { AuthNavigator } from "./AuthNavigator";
import { useAuthentication } from "../../services/AuthenticationContext";

export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();

  return (
    <GlobalWrapper>
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </GlobalWrapper>
  );
};
