// src/features/merchant/reservations/utils/reservationUtils.js
export const getChairRows = (chairs, perRow = 2) => {
  const rows = [];
  for (let i = 0; i < chairs.length; i += perRow) {
    rows.push(chairs.slice(i, i + perRow));
  }
  return rows;
};

export const getReservationPosition = (
  reservation,
  tables,
  counterSeats,
  tableWidth,
  counterSeatWidth,
  timeSlotHeight,
  isCounterSeat = false
) => {
  if (isCounterSeat) {
    // For counter seats, calculate position based on the index of the counter seat
    const counterSeatIndex = counterSeats.findIndex(
      (seat) => seat.id === reservation.counterSeatId
    );

    if (counterSeatIndex === -1) return null;

    // Position within the counter seats section (counter seats come first)
    const left = counterSeatIndex * counterSeatWidth + 2;

    // Parse time to calculate top position
    const [hours, minutes] = reservation.time.split(":").map(Number);
    const startMinutes = (hours - 9) * 60 + minutes;
    const top = (startMinutes / 30) * timeSlotHeight + 1;

    const height = (reservation.duration / 30) * timeSlotHeight - 2;

    return {
      left,
      top,
      width: counterSeatWidth - 4,
      height,
    };
  } else {
    // For regular tables
    const tableIndex = tables.findIndex(
      (table) => table.id === reservation.tableId
    );

    if (tableIndex === -1) return null;

    // Position after the counter seats section
    const counterSeatsWidth = counterSeats.length * counterSeatWidth;
    const left = counterSeatsWidth + tableIndex * tableWidth + 2;

    const [hours, minutes] = reservation.time.split(":").map(Number);
    const startMinutes = (hours - 9) * 60 + minutes;
    const top = (startMinutes / 30) * timeSlotHeight + 1;

    const height = (reservation.duration / 30) * timeSlotHeight - 2;

    return {
      left,
      top,
      width: tableWidth - 4,
      height,
    };
  }
};

export const calculateCurrentTimePosition = (timeSlotHeight) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours < 9 || (hours === 22 && minutes > 30) || hours > 22) {
    return -100;
  }

  const minutesSince9AM = (hours - 9) * 60 + minutes;

  return (minutesSince9AM / 30) * timeSlotHeight;
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 22; hour++) {
    const hourStr = hour.toString().padStart(2, "0");
    slots.push(`${hourStr}:00`);
    slots.push(`${hourStr}:30`);
  }
  return slots;
};
