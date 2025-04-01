// src/data/mockData.js

// Existing mock data...
export const restaurants = [
  {
    name: "La Piazza",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ],
    address: "123 Piazza Street",
    isOpenNow: true,
    rating: 4.5,
    isClosedTemporarily: false,
    placeId: "1",
  },
  {
    name: "Sushi World",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos: ["https://images.unsplash.com/photo-1553621042-f6e147245754"],
    address: "456 Sushi Lane",
    isOpenNow: true,
    rating: 5,
    isClosedTemporarily: false,
    placeId: "2",
  },
  {
    name: "Burger House",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos: ["https://images.unsplash.com/photo-1550547660-d9450f859349"],
    address: "789 Burger Blvd",
    isOpenNow: false,
    rating: 3.8,
    isClosedTemporarily: false,
    placeId: "3",
  },
  {
    name: "Ocean Breeze Café",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos: [
      "https://images.unsplash.com/photo-1544511916-0148ccdeb877?auto=format&fit=crop&w=400&q=60",
    ],
    address: "101 Ocean Drive",
    isOpenNow: true,
    rating: 4.2,
    isClosedTemporarily: false,
    placeId: "4",
  },
];

export const reservations = [
  {
    id: 1,
    restaurant: restaurants[0],
    date: "2024-04-01",
    time: "7:00 PM",
    seatsNumber: 4,
    status: "Confirmed",
  },
  {
    id: 2,
    restaurant: restaurants[1],
    date: "2024-03-15",
    time: "6:30 PM",
    seatsNumber: 2,
    status: "Completed",
  },
  {
    id: 3,
    restaurant: restaurants[2],
    date: "2024-03-20",
    time: "6:00 PM",
    seatsNumber: 3,
    status: "Completed",
  },
  {
    id: 4,
    restaurant: restaurants[3],
    date: "2024-03-28",
    time: "6:00 PM",
    seatsNumber: 3,
    status: "Completed",
  },
];

export const countryCodes = [
  {
    flag: "🇺🇸",
    countryName: "United States",
    code: "+1",
  },
  {
    flag: "🇬🇧",
    countryName: "United Kingdom",
    code: "+44",
  },
  {
    flag: "🇨🇦",
    countryName: "Canada",
    code: "+1",
  },
  {
    flag: "🇦🇺",
    countryName: "Australia",
    code: "+61",
  },
  {
    flag: "🇳🇿",
    countryName: "New Zealand",
    code: "+64",
  },
  {
    flag: "🇮🇳",
    countryName: "India",
    code: "+91",
  },
  {
    flag: "🇨🇳",
    countryName: "China",
    code: "+86",
  },
  {
    flag: "🇯🇵",
    countryName: "Japan",
    code: "+81",
  },
];

export const users = [
  {
    username: "Vickers Zhu",
    email: "****@example.com",
    profileImage: require("../../assets/images/user_profile.jpg"),
    phoneNumber: "+81 **** ****",
  },
];

export const tableStatuses = {
  "0-1": { id: 1, row: 0, col: 1, status: "empty" },
  "0-2": { id: 2, row: 0, col: 2, status: "empty" },
  "1-0": { id: 3, row: 1, col: 0, status: "empty" },
  "1-1": { id: 4, row: 1, col: 1, status: "occupied" },
  "1-2": { id: 5, row: 1, col: 2, status: "empty" },
  "1-3": { id: 6, row: 1, col: 3, status: "empty" },
  "2-0": { id: 7, row: 2, col: 0, status: "reserved" },
  "2-1": { id: 8, row: 2, col: 1, status: "empty" },
  "2-2": { id: 9, row: 2, col: 2, status: "empty" },
  "2-3": { id: 10, row: 2, col: 3, status: "occupied" },
  "3-1": { id: 11, row: 3, col: 1, status: "empty" },
  "3-2": { id: 12, row: 3, col: 2, status: "empty" },
};

