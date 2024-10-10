import { Text } from "react-native";
import styled from "styled-components";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;
const title = (theme) => `
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeights.medium};
`;
const h5 = (theme) => `
  font-size: ${theme.fontSizes.h5};
`;
const h4 = (theme) => `
  font-size: ${theme.fontSizes.h4};
`;
const h3 = (theme) => `
  font-size: ${theme.fontSizes.h3};
`;
const h2 = (theme) => `
  font-size: ${theme.fontSizes.h2};
`;
const h1 = (theme) => `
  font-size: ${theme.fontSizes.h1};
`;

const body = (theme) => `
  font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
  font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
  color: ${theme.colors.text.error};
`;

const caption = (theme) => `
  font-size: ${theme.fontSizes.caption};
  font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.medium};
`;

const variants = {
  body,
  hint,
  error,
  label,
  caption,
  title,
  h5,
  h4,
  h3,
  h2,
  h1,
};

export const CustomText = styled(Text)`
  ${({ theme }) => defaultTextStyles(theme)};
  ${({ variant, theme }) => variants[variant](theme)};
`;

CustomText.defaultProps = {
  variant: "body",
};
