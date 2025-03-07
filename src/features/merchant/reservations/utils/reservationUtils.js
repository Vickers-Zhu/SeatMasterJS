// src/features/merchant/reservations/utils/reservationUtils.js

/**
 * Organizes chairs into rows for display
 * @param {Array} chairs - Array of chair objects or IDs
 * @param {Number} perRow - Number of chairs per row
 * @returns {Array} Array of arrays, each representing a row of chairs
 */
export const getChairRows = (chairs, perRow = 2) => {
  const rows = [];
  for (let i = 0; i < chairs.length; i += perRow) {
    rows.push(chairs.slice(i, i + perRow));
  }
  return rows;
};

/**
 * Calculates the position for a reservation block in the grid
 * @param {Object} reservation - Reservation object with time, duration and tableId
 * @param {Array} tables - Array of table objects
 * @param {Number} tableWidth - Width of a table column in pixels
 * @param {Number} timeSlotHeight - Height of a time slot in pixels
 * @returns {Object|null} Position object with left, top, width, height or null if table not found
 */
export const getReservationPosition = (
  reservation,
  tables,
  tableWidth,
  timeSlotHeight
) => {
  // Find the table index
  const tableIndex = tables.findIndex(
    (table) => table.id === reservation.tableId
  );
  if (tableIndex === -1) return null;

  // Calculate left position based on table index
  const left = tableIndex * tableWidth + 2; // +2 for small margin

  // Calculate top position based on time
  const [hours, minutes] = reservation.time.split(":").map(Number);
  const startMinutes = (hours - 9) * 60 + minutes;
  const top = (startMinutes / 30) * timeSlotHeight + 1; // +1 for small margin

  // Calculate height based on duration
  const height = (reservation.duration / 30) * timeSlotHeight - 2; // -2 for small margin

  return {
    left,
    top,
    width: tableWidth - 4, // -4 for small margin
    height,
  };
};

/**
 * Calculates the current time position in the grid
 * @param {Number} timeSlotHeight - Height of a time slot in pixels
 * @returns {Number} Position in pixels from the top of the grid
 */
export const calculateCurrentTimePosition = (timeSlotHeight) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Only show the line during business hours (9AM to 10:30PM)
  if (hours < 9 || (hours === 22 && minutes > 30) || hours > 22) {
    return -100; // Hide it off-screen
  }

  // Calculate minutes since 9AM
  const minutesSince9AM = (hours - 9) * 60 + minutes;
  // Convert to pixel position (30min = timeSlotHeight)
  return (minutesSince9AM / 30) * timeSlotHeight;
};

/**
 * Generates time slots for the reservation grid
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