export const seatingData = {
  tables: [
    {
      id: 1,
      chairs: [
        { id: "1A", status: "occupied" },
        { id: "1B", status: "empty" },
        { id: "1C", status: "empty" },
      ],
    },
    {
      id: 2,
      chairs: [
        { id: "2A", status: "empty" },
        { id: "2B", status: "empty" },
        { id: "2C", status: "reserved" },
        { id: "2D", status: "reserved" },
      ],
    },
    {
      id: 3,
      chairs: ["3A", "3B", "3C", "3D", "3E", "3F", "3G", "3H", "3I", "3J"].map(
        (chairId, index) => {
          if (index === 2 || index === 5) {
            return { id: chairId, status: "occupied" };
          }
          return { id: chairId, status: "empty" };
        }
      ),
    },
    {
      id: 4,
      chairs: [
        { id: "4A", status: "empty" },
        { id: "4B", status: "occupied" },
        { id: "4C", status: "empty" },
        { id: "4D", status: "empty" },
      ],
    },
    {
      id: 5,
      chairs: [
        { id: "5A", status: "empty" },
        { id: "5B", status: "reserved" },
        { id: "5C", status: "empty" },
      ],
    },
    {
      id: 6,
      chairs: [
        { id: "6A", status: "occupied" },
        { id: "6B", status: "occupied" },
      ],
    },
    {
      id: 7,
      chairs: ["7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H", "7I", "7J"].map(
        (chairId, index) => {
          return index % 3 === 0
            ? { id: chairId, status: "reserved" }
            : { id: chairId, status: "empty" };
        }
      ),
    },
    {
      id: 8,
      chairs: [
        { id: "8A", status: "empty" },
        { id: "8B", status: "occupied" },
      ],
    },
    {
      id: 9,
      chairs: [
        { id: "9A", status: "empty" },
        { id: "9B", status: "empty" },
        { id: "9C", status: "reserved" },
      ],
    },
    {
      id: 10,
      chairs: [
        "10A",
        "10B",
        "10C",
        "10D",
        "10E",
        "10F",
        "10G",
        "10H",
        "10I",
        "10J",
      ].map((chairId, index) => {
        if (index === 4) return { id: chairId, status: "occupied" };
        if (index === 7) return { id: chairId, status: "reserved" };
        return { id: chairId, status: "empty" };
      }),
    },
    {
      id: 11,
      chairs: [
        { id: "11A", status: "empty" },
        { id: "11B", status: "empty" },
      ],
    },
    {
      id: 12,
      chairs: [
        { id: "12A", status: "occupied" },
        { id: "12B", status: "empty" },
        { id: "12C", status: "empty" },
      ],
    },
  ],
  counterSeats: Array.from({ length: 30 }, (_, i) => ({
    id: `C${i + 1}`,
    status: i % 5 === 0 ? "occupied" : i % 7 === 0 ? "reserved" : "empty",
  })),
};

export const merchantReservations = [
  {
    id: 1,
    customerName: "John Smith",
    people: 2,
    time: "11:00",
    duration: 90,
    tableId: 2,
    chairs: ["2A", "2B"],
    status: "confirmed",
    note: "Anniversary celebration",
  },
  {
    id: 2,
    customerName: "Emma Wilson",
    people: 4,
    time: "12:30",
    duration: 120,
    tableId: 4,
    chairs: ["4A", "4B", "4C", "4D"],
    status: "pending",
    note: "Window seat preferred",
  },
  {
    id: 3,
    customerName: "David Lee",
    people: 1,
    time: "13:00",
    duration: 60,
    tableId: 6,
    chairs: ["6A"],
    status: "confirmed",
    note: "",
  },
  {
    id: 4,
    customerName: "Sarah Johnson",
    people: 3,
    time: "15:30",
    duration: 90,
    tableId: 1,
    chairs: ["1A", "1B", "1C"],
    status: "confirmed",
    note: "Allergic to nuts",
  },
  {
    id: 5,
    customerName: "Michael Brown",
    people: 2,
    time: "18:00",
    duration: 120,
    tableId: 5,
    chairs: ["5A", "5B"],
    status: "confirmed",
    note: "Birthday celebration",
  },
  {
    id: 9,
    customerName: "Lisa Wong",
    people: 3,
    time: "17:00",
    duration: 90,
    tableId: 7,
    chairs: ["7A", "7D", "7G"],
    status: "confirmed",
    note: "Family dinner",
  },
  {
    id: 10,
    customerName: "Tom Garcia",
    people: 2,
    time: "19:00",
    duration: 60,
    tableId: 10,
    chairs: ["10E"],
    status: "confirmed",
    note: "Quick business dinner",
  },
  {
    id: 11,
    customerName: "Rachel Kim",
    people: 2,
    time: "16:30",
    duration: 90,
    tableId: 12,
    chairs: ["12A"],
    status: "confirmed",
    note: "Late lunch",
  },
  {
    id: 12,
    customerName: "Mark Rodriguez",
    people: 1,
    time: "20:00",
    duration: 60,
    tableId: 8,
    chairs: ["8B"],
    status: "confirmed",
    note: "Solo dinner",
  },
  // Counter seat reservations
  {
    id: 6,
    customerName: "Alex Chen",
    people: 1,
    time: "10:00",
    duration: 60,
    counterSeatId: "C3",
    isCounterSeat: true,
    status: "confirmed",
    note: "Business breakfast",
  },
  {
    id: 7,
    customerName: "Jessica Miller",
    people: 1,
    time: "14:00",
    duration: 90,
    counterSeatId: "C7",
    isCounterSeat: true,
    status: "confirmed",
    note: "Solo diner",
  },
  {
    id: 8,
    customerName: "Robert Taylor",
    people: 1,
    time: "19:30",
    duration: 60,
    counterSeatId: "C15",
    isCounterSeat: true,
    status: "pending",
    note: "Late dinner",
  },
  {
    id: 13,
    customerName: "Emily Chen",
    people: 1,
    time: "11:30",
    duration: 45,
    counterSeatId: "C10",
    isCounterSeat: true,
    status: "confirmed",
    note: "Quick lunch",
  },
  {
    id: 14,
    customerName: "Alex Johnson",
    people: 1,
    time: "17:45",
    duration: 75,
    counterSeatId: "C20",
    isCounterSeat: true,
    status: "confirmed",
    note: "After-work drink",
  },
];

// Pre-generated time slots for restaurant operating hours (9:00 AM to 10:30 PM)
export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
];

export const merchantProfile = {
  name: "Restaurant Owner",
  email: "restaurant@example.com",
  restaurantName: "Gourmet Delights",
  profileImage: require("../../assets/images/user_profile.jpg"),
  phoneNumber: "+81 80 6748 5678",
};
