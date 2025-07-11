const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

// Sample restaurants data
const restaurants = [
  {
    name: "The Grand Bistro",
    cuisine: "French",
    location: "Downtown",
    description: "Elegant French bistro serving classic dishes with a modern twist. Perfect for romantic dinners and special occasions.",
    rating: 4.5,
    totalReviews: 127,
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    phone: "+1-555-0123",
    address: "123 Main Street, Downtown",
    hours: "Mon-Sun: 5:00 PM - 11:00 PM",
    features: ["dine-in", "private-dining", "wifi", "parking"],
    coordinates: { latitude: 40.7128, longitude: -74.0060 }
  },
  {
    name: "Sakura Sushi",
    cuisine: "Japanese",
    location: "Midtown",
    description: "Authentic Japanese sushi and sashimi prepared by master chefs. Fresh ingredients and traditional techniques.",
    rating: 4.8,
    totalReviews: 89,
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
    phone: "+1-555-0124",
    address: "456 Oak Avenue, Midtown",
    hours: "Tue-Sun: 11:30 AM - 10:00 PM",
    features: ["dine-in", "takeout", "delivery"],
    coordinates: { latitude: 40.7589, longitude: -73.9851 }
  },
  {
    name: "Trattoria Bella",
    cuisine: "Italian",
    location: "Little Italy",
    description: "Family-owned Italian restaurant serving homemade pasta, wood-fired pizzas, and traditional Italian dishes.",
    rating: 4.3,
    totalReviews: 156,
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
    phone: "+1-555-0125",
    address: "789 Mulberry Street, Little Italy",
    hours: "Mon-Sun: 12:00 PM - 11:00 PM",
    features: ["dine-in", "takeout", "outdoor-seating"],
    coordinates: { latitude: 40.7196, longitude: -73.9976 }
  },
  {
    name: "Spice Garden",
    cuisine: "Indian",
    location: "East Village",
    description: "Authentic Indian cuisine featuring aromatic spices and traditional recipes from various regions of India.",
    rating: 4.6,
    totalReviews: 203,
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
    phone: "+1-555-0126",
    address: "321 2nd Avenue, East Village",
    hours: "Mon-Sun: 11:00 AM - 10:30 PM",
    features: ["dine-in", "takeout", "delivery", "wifi"],
    coordinates: { latitude: 40.7265, longitude: -73.9865 }
  },
  {
    name: "Ocean's Catch",
    cuisine: "Seafood",
    location: "Harbor District",
    description: "Fresh seafood restaurant with daily catches and ocean views. Specializing in grilled fish and shellfish.",
    rating: 4.4,
    totalReviews: 98,
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
    phone: "+1-555-0127",
    address: "654 Harbor Drive, Harbor District",
    hours: "Mon-Sun: 5:30 PM - 11:30 PM",
    features: ["dine-in", "outdoor-seating", "private-dining"],
    coordinates: { latitude: 40.7021, longitude: -74.0159 }
  },
  {
    name: "Burger Haven",
    cuisine: "American",
    location: "West Side",
    description: "Gourmet burgers and comfort food in a casual atmosphere. Handcrafted burgers with premium ingredients.",
    rating: 4.2,
    totalReviews: 245,
    priceRange: "$",
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
    phone: "+1-555-0128",
    address: "987 West Street, West Side",
    hours: "Mon-Sun: 11:00 AM - 10:00 PM",
    features: ["dine-in", "takeout", "delivery"],
    coordinates: { latitude: 40.7589, longitude: -74.0081 }
  },
  {
    name: "Golden Dragon",
    cuisine: "Chinese",
    location: "Chinatown",
    description: "Traditional Chinese restaurant serving dim sum, Peking duck, and authentic Cantonese cuisine.",
    rating: 4.1,
    totalReviews: 178,
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
    phone: "+1-555-0129",
    address: "147 Mott Street, Chinatown",
    hours: "Mon-Sun: 10:00 AM - 11:00 PM",
    features: ["dine-in", "takeout", "delivery"],
    coordinates: { latitude: 40.7158, longitude: -73.9970 }
  },
  {
    name: "Café Luna",
    cuisine: "Mediterranean",
    location: "Upper West Side",
    description: "Mediterranean café featuring fresh salads, grilled meats, and healthy options in a cozy atmosphere.",
    rating: 4.0,
    totalReviews: 134,
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500",
    phone: "+1-555-0130",
    address: "258 Broadway, Upper West Side",
    hours: "Mon-Sun: 8:00 AM - 10:00 PM",
    features: ["dine-in", "takeout", "outdoor-seating", "wifi"],
    coordinates: { latitude: 40.7829, longitude: -73.9654 }
  }
];

// Sample menu items
const menuItems = [
  // The Grand Bistro
  {
    restaurant: null, // Will be set dynamically
    name: "Coq au Vin",
    description: "Classic French braised chicken in red wine with mushrooms and pearl onions",
    price: 28.00,
    category: "main-course",
    isVegetarian: false,
    isGlutenFree: false
  },
  {
    restaurant: null,
    name: "Escargots de Bourgogne",
    description: "Burgundy snails in garlic herb butter",
    price: 16.00,
    category: "appetizer",
    isVegetarian: false,
    isGlutenFree: false
  },
  // Sakura Sushi
  {
    restaurant: null,
    name: "Dragon Roll",
    description: "Eel, avocado, and cucumber topped with eel sauce",
    price: 18.00,
    category: "main-course",
    isVegetarian: false,
    isGlutenFree: true
  },
  {
    restaurant: null,
    name: "Miso Soup",
    description: "Traditional Japanese soup with tofu and seaweed",
    price: 4.00,
    category: "appetizer",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true
  },
  // Trattoria Bella
  {
    restaurant: null,
    name: "Spaghetti Carbonara",
    description: "Pasta with eggs, cheese, pancetta, and black pepper",
    price: 22.00,
    category: "main-course",
    isVegetarian: false,
    isGlutenFree: false
  },
  {
    restaurant: null,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, and basil",
    price: 20.00,
    category: "main-course",
    isVegetarian: true,
    isGlutenFree: false
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-dining');
    console.log('✅ MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Restaurant.deleteMany();
    await MenuItem.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@smartdining.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1-555-0001',
      address: '123 Admin Street'
    });

    // Create regular user
    const regularUser = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
      phone: '+1-555-0002',
      address: '456 User Avenue'
    });

    console.log('👥 Created users');

    // Create restaurants
    const createdRestaurants = await Restaurant.create(restaurants);
    console.log('🏪 Created restaurants');

    // Create menu items with restaurant references
    const menuItemsWithRestaurants = menuItems.map((item, index) => ({
      ...item,
      restaurant: createdRestaurants[Math.floor(index / 2)]._id
    }));

    await MenuItem.create(menuItemsWithRestaurants);
    console.log('🍽️  Created menu items');

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Sample Data:');
    console.log(`- Admin User: admin@smartdining.com / admin123`);
    console.log(`- Regular User: john@example.com / password123`);
    console.log(`- ${createdRestaurants.length} restaurants created`);
    console.log(`- ${menuItemsWithRestaurants.length} menu items created`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder
if (require.main === module) {
  connectDB().then(() => seedData());
}

module.exports = { connectDB, seedData }; 