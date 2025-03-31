// src/features/merchant/settings/screens/RestaurantEditScreen.js
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";

import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { CustomText } from "../../../../components/CustomText/CustomText";

// Sample data - in a real app, this would come from an API or context
import { sampleRestaurantData } from "../../../../data/mockEditRestaurantData";

// Styled components
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};
`;

const HeaderTitle = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const SaveButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.ui.primary};
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  border-radius: 5px;
`;

const SaveButtonText = styled(CustomText)`
  color: ${(props) => props.theme.colors.bg.primary};
`;

const Section = styled.View`
  margin-bottom: ${(props) => props.theme.space[4]};
`;

const SectionTitle = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

const FormGroup = styled.View`
  margin-bottom: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

const Label = styled(CustomText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[2]};
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const TextArea = styled(Input)`
  min-height: 100px;
  text-align-vertical: top;
`;

const PhotoContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.space[2]};
`;

const PhotoItem = styled.View`
  width: 100px;
  height: 100px;
  margin: ${(props) => props.theme.space[1]};
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const PhotoImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const AddPhotoButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.theme.space[1]};
  border-radius: 5px;
  border: 1px dashed ${(props) => props.theme.colors.ui.secondary};
`;

const RemovePhotoButton = styled.TouchableOpacity`
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

const FeatureRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const FeatureSwitch = styled.Switch`
  margin-right: ${(props) => props.theme.space[2]};
`;

const BusinessHoursRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

const DayLabel = styled(CustomText)`
  width: 100px;
`;

const TimeInput = styled.TextInput`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[1]};
  border-radius: 5px;
  width: 80px;
  font-size: ${(props) => props.theme.fontSizes.body};
  text-align: center;
`;

const ClosedCheckbox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CuisineTag = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding-vertical: ${(props) => props.theme.space[1]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  border-radius: 20px;
  margin-right: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[1]};
  flex-direction: row;
  align-items: center;
`;

const CuisineTagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const AddCuisineButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding-vertical: ${(props) => props.theme.space[1]};
  padding-horizontal: ${(props) => props.theme.space[2]};
  border-radius: 20px;
  margin-bottom: ${(props) => props.theme.space[1]};
