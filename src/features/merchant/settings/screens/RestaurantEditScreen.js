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

import { BackButton } from "../../../../components/BackButton/BackButton";
import { SafeArea } from "../../../../components/SafeArea/SafeArea";
import { CustomText } from "../../../../components/CustomText/CustomText";

import { sampleRestaurantData } from "../../../../data/mockEditRestaurantData";
import {
  Container,
  Header,
  HeaderTitle,
  SaveButton,
  SaveButtonText,
  Section,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  TextArea,
  PhotoContainer,
  PhotoItem,
  PhotoImage,
  AddPhotoButton,
  RemovePhotoButton,
  FeatureRow,
  FeatureSwitch,
  BusinessHoursRow,
  DayLabel,
  TimeInput,
  ClosedCheckbox,
  CuisineTag,
  CuisineTagsContainer,
  AddCuisineButton,
} from "./RestaurantEditScreen.styles";

export const RestaurantEditScreen = ({ route, navigation }) => {
  // Get restaurant data from route params or use sample data
  const [restaurant, setRestaurant] = useState(
    route.params?.restaurant || sampleRestaurantData
  );
  const [loading, setLoading] = useState(true);
  const [newCuisine, setNewCuisine] = useState("");

  // Load restaurant data
  useEffect(() => {
    // In a real app, this would be a fetch call to your API
    const initialData = route.params?.restaurant || sampleRestaurantData;

    // Ensure all required properties exist to prevent rendering errors
    const completeData = {
      ...sampleRestaurantData,
      ...initialData,
      // Ensure nested objects exist
      address: {
        ...sampleRestaurantData.address,
        ...(initialData.address || {}),
      },
      businessHours: {
        ...sampleRestaurantData.businessHours,
        ...(initialData.businessHours || {}),
      },
      features: {
        ...sampleRestaurantData.features,
        ...(initialData.features || {}),
      },
      settings: {
        ...sampleRestaurantData.settings,
        ...(initialData.settings || {}),
      },
      socialMedia: {
        ...sampleRestaurantData.socialMedia,
        ...(initialData.socialMedia || {}),
      },
    };

    setRestaurant(completeData);
    setLoading(false);
  }, [route.params?.restaurant]);

  const handleSave = () => {
    // In a real app, this would send the updated data to your API
    Alert.alert("Success", "Restaurant information saved successfully", [
      {
        text: "OK",
        onPress: () => {
          // Call the callback function if it exists

          // Use the correct screen name based on the navigator structure
          navigation.navigate("RestaurantDetail", {
            updatedRestaurant: restaurant,
            isMerchantView: true,
          });
        },
      },
    ]);
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
        !pickerResult.canceled && // Note: Changed from 'cancelled' to 'canceled' for newer Expo
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
          <BackButton position="relative" />
          <HeaderTitle>Edit Restaurant</HeaderTitle>
          <SaveButton onPress={handleSave}>
            <SaveButtonText>Save</SaveButtonText>
          </SaveButton>
        </Header>

        {/* BASIC INFORMATION */}
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

        {/* CONTACT & LOCATION */}
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

        {/* PHOTOS */}
        <Section>
          <SectionTitle>PHOTOS</SectionTitle>

          <FormGroup>
            <Label>Restaurant Photos</Label>
            <PhotoContainer>
              {Array.isArray(restaurant.photos) &&
                restaurant.photos.map((photo, index) => (
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

        {/* BUSINESS HOURS */}
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

        {/* FEATURES & AMENITIES */}
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

        {/* SOCIAL MEDIA */}
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

        {/* RESERVATION SETTINGS */}
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
