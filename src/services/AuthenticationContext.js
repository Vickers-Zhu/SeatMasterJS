// src/features/services/AuthenticationContext.js
import React, { useState, createContext, useContext } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy login function simulating an API call with role parameter
  const onLogin = async (username, password, role) => {
    setIsLoading(true);
    setError(null);

    // Simulate network delay and dummy validation
    setTimeout(() => {
      // Replace this logic with your real API call later
      if (username === "+1123" && password === "123123") {
        setUser({ username, role });
      } else {
        setError("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Dummy register function simulating an API call with role parameter
  const onRegister = async (username, password, repeatedPassword, role) => {
    setIsLoading(true);
    setError(null);

    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Simulate network delay and registration success
    setTimeout(() => {
      // Replace this logic with your real API call later
      setUser({ username, role });
      setIsLoading(false);
    }, 1000);
  };

  const onLogout = () => {
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

// Custom hook for easier context consumption
export const useAuthentication = () => useContext(AuthenticationContext);
