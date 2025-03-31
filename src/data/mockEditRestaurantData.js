// src/features/merchant/settings/screens/sampleData.js

// Sample restaurant data for the restaurant edit screen
export const sampleRestaurantData = {
  id: "rest-123456",
  name: "La Piazza Ristorante",
  description: "Authentic Italian cuisine with a modern twist",
  cuisine: ["Italian", "Mediterranean"],

  address: {
    street: "123 Piazza Street",
    city: "San Francisco",
    state: "CA",
    postalCode: "94110",
    country: "USA",
    coordinates: {
      latitude: 37.7598,
      longitude: -122.4271,
    },
  },
  phoneNumber: "+1 (415) 555-1234",
  email: "info@lapiazzasf.com",
  website: "https://www.lapiazzasf.com",

  photos: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1621275471769-e6aa344546d5",
    "https://images.unsplash.com/photo-1544025162-d76694265947",
  ],
  logo: "https://example.com/logo.png",
  coverImage: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",

  businessHours: {
    monday: { open: "11:00", close: "22:00", isClosed: false },
    tuesday: { open: "11:00", close: "22:00", isClosed: false },
    wednesday: { open: "11:00", close: "22:00", isClosed: false },
    thursday: { open: "11:00", close: "22:00", isClosed: false },
    friday: { open: "11:00", close: "23:00", isClosed: false },
    saturday: { open: "10:00", close: "23:00", isClosed: false },
    sunday: { open: "10:00", close: "21:00", isClosed: false },
  },
  isOpenNow: true,
  isClosedTemporarily: false,
  holidayHours: [
    {
      date: "2025-12-24", // Christmas Eve
      open: "11:00",
      close: "15:00",
      isClosed: false,
    },
    {
      date: "2025-12-25", // Christmas Day
      open: "",
      close: "",
      isClosed: true,
    },
  ],

  capacity: {
    totalSeats: 80,
    indoorSeats: 60,
    outdoorSeats: 20,
    privateRooms: [
      {
        name: "Wine Cellar",
        capacity: 12,
      },
    ],
  },

  features: {
    hasWifi: true,
    hasParking: true,
    isWheelchairAccessible: true,
    allowsPets: false,
    hasOutdoorSeating: true,
    hasTakeout: true,
    hasDelivery: true,
    acceptsReservations: true,
  },

  menu: {
    categories: [
      {
        name: "Appetizers",
        items: [
          {
            name: "Bruschetta",
            description:
              "Grilled bread rubbed with garlic and topped with tomatoes, olive oil, salt, and pepper",
            price: 9.99,
            image: "https://example.com/bruschetta.jpg",
            dietaryFlags: ["Vegetarian"],
          },
        ],
      },
      {
        name: "Pasta",
        items: [
          {
            name: "Spaghetti Carbonara",
            description:
              "Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper",
            price: 18.99,
            image: "https://example.com/carbonara.jpg",
            dietaryFlags: [],
          },
        ],
      },
    ],
  },

  rating: 4.7,
  reviewCount: 253,

  socialMedia: {
    instagram: "https://instagram.com/lapiazzasf",
    facebook: "https://facebook.com/lapiazzasf",
    twitter: "https://twitter.com/lapiazzasf",
    yelp: "https://yelp.com/biz/la-piazza-ristorante-san-francisco",
  },

  settings: {
    reservationTimeSlotDuration: 30, // 30-minute slots
    maxReservationSize: 20, // Largest party size
    reservationLeadTime: 1, // 1 hour minimum advance notice
    automaticConfirmation: true, // Automatically confirm reservations
  },
};
