// src/features/auth/screens/LoginScreen.js

import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Logo,
  InputContainer,
  TextInput,
  Button,
  ButtonText,
  LinkText,
  ErrorText,
  TitleText,
} from "./LoginScreen.styles";

// Validation Schema
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Component
export const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = (values) => {
    console.log("Login Successful", values);
    // Add your login logic here
  };

  return (
    <Container>
      <Logo source={require("../../../../assets/images/splash copy.png")} />
      <TitleText variant="title">Login</TitleText>

      <Formik
        initialValues={{ email: "", password: "" }}
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
            {/* Email Input */}
            <InputContainer>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#9C9C9C" // Matches the 'disabled' text color
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}
            </InputContainer>

            {/* Password Input */}
            <InputContainer>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9C9C9C" // Matches the 'disabled' text color
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

            {/* Forgot Password */}
            <LinkText onPress={() => navigation.navigate("ForgotPassword")}>
              Forgot Password?
            </LinkText>

            {/* Login Button */}
            <Button onPress={handleSubmit} disabled={!isValid}>
              <ButtonText>Login</ButtonText>
            </Button>

            {/* Sign Up Link */}
            <LinkText onPress={() => navigation.navigate("SignUp")}>
              Don't have an account? Sign Up
            </LinkText>
          </>
        )}
      </Formik>
    </Container>
  );
};
