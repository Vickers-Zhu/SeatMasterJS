import styled from "styled-components/native";

export const ListItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-bottom-width: 0.5px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
  margin-horizontal: ${(props) => props.theme.space[2]};
`;

export const CountryInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1; /* Ensures it takes up available space */
`;

export const FlagText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.title};
  margin-right: ${(props) => props.theme.space[3]};
`;

export const CountryNameText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const CodeText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-left: ${(props) => props.theme.space[2]};
  flex-shrink: 0; /* Ensures it doesn't shrink */
`;
