// src/services/ReservationContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { Alert } from "react-native";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load reservations from storage on component mount
  useEffect(() => {
    loadReservations();
  }, []);

  // Save reservations to AsyncStorage whenever they change
  useEffect(() => {
    if (!loading) {
      saveReservations();
    }
  }, [reservations]);

  const loadReservations = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@reservations");
      const savedReservations = jsonValue ? JSON.parse(jsonValue) : [];

      // Convert string dates back to Date objects
      const formattedReservations = savedReservations.map((reservation) => ({
        ...reservation,
        date: new Date(reservation.date),
      }));

      setReservations(formattedReservations);
    } catch (error) {
      console.error("Failed to load reservations:", error);
      Alert.alert("Error", "Failed to load your reservations");
    } finally {
      setLoading(false);
    }
  };

  const saveReservations = async () => {
    try {
      // Convert Date objects to strings for storage
      const formattedReservations = reservations.map((reservation) => ({
        ...reservation,
        date:
          reservation.date instanceof Date
            ? reservation.date.toISOString()
            : reservation.date,
      }));

      await AsyncStorage.setItem(
        "@reservations",
        JSON.stringify(formattedReservations)
      );
    } catch (error) {
      console.error("Failed to save reservations:", error);
    }
  };

  const addReservation = (reservationData) => {
    // Generate unique ID
    const id = Math.floor(Math.random() * 1000000).toString();
    const newReservation = {
      ...reservationData,
      id,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [...prev, newReservation]);
    return newReservation;
  };

  const cancelReservation = (reservationId) => {
    return new Promise((resolve, reject) => {
      try {
        setReservations((prevReservations) =>
          prevReservations.map((res) =>
            res.id === reservationId ? { ...res, status: "cancelled" } : res
          )
        );
        resolve(true);
      } catch (error) {
        console.error("Error cancelling reservation:", error);
        reject(error);
      }
    });
  };

  const updateReservation = (reservationId, updatedData) => {
    return new Promise((resolve, reject) => {
      try {
        setReservations((prevReservations) =>
          prevReservations.map((res) =>
            res.id === reservationId ? { ...res, ...updatedData } : res
          )
        );
        resolve(true);
      } catch (error) {
        console.error("Error updating reservation:", error);
        reject(error);
      }
    });
  };

  const getUpcomingReservations = () => {
    const now = new Date();
    return reservations
      .filter((res) => {
        const resDate = new Date(res.date);
        return (
          res.status !== "cancelled" &&
          (resDate > now ||
            (resDate.getDate() === now.getDate() &&
              resDate.getMonth() === now.getMonth() &&
              resDate.getFullYear() === now.getFullYear() &&
              parseInt(res.time.split(":")[0]) >= now.getHours()))
        );
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getPastReservations = () => {
    const now = new Date();
    return reservations
      .filter((res) => {
        const resDate = new Date(res.date);
        return (
          res.status !== "cancelled" &&
          (resDate < now ||
            (resDate.getDate() === now.getDate() &&
              resDate.getMonth() === now.getMonth() &&
              resDate.getFullYear() === now.getFullYear() &&
              parseInt(res.time.split(":")[0]) < now.getHours()))
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first
  };

  const getCancelledReservations = () => {
    return reservations
      .filter((res) => res.status === "cancelled")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <ReservationContext.Provider
      value={{
        isLoading: loading,
        reservations,
        addReservation,
        cancelReservation,
        updateReservation,
        getUpcomingReservations,
        getPastReservations,
        getCancelledReservations,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);
