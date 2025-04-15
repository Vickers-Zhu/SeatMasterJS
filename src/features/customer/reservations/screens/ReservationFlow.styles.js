// src/features/customer/reservations/screens/ReservationFlow.styles.js
import styled from "styled-components/native";
import { CustomText } from "../../../../components/CustomText/CustomText";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

// Enhanced Date Selector
export const DateSelectorContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const DateItemsContainer = styled.View`
  margin-vertical: ${(props) => props.theme.space[2]};
`;

export const DateOption = styled.TouchableOpacity`
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[2]};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  border-radius: 20px;
  min-width: 80px;
  align-items: center;
  ${(props) =>
    props.unavailable &&
    `
    opacity: 0.5;
  `}
  elevation: ${(props) => (props.selected ? 3 : 0)};
  shadow-opacity: ${(props) => (props.selected ? 0.2 : 0)};
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const DateText = styled(CustomText)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fontWeights.bold
      : props.theme.fontWeights.regular};
`;

export const WeekdayText = styled(CustomText)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  margin-top: 2px;
`;

export const AvailabilityIndicator = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-top: 2px;
  background-color: ${(props) => {
    if (props.selected) return props.theme.colors.text.inverse;
    switch (props.level) {
      case "high":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "low":
        return "#F44336";
      default:
        return "#BDBDBD";
    }
  }};
`;

// Enhanced Party Size Selector
export const PartySelectorContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const PartyOptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.space[2]};
`;

export const PartyOption = styled.TouchableOpacity`
  min-width: 50px;
  height: 50px;
  margin-right: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  elevation: ${(props) => (props.selected ? 3 : 0)};
  shadow-opacity: ${(props) => (props.selected ? 0.2 : 0)};
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const PartyText = styled(CustomText)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fontWeights.bold
      : props.theme.fontWeights.regular};
`;

// Enhanced Time Selector
export const TimeContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const TimeOptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.space[2]};
`;

export const TimeOption = styled.TouchableOpacity`
  min-width: 80px;
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.availability === "low" &&
    `
    border: 1px solid #F44336;
  `}
  ${(props) =>
    props.availability === "medium" &&
    `
    border: 1px solid #FFC107;
  `}
  elevation: ${(props) => (props.selected ? 3 : 0)};
  shadow-opacity: ${(props) => (props.selected ? 0.2 : 0)};
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const TimeText = styled(CustomText)`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fontWeights.bold
      : props.theme.fontWeights.regular};
`;

export const TimeAvailabilityIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-top: 4px;
  background-color: ${(props) => {
    if (props.selected) return props.theme.colors.text.inverse;
    switch (props.level) {
      case "high":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "low":
        return "#F44336";
      default:
        return "#BDBDBD";
    }
  }};
`;

export const AvailabilityRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AvailabilityText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-left: ${(props) => props.theme.space[1]};
`;

// Summary Section
export const SummaryContainer = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const SummaryBox = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 10px;
  padding: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const SummaryText = styled(CustomText)`
  margin-left: ${(props) => props.theme.space[2]};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const ToggleButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.space[2]};
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const ToggleText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  margin-left: ${(props) => props.theme.space[2]};
`;

export const LayoutContainer = styled.View`
  min-height: 250px;
  margin-bottom: ${(props) => props.theme.space[3]};
  border-radius: 12px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const NotesInput = styled.TextInput`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 12px;
  margin-bottom: ${(props) => props.theme.space[3]};
  min-height: 100px;
  color: ${(props) => props.theme.colors.text.primary};
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const ReserveButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.primary};
  padding: ${(props) => props.theme.space[3]};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space[4]};
  margin-left: ${(props) => props.theme.space[2]};
  elevation: 3;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[3]};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space[4]};
  margin-right: ${(props) => props.theme.space[2]};
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const CancelButtonText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const ReserveButtonText = styled(CustomText)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const SectionTitle = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const InfoText = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.space[2]};
  font-style: italic;
`;