`;

// Main component
export const RestaurantEditScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newCuisine, setNewCuisine] = useState("");

  // Load restaurant data
  useEffect(() => {
    // In a real app, this would be a fetch call to your API
    setRestaurant(sampleRestaurantData);
    setLoading(false);
  }, []);

  const handleSave = () => {
    // In a real app, this would send the updated data to your API
    Alert.alert("Success", "Restaurant information saved successfully");
  };

  const handleAddPhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library"
        );
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (
        !pickerResult.cancelled &&
        pickerResult.assets &&
        pickerResult.assets.length > 0
      ) {
        setRestaurant((prev) => ({
          ...prev,
          photos: [...prev.photos, pickerResult.assets[0].uri],
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  };

  const handleRemovePhoto = (index) => {
    setRestaurant((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const updateTextValue = (field, value) => {
    setRestaurant((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedValue = (parent, field, value) => {
    setRestaurant((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const toggleFeature = (feature) => {
    setRestaurant((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }));
  };

  const updateBusinessHours = (day, field, value) => {
    setRestaurant((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value,
        },
      },
    }));
  };

  const toggleDayClosed = (day) => {
    const isClosed = restaurant.businessHours[day].isClosed;
    setRestaurant((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          isClosed: !isClosed,
        },
      },
    }));
  };

  const handleAddCuisine = () => {
    if (newCuisine.trim() === "") return;

    setRestaurant((prev) => ({
      ...prev,
      cuisine: [...prev.cuisine, newCuisine.trim()],
    }));
    setNewCuisine("");
  };

  const handleRemoveCuisine = (index) => {
    setRestaurant((prev) => ({
      ...prev,
      cuisine: prev.cuisine.filter((_, i) => i !== index),
    }));
  };

  if (loading || !restaurant) {
    return (
      <SafeArea>
        <Container>
          <CustomText>Loading restaurant information...</CustomText>
        </Container>
      </SafeArea>
    );
  }

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <SafeArea>
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#262626" />
          </TouchableOpacity>
          <HeaderTitle>Edit Restaurant</HeaderTitle>
          <SaveButton onPress={handleSave}>
            <SaveButtonText>Save</SaveButtonText>
          </SaveButton>
        </Header>

        {/* Basic Information Section */}
        <Section>
          <SectionTitle>BASIC INFORMATION</SectionTitle>

          <FormGroup>
            <Label>Restaurant Name</Label>
            <Input
              value={restaurant.name}
              onChangeText={(text) => updateTextValue("name", text)}
              placeholder="Enter restaurant name"
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <TextArea
              value={restaurant.description}
              onChangeText={(text) => updateTextValue("description", text)}
              placeholder="Enter restaurant description"
              multiline={true}
              numberOfLines={4}
            />
          </FormGroup>

          <FormGroup>
            <Label>Cuisine Types</Label>
            <CuisineTagsContainer>
              {restaurant.cuisine.map((cuisine, index) => (
                <CuisineTag key={index}>
                  <CustomText>{cuisine}</CustomText>
                  <TouchableOpacity
                    onPress={() => handleRemoveCuisine(index)}
                    style={{ marginLeft: 5 }}
                  >
                    <MaterialIcons name="close" size={16} color="#757575" />
                  </TouchableOpacity>
                </CuisineTag>
              ))}
            </CuisineTagsContainer>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Input
                value={newCuisine}
                onChangeText={setNewCuisine}
                placeholder="Add new cuisine type"
                style={{ flex: 1, marginRight: 10 }}
              />
              <AddCuisineButton onPress={handleAddCuisine}>
                <MaterialIcons name="add" size={16} color="#262626" />
                <CustomText>Add</CustomText>
              </AddCuisineButton>
            </View>
          </FormGroup>
        </Section>

        {/* Contact & Location Section */}
        <Section>
          <SectionTitle>CONTACT & LOCATION</SectionTitle>

          <FormGroup>
            <Label>Street Address</Label>
            <Input
              value={restaurant.address.street}
              onChangeText={(text) =>
                updateNestedValue("address", "street", text)
              }
              placeholder="Enter street address"
            />
          </FormGroup>

          <FormGroup>
            <Label>City</Label>
            <Input
              value={restaurant.address.city}
              onChangeText={(text) =>
                updateNestedValue("address", "city", text)
              }
              placeholder="Enter city"
            />
          </FormGroup>

          <FormGroup>
            <Label>State/Province</Label>
            <Input
              value={restaurant.address.state}
              onChangeText={(text) =>
                updateNestedValue("address", "state", text)
              }
              placeholder="Enter state/province"
            />
          </FormGroup>

          <FormGroup>
            <Label>Postal Code</Label>
            <Input
              value={restaurant.address.postalCode}
              onChangeText={(text) =>
                updateNestedValue("address", "postalCode", text)
              }
              placeholder="Enter postal code"
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              value={restaurant.phoneNumber}
              onChangeText={(text) => updateTextValue("phoneNumber", text)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              value={restaurant.email}
              onChangeText={(text) => updateTextValue("email", text)}
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </FormGroup>

          <FormGroup>
            <Label>Website</Label>
            <Input
              value={restaurant.website}
              onChangeText={(text) => updateTextValue("website", text)}
              placeholder="Enter website URL"
              keyboardType="url"
              autoCapitalize="none"
            />
          </FormGroup>
        </Section>

        {/* Photos Section */}
        <Section>
          <SectionTitle>PHOTOS</SectionTitle>

          <FormGroup>
            <Label>Restaurant Photos</Label>
            <PhotoContainer>
              {restaurant.photos.map((photo, index) => (
                <PhotoItem key={index}>
                  <PhotoImage source={{ uri: photo }} />
                  <RemovePhotoButton onPress={() => handleRemovePhoto(index)}>
                    <MaterialIcons name="close" size={16} color="white" />
                  </RemovePhotoButton>
                </PhotoItem>
              ))}
              <AddPhotoButton onPress={handleAddPhoto}>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={24}
                  color="#757575"
                />
              </AddPhotoButton>
            </PhotoContainer>
          </FormGroup>
        </Section>

        {/* Business Hours Section */}
        <Section>
          <SectionTitle>BUSINESS HOURS</SectionTitle>

          {daysOfWeek.map((day) => (
            <BusinessHoursRow key={day}>
              <DayLabel style={{ textTransform: "capitalize" }}>{day}</DayLabel>
              <TimeInput
                value={restaurant.businessHours[day].open}
                onChangeText={(text) => updateBusinessHours(day, "open", text)}
                placeholder="09:00"
                editable={!restaurant.businessHours[day].isClosed}
              />
              <CustomText>to</CustomText>
              <TimeInput
                value={restaurant.businessHours[day].close}
                onChangeText={(text) => updateBusinessHours(day, "close", text)}
                placeholder="22:00"
                editable={!restaurant.businessHours[day].isClosed}
              />
              <ClosedCheckbox onPress={() => toggleDayClosed(day)}>
                <MaterialIcons
                  name={
                    restaurant.businessHours[day].isClosed
                      ? "check-box"
                      : "check-box-outline-blank"
                  }
                  size={24}
                  color="#262626"
                />
                <CustomText>Closed</CustomText>
              </ClosedCheckbox>
            </BusinessHoursRow>
          ))}

          <FormGroup style={{ marginTop: 10 }}>
            <FeatureRow>
              <FeatureSwitch
                value={restaurant.isClosedTemporarily}
                onValueChange={() =>
                  updateTextValue(
                    "isClosedTemporarily",
                    !restaurant.isClosedTemporarily
                  )
                }
              />
              <Label>Temporarily Closed</Label>
            </FeatureRow>
          </FormGroup>
        </Section>

        {/* Features & Amenities Section */}
        <Section>
          <SectionTitle>FEATURES & AMENITIES</SectionTitle>

          <FormGroup>
            <FeatureRow>
              <FeatureSwitch
                value={restaurant.features.hasWifi}
                onValueChange={() => toggleFeature("hasWifi")}
              />
              <Label>Wi-Fi Available</Label>
            </FeatureRow>

            <FeatureRow>
              <FeatureSwitch
                value={restaurant.features.hasParking}
                onValueChange={() => toggleFeature("hasParking")}
              />
              <Label>Parking Available</Label>
            </FeatureRow>

            <FeatureRow>
              <FeatureSwitch
                value={restaurant.features.isWheelchairAccessible}
                onValueChange={() => toggleFeature("isWheelchairAccessible")}
              />
              <Label>Wheelchair Accessible</Label>
            </FeatureRow>

            <FeatureRow>
              <FeatureSwitch
                value={restaurant.features.allowsPets}
                onValueChange={() => toggleFeature("allowsPets")}
              />
              <Label>Pet Friendly</Label>
            </FeatureRow>

            <FeatureRow>
              <FeatureSwitch
                value={restaurant.features.hasOutdoorSeating}
                onValueChange={() => toggleFeature("hasOutdoorSeating")}
              />
              <Label>Outdoor Seating</Label>
            </FeatureRow>

            <FeatureRow>
              <FeatureSwitch
                value={restaurant.features.hasTakeout}
                onValueChange={() => toggleFeature("hasTakeout")}
              />
              <Label>Takeout Available</Label>
            </FeatureRow>

            <FeatureRow>
              <FeatureSwitch
                value={restaurant.features.hasDelivery}
                onValueChange={() => toggleFeature("hasDelivery")}
              />
              <Label>Delivery Available</Label>
            </FeatureRow>

            <FeatureRow>
              <FeatureSwitch
                value={restaurant.features.acceptsReservations}
                onValueChange={() => toggleFeature("acceptsReservations")}
              />
              <Label>Accepts Reservations</Label>
            </FeatureRow>
          </FormGroup>
        </Section>

        {/* Social Media Section */}
        <Section>
          <SectionTitle>SOCIAL MEDIA</SectionTitle>

          <FormGroup>
            <Label>Instagram</Label>
            <Input
              value={restaurant.socialMedia.instagram}
              onChangeText={(text) =>
                updateNestedValue("socialMedia", "instagram", text)
              }
              placeholder="Instagram URL"
              autoCapitalize="none"
            />
          </FormGroup>

          <FormGroup>
            <Label>Facebook</Label>
            <Input
              value={restaurant.socialMedia.facebook}
              onChangeText={(text) =>
                updateNestedValue("socialMedia", "facebook", text)
              }
              placeholder="Facebook URL"
              autoCapitalize="none"
            />
          </FormGroup>

          <FormGroup>
            <Label>Twitter</Label>
            <Input
              value={restaurant.socialMedia.twitter}
              onChangeText={(text) =>
                updateNestedValue("socialMedia", "twitter", text)
              }
              placeholder="Twitter URL"
              autoCapitalize="none"
            />
          </FormGroup>

          <FormGroup>
            <Label>Yelp</Label>
            <Input
              value={restaurant.socialMedia.yelp}
              onChangeText={(text) =>
                updateNestedValue("socialMedia", "yelp", text)
              }
              placeholder="Yelp URL"
              autoCapitalize="none"
            />
          </FormGroup>
        </Section>

        {/* Reservation Settings Section */}
        <Section>
          <SectionTitle>RESERVATION SETTINGS</SectionTitle>

          <FormGroup>
            <Label>Time Slot Duration (minutes)</Label>
            <Input
              value={restaurant.settings.reservationTimeSlotDuration.toString()}
              onChangeText={(text) => {
                const value = parseInt(text) || 0;
                updateNestedValue(
                  "settings",
                  "reservationTimeSlotDuration",
                  value
                );
              }}
              placeholder="30"
              keyboardType="number-pad"
            />
          </FormGroup>

          <FormGroup>
            <Label>Maximum Party Size</Label>
            <Input
              value={restaurant.settings.maxReservationSize.toString()}
              onChangeText={(text) => {
                const value = parseInt(text) || 0;
                updateNestedValue("settings", "maxReservationSize", value);
              }}
              placeholder="20"
              keyboardType="number-pad"
            />
          </FormGroup>

          <FormGroup>
            <Label>Minimum Advance Notice (hours)</Label>
            <Input
              value={restaurant.settings.reservationLeadTime.toString()}
              onChangeText={(text) => {
                const value = parseInt(text) || 0;
                updateNestedValue("settings", "reservationLeadTime", value);
              }}
              placeholder="1"
              keyboardType="number-pad"
            />
          </FormGroup>

          <FormGroup>
            <FeatureRow>
              <FeatureSwitch
                value={restaurant.settings.automaticConfirmation}
                onValueChange={() =>
                  updateNestedValue(
                    "settings",
                    "automaticConfirmation",
                    !restaurant.settings.automaticConfirmation
                  )
                }
              />
              <Label>Automatic Reservation Confirmation</Label>
            </FeatureRow>
          </FormGroup>
        </Section>
      </Container>
    </SafeArea>
  );
};
