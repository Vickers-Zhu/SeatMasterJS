import { AppNavigator } from "./AppNavigator";
import { GlobalWrapper } from "../../components/GlobalWrapper/GlobalWrapper";

export const Navigation = () => {
  return (
    <GlobalWrapper>
      <AppNavigator />
    </GlobalWrapper>
  );
};
