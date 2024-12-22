import styled from "styled-components/native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Formik } from "formik";
import * as yup from "yup";
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

// Country codes
const countryCodes = [
  { label: "🇺🇸 +1", value: "+1" },
  { label: "🇮🇳 +91", value: "+91" },
  { label: "🇬🇧 +44", value: "+44" },
  { label: "🇯🇵 +81", value: "+81" },
  { label: "🇨🇳 +86", value: "+86" },
];

export const LoginScreen = () => {
  const [selectedCode, setSelectedCode] = useState("+1");
  const [open, setOpen] = useState(false);

  const handleLogin = (values) => {
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
            <InputContainer style={{ zIndex: 9000, elevation: 9000 }}>
              <FlexContainer>
                <View style={{ flex: 0.29, marginRight: "2%" }}>
                  <DropDownPicker
                    open={open}
                    value={selectedCode}
                    items={countryCodes}
                    setOpen={setOpen}
                    setValue={setSelectedCode}
                    placeholder="Select"
                    containerStyle={{
                      width: "100%", // Occupies the parent's 30%
                    }}
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderColor: "#ccc",
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#ccc",
                    }}
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

// Must import View from react-native for the wrapper
import { View } from "react-native";
