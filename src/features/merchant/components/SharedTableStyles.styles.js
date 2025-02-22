// File: src/features/merchant/components/SharedTableStyles.styles.js
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

// Shared table style used by both table view and seat view.
export const SharedTableItem = styled(TouchableOpacity)`
  background-color: ${({ status, theme }) =>
    status === "occupied"
      ? "#ff4d4d"
      : status === "reserved"
      ? "#ffd11a"
      : "#b3ffb3"};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.space[2]};
  justify-content: center;
  align-items: center;
  min-width: 60px;
  min-height: 60px;
`;

// Shared chair style: a smaller version of the table style.
export const SharedChairItem = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  padding: 4px;
  border-radius: 4px;
  margin: 4px;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  min-height: 40px;
`;

// Container for the chairs row that wraps if needed.
export const SharedChairsRow = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

// A vertical separator that spans the full height of its parent.
export const VerticalSeparator = styled(View)`
  width: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-horizontal: ${({ theme }) => theme.space[2]};
  align-self: stretch;
`;
