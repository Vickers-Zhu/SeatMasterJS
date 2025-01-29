import styled from "styled-components/native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Formik } from "formik";
import * as yup from "yup";
import { View } from "react-native";
import { countryCodes } from "../../../data/mockData"; // Import from mockData

import {
  Container,
  Logo,
  InputContainer,
  FlexContainer,
  TextInput,
  Button,
  ButtonText,
  LinkText,
  ErrorText,
  TitleText,
} from "./LoginScreen.styles";

import LoginDropDownPicker from "../components/LoginDropDownPicker";

// Validation
const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [containerWidth, setContainerWidth] = useState(380);

  const handleLogin = (values) => {
    const selectedCode =
      countryCodes.find((country) => country.countryName === selectedCountry)
        ?.code || "+1"; // Default to US code if not found

    console.log("Login Successful", {
      phone: `${selectedCode}${values.phone}`,
      password: values.password,
    });
    // Add your login logic here
  };

  return (
    <Container>
      <Logo source={require("../../../../assets/images/splash copy.png")} />
      <TitleText variant="title">Login</TitleText>

      <Formik
        initialValues={{ phone: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <InputContainer
              style={{ zIndex: 2000, elevation: 2000 }}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
              }}
            >
              <FlexContainer>
                <View
                  style={{
                    flex: 0.29,
                    marginRight: "2%",
                    zIndex: 9000,
                    elevation: 9000,
                  }}
                >
                  <LoginDropDownPicker
                    countryCodes={countryCodes}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    containerWidth={containerWidth}
                  />
                </View>
                <View style={{ flex: 0.71 }}>
                  <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#9C9C9C"
                    keyboardType="number-pad"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                  />
                </View>
              </FlexContainer>

              {errors.phone && touched.phone && (
                <ErrorText>{errors.phone}</ErrorText>
              )}
            </InputContainer>

            {/* Password Input */}
            <InputContainer>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9C9C9C"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}
            </InputContainer>

            {/* Login Button */}
            <Button onPress={handleSubmit} disabled={!isValid}>
              <ButtonText>Login</ButtonText>
            </Button>

            {/* Sign Up Link */}
            <LinkText onPress={() => console.log("Navigate to SignUp")}>
              Don't have an account? Sign Up
            </LinkText>
          </>
        )}
      </Formik>
    </Container>
  );
};
