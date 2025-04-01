import styled from "styled-components/native";
import { CustomText } from "../../../../components/CustomText/CustomText";

// Styled components
export const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};
`;

export const HeaderTitle = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.ui.primary};
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  border-radius: 5px;
`;

export const SaveButtonText = styled(CustomText)`
  color: ${(props) => props.theme.colors.bg.primary};
`;

export const Section = styled.View`
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const SectionTitle = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

export const FormGroup = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

export const Label = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[2]};
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const TextArea = styled(Input)`
  min-height: 100px;
  text-align-vertical: top;
`;

export const PhotoContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.space[2]};
`;

export const PhotoItem = styled.View`
  width: 100px;
  height: 100px;
  margin: ${(props) => props.theme.space[1]};
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

export const PhotoImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AddPhotoButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.theme.space[1]};
  border-radius: 5px;
  border: 1px dashed ${(props) => props.theme.colors.ui.secondary};
`;

export const RemovePhotoButton = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 24px;
  height: 24px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export const FeatureRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const FeatureSwitch = styled.Switch`
  margin-right: ${(props) => props.theme.space[2]};
`;

export const BusinessHoursRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

export const DayLabel = styled(CustomText)`
  width: 100px;
`;

export const TimeInput = styled.TextInput`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[1]};
  border-radius: 5px;
  width: 80px;
  font-size: ${(props) => props.theme.fontSizes.body};
  text-align: center;
`;

export const ClosedCheckbox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CuisineTag = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding-vertical: ${(props) => props.theme.space[1]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  border-radius: 20px;
  margin-right: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[1]};
  flex-direction: row;
  align-items: center;
`;

export const CuisineTagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AddCuisineButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding-vertical: ${(props) => props.theme.space[1]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  border-radius: 20px;
  margin-bottom: ${(props) => props.theme.space[1]};
`;
