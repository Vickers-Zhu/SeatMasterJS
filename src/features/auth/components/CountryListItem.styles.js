import styled from "styled-components/native";

export const ListItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
`;

export const CountryInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1; /* Ensures it takes up available space */
`;

export const FlagText = styled.Text`
  font-size: ${(props) =>
    props.theme.fontSizes.body}; /* Slightly larger font */
  margin-right: ${(props) => props.theme.space[3]};
`;

export const CountryNameText = styled.Text`
  font-size: ${(props) =>
    props.theme.fontSizes.body}; /* Slightly larger font */
  color: ${(props) => props.theme.colors.text.primary};
`;

export const CodeText = styled.Text`
  font-size: ${(props) =>
    props.theme.fontSizes.body}; /* Slightly larger font */
  margin-right: ${(props) => props.theme.space[2]};
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: right;
  flex-shrink: 0; /* Ensures it doesn't shrink */
`;
