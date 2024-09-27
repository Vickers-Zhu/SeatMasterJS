// components/ErrorBoundary.js
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

/**
 * ErrorBoundary Component
 * Catches JavaScript errors in its child component tree, logs those errors,
 * and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /**
   * Update state so the next render will show the fallback UI.
   * @param {Error} error - The error that was thrown.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * You can also log the error to an error reporting service.
   * @param {Error} error - The error that was thrown.
   * @param {Object} errorInfo - Additional information about the error.
   */
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Example: Log error to an external service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can integrate services like Sentry or Bugsnag here.
  }

  /**
   * Optionally, provide a method to reset the error state.
   */
  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Render any custom fallback UI
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong.</ErrorTitle>
          <ErrorMessage>
            We're sorry for the inconvenience. Please try again later.
          </ErrorMessage>
          {/* Optional: Button to reset the error state */}
          <RetryButton onPress={this.resetError}>
            <RetryButtonText>Try Again</RetryButtonText>
          </RetryButton>
          {/* Optional: Display error details in development mode */}
          {__DEV__ && this.state.errorInfo && (
            <ErrorDetails>
              <ErrorDetailsTitle>Error Details:</ErrorDetailsTitle>
              <ErrorDetailsText>{this.state.error.toString()}</ErrorDetailsText>
              <ErrorDetailsText>
                {this.state.errorInfo.componentStack}
              </ErrorDetailsText>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    // If no error, render children components normally
    return this.props.children;
  }
}

// Styled Components for the ErrorBoundary UI
const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
`;

const ErrorTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.error};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const ErrorMessage = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const RetryButton = styled(TouchableOpacity)`
  padding-vertical: ${({ theme }) => theme.space[2]};
  padding-horizontal: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.ui.primary};
  border-radius: 5px;
`;

const RetryButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.button};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ErrorDetails = styled.View`
  margin-top: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[2]};
  background-color: #f8d7da;
  border-radius: 5px;
`;

const ErrorDetailsTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.error};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

const ErrorDetailsText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.text.error};
`;

export default ErrorBoundary;
