// src/features/merchant/reservations/components/MerchantReservation.styles.js
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { CustomText } from "../../../../components/CustomText/CustomText";
import { SharedChairItem } from "../../dashboard/components/SharedTableStyles.styles";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const MainGrid = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const CurrentTimeLine = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff3b30;
  z-index: 5;
`;

export const CurrentTimeIndicator = styled.View`
  position: absolute;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ff3b30;
  top: -4px;
`;

export const HeaderContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
  position: relative;
  z-index: 2;
`;

export const HeaderScrollView = styled.ScrollView`
  flex-direction: row;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  padding-vertical: ${(props) => props.theme.space[2]};
`;

export const FixedLeftColumn = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  z-index: 10;
  border-right-width: 1px;
  border-right-color: ${(props) => props.theme.colors.ui.tertiary};
`;

export const TimeColumnHeader = styled.View`
  width: 60px;
  padding: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[5]};
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
`;

export const ExpandAllButton = styled(TouchableOpacity)`
  background-color: ${({ areAllExpanded, theme }) =>
    areAllExpanded ? theme.colors.ui.secondary : theme.colors.ui.primary};
  padding: 4px 8px;
  border-radius: 12px;
  margin-top: 4px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
  min-width: 52px;
`;

export const TableColumn = styled.View`
  width: 100px;
  align-items: center;
  border-left-width: 1px;
  border-left-color: ${(props) => props.theme.colors.ui.tertiary};
  padding-horizontal: ${(props) => props.theme.space[2]};
  padding-vertical: ${(props) => props.theme.space[2]};
`;

export const TableItem = styled.View`
  align-items: center;
`;

export const ChairsGrid = styled.View`
  flex-direction: column;
  justify-content: center;
  width: 58px;
  margin-top: ${(props) => props.theme.space[1]};
`;

export const ChairRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 1px;
`;

export const ChairItem = styled(SharedChairItem)`
  width: 22px;
  height: 22px;
  margin: 2px;
  justify-content: center;
  align-items: center;
`;

export const ShowMoreButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding-horizontal: ${(props) => props.theme.space[1]};
  padding-vertical: 2px;
  border-radius: 4px;
  margin-top: 4px;
  align-items: center;
`;

export const ButtonText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const ExpandAllButtonText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.inverse};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  position: relative;
`;

export const TimeColumn = styled.View`
  width: 60px;
`;

export const TimeSlot = styled.View`
  height: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
  justify-content: center;
  align-items: center;
`;

export const TimeText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const GridContainer = styled.View`
  flex: 1;
  position: relative;
`;

export const GridRow = styled.View`
  flex-direction: row;
  height: 30px;
`;

export const GridCell = styled.View`
  width: 100px;
  height: 30px;
  border-left-width: 1px;
  border-left-color: ${(props) => props.theme.colors.ui.tertiary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.tertiary};
`;

export const ReservationBlock = styled(TouchableOpacity)`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ status }) =>
    status === "confirmed"
      ? "#b3ffb3"
      : status === "pending"
      ? "#ffd11a"
      : "#ff4d4d"};
  border-radius: 5px;
  padding: ${(props) => props.theme.space[1]};
  justify-content: space-between;
  z-index: 1;
`;

export const ReservationName = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const ReservationDetails = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const ReservationPanel = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.ui.tertiary};
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ActionButton = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[2]};
  border-radius: 5px;
  min-width: 100px;
  align-items: center;
  background-color: ${({ variant }) =>
    variant === "confirm" ? "#b3ffb3" : "#ff4d4d"};
`;
