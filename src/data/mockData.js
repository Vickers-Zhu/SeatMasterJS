// src/data/mockData.js
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
    profileImage: require("../../assets/images/user_profile.jpg"), // Adjust the path as necessary
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
    { id: 1, chairs: [{ id: "1A" }, { id: "1B" }, { id: "1C" }] },
    { id: 2, chairs: [{ id: "2A" }, { id: "2B" }, { id: "2C" }, { id: "2D" }] },
    // Table 3 expanded to 10 chairs for testing
    {
      id: 3,
      chairs: ["3A", "3B", "3C", "3D", "3E", "3F", "3G", "3H", "3I", "3J"].map(
        (id) => ({ id })
      ),
    },
    { id: 4, chairs: [{ id: "4A" }, { id: "4B" }, { id: "4C" }, { id: "4D" }] },
    { id: 5, chairs: [{ id: "5A" }, { id: "5B" }, { id: "5C" }] },
    { id: 6, chairs: [{ id: "6A" }, { id: "6B" }] },
    // Table 7 expanded to 10 chairs
    {
      id: 7,
      chairs: ["7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H", "7I", "7J"].map(
        (id) => ({ id })
      ),
    },
    { id: 8, chairs: [{ id: "8A" }, { id: "8B" }] },
    { id: 9, chairs: [{ id: "9A" }, { id: "9B" }, { id: "9C" }] },
    // Table 10 expanded to 10 chairs
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
      ].map((id) => ({ id })),
    },
    { id: 11, chairs: [{ id: "11A" }, { id: "11B" }] },
    { id: 12, chairs: [{ id: "12A" }, { id: "12B" }, { id: "12C" }] },
  ],
  // Increased number of counter seats to 30 for performance testing
  counterSeats: Array.from({ length: 30 }, (_, i) => ({ id: `C${i + 1}` })),
};
