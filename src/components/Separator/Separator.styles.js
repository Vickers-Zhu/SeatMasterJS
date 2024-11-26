// src/components/Separator/Separator.styles.js

import styled from "styled-components/native";

export const SeparatorFull = styled.View`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-vertical: ${(props) => props.theme.space[3]};
`;

export const SeparatorPartial = styled.View`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 80%;
  margin-vertical: ${(props) => props.theme.space[2]};
  margin-left: 66px;
`;
