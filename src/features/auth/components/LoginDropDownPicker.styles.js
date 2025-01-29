import styled from "styled-components/native";
import DropDownPicker from "react-native-dropdown-picker";

export const StyledDropDownPicker = styled(DropDownPicker).attrs(
  ({ theme, containerWidth }) => ({
    style: {
      backgroundColor: theme.colors.bg.secondary,
      borderColor: theme.colors.ui.primary,
      borderRadius: theme.space[3],
      minHeight: 50,
    },
    dropDownContainerStyle: {
      position: "absolute",
      width: containerWidth,
      backgroundColor: theme.colors.bg.primary,
      borderColor: theme.colors.ui.secondary,
    },
  })
)``;
