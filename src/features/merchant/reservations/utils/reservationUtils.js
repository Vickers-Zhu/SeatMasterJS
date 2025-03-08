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
    const counterSeatIndex = counterSeats.findIndex(
      (seat) => seat.id === reservation.counterSeatId
    );

    if (counterSeatIndex === -1) return null;

    const left = counterSeatIndex * counterSeatWidth;

    const [hours, minutes] = reservation.time.split(":").map(Number);
    const startMinutes = (hours - 9) * 60 + minutes;
    const top = (startMinutes / 30) * timeSlotHeight;

    const height = (reservation.duration / 30) * timeSlotHeight;

    return {
      left,
      top,
      width: counterSeatWidth, // Remove -4 to fully cover the width
      height,
    };
  } else {
    const tableIndex = tables.findIndex(
      (table) => table.id === reservation.tableId
    );

    if (tableIndex === -1) return null;

    const counterSeatsWidth = counterSeats.length * counterSeatWidth;
    const left = counterSeatsWidth + tableIndex * tableWidth;

    const [hours, minutes] = reservation.time.split(":").map(Number);
    const startMinutes = (hours - 9) * 60 + minutes;
    const top = (startMinutes / 30) * timeSlotHeight;

    const height = (reservation.duration / 30) * timeSlotHeight;

    return {
      left,
      top,
      width: tableWidth, // Remove -4 to fully cover the width
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
