// src/features/merchant/reservations/utils/timeUtils.js

/**
 * Generate time slots from 9:00 to 22:30 in 30-minute intervals
 * @returns {Array} Array of time strings in format "HH:MM"
 */
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 22; hour++) {
    const hourStr = hour.toString().padStart(2, "0");
    slots.push(`${hourStr}:00`);
    slots.push(`${hourStr}:30`);
  }
  return slots;
};

/**
 * Calculate position of current time indicator in the grid
 * @param {number} timeSlotHeight - Height of a single time slot in pixels
 * @returns {number} Vertical position for the current time indicator
 */
export const calculateCurrentTimePosition = (timeSlotHeight) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // If outside business hours (9AM-10:30PM), return a position that's off-screen
  if (hours < 9 || (hours === 22 && minutes > 30) || hours > 22) {
    return -100;
  }

  const minutesSince9AM = (hours - 9) * 60 + minutes;
  return (minutesSince9AM / 30) * timeSlotHeight;
};

/**
 * Parse a time string into hours and minutes
 * @param {string} timeString - Time in format "HH:MM"
 * @returns {Array} Array containing [hours, minutes] as numbers
 */
export const parseTimeString = (timeString) => {
  return timeString.split(":").map(Number);
};

/**
 * Convert time to minutes since 9AM (start of business day)
 * @param {string} timeString - Time in format "HH:MM"
 * @returns {number} Minutes since 9AM
 */
export const convertToMinutesSince9AM = (timeString) => {
  const [hours, minutes] = parseTimeString(timeString);
  return (hours - 9) * 60 + minutes;
};

/**
 * Calculate time slot index for a given time
 * @param {string} timeString - Time in format "HH:MM"
 * @returns {number} Index in the time slots array
 */
export const getTimeSlotIndex = (timeString) => {
  const minutesSince9AM = convertToMinutesSince9AM(timeString);
  return Math.floor(minutesSince9AM / 30);
};

/**
 * Format a Date object to HH:MM string
 * @param {Date} date - Date object
 * @returns {string} Formatted time string
 */
export const formatTimeFromDate = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

/**
 * Generate an array of times for the current day in hourly increments
 * @param {number} count - Number of time slots to generate
 * @returns {Array} Array of time strings in format "HH:MM"
 */
export const generateCurrentDayTimes = (count = 5) => {
  let timesArray = [];
  let current = new Date();
  current.setSeconds(0);
  current.setMilliseconds(0);

  // Round to nearest 30 minutes
  const minutes = current.getMinutes();
  current.setMinutes(minutes >= 30 ? 30 : 0);

  for (let i = 0; i < count; i++) {
    timesArray.push(formatTimeFromDate(current));
    current.setMinutes(current.getMinutes() + 30);
  }
  return timesArray;
};
