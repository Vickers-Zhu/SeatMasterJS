// src/features/merchant/settings/components/EditButton.js
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CustomText } from "../../../../components/CustomText/CustomText";

const Button = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.ui.primary};
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  margin: ${(props) => props.theme.space[3]};
  border-radius: 5px;
  ${(props) =>
    props.position === "absolute" &&
    `
    position: absolute;
    right: ${props.theme.space[3]};
  `}
`;

const ButtonText = styled(CustomText)`
  color: ${(props) => props.theme.colors.bg.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const EditButton = ({ onPress, position, style, children = "Edit" }) => {
  return (
    <Button onPress={onPress} position={position} style={style}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

export default EditButton;
