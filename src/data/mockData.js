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
    name: "La Piazza",
    photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    date: "2024-04-01",
    time: "7:00 PM",
    seatsNumber: 4,
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Sushi World",
    photo: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    date: "2024-04-05",
    time: "8:00 PM",
    seatsNumber: 2,
    status: "Pending",
  },
  {
    id: 3,
    name: "Burger House",
    photo: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    date: "2024-03-20",
    time: "6:00 PM",
    seatsNumber: 3,
    status: "Completed",
  },
  {
    id: 4,
    name: "Ocean Breeze Café",
    photo:
      "https://images.unsplash.com/photo-1544511916-0148ccdeb877?auto=format&fit=crop&w=400&q=60",
    date: "2024-03-28",
    time: "6:00 PM",
    seatsNumber: 3,
    status: "Pending",
  },
];
