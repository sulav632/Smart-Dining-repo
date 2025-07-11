# Smart Dining - Restaurant Reservation System

A modern web application for restaurant discovery, reservations, and dining management built with React frontend and Node.js backend.

## 🍽️ Features

### Frontend (React)
- **Modern UI/UX**: Responsive design with beautiful animations
- **Restaurant Discovery**: Browse restaurants with search and filters
- **User Authentication**: Secure login/register system
- **Reservation System**: Book tables with date/time selection
- **Restaurant Details**: View menus, reviews, and information
- **User Profile**: Manage personal information and reservations
- **Favorites**: Save and manage favorite restaurants
- **Reviews & Ratings**: Rate and review dining experiences

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete CRUD operations
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Database**: NoSQL database with Mongoose ODM
- **Input Validation**: Request validation with express-validator
- **Error Handling**: Comprehensive error handling middleware
- **Rate Limiting**: API rate limiting for security
- **Search & Filtering**: Advanced search with text indexing
- **Pagination**: Efficient data pagination

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **CSS3** - Styling and animations
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (v4.4 or higher)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-dining
   ```

2. **Run the setup script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start MongoDB** (if not already running)
   ```bash
   # Linux
   sudo systemctl start mongod
   
   # macOS
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   ```

4. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

5. **Start the frontend server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Health Check: http://localhost:8080/api/health

## 🔐 Sample Login Credentials

- **Admin User**: admin@smartdining.com / admin123
- **Regular User**: john@example.com / password123

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Restaurants
- `GET /api/restaurants` - Get all restaurants (with search/filter)
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (Admin only)
- `PUT /api/restaurants/:id` - Update restaurant (Admin only)
- `DELETE /api/restaurants/:id` - Delete restaurant (Admin only)
- `POST /api/restaurants/:id/reviews` - Add review
- `GET /api/restaurants/:id/reviews` - Get restaurant reviews

### Reservations
- `GET /api/reservations` - Get user reservations
- `GET /api/reservations/:id` - Get reservation details
- `POST /api/reservations` - Create reservation
- `PUT /api/reservations/:id` - Update reservation
- `PUT /api/reservations/:id/cancel` - Cancel reservation
- `GET /api/reservations/confirm/:code` - Get reservation by code

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/favorites/:restaurantId` - Add to favorites
- `DELETE /api/users/favorites/:restaurantId` - Remove from favorites
- `GET /api/users/favorites` - Get user favorites

## 🗄️ Database Schema

### User
- firstName, lastName, email, password
- phone, address, role (user/admin)
- favorites (array of restaurant IDs)
- isActive, timestamps

### Restaurant
- name, cuisine, location, description
- rating, totalReviews, priceRange
- imageUrl, phone, address, hours
- features (array), coordinates
- isActive, timestamps

### MenuItem
- restaurant (reference), name, description
- price, category, imageUrl
- dietary flags (vegetarian, vegan, gluten-free)
- allergens (array), isAvailable
- preparationTime, timestamps

### Review
- restaurant (reference), user (reference)
- rating, comment, foodRating, serviceRating
- ambianceRating, isVerified, helpful (array)
- timestamps

### Reservation
- restaurant (reference), user (reference)
- date, time, guests, status
- contactName, contactPhone, contactEmail
- specialRequests, confirmationCode
- notes, timestamps

## 🔧 Development Commands

```bash
# Backend
cd backend
npm run dev          # Start development server
npm start           # Start production server
npm test            # Run tests
node seeder.js      # Seed database

# Frontend
cd frontend
npm start           # Start development server
npm build           # Build for production
npm test            # Run tests
```

## 🌱 Database Seeding

The application includes a seeder script that populates the database with sample data:

```bash
cd backend
node seeder.js
```

This creates:
- 2 sample users (admin and regular user)
- 8 sample restaurants with different cuisines
- Sample menu items for each restaurant

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing configuration
- **Helmet Security**: Security headers middleware
- **Error Handling**: Secure error responses

## 📱 Features Overview

### For Users
- Browse restaurants with search and filters
- View restaurant details, menus, and reviews
- Make table reservations
- Manage personal profile and reservations
- Add restaurants to favorites
- Rate and review dining experiences

### For Admins
- Manage restaurants (CRUD operations)
- View all users and their data
- Monitor reservations and reviews
- Manage restaurant menus and information

## 🚀 Deployment

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smart-dining
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:3000
```

### Production Deployment
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure JWT secret
4. Configure CORS for production domain
5. Use environment variables for all sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the API documentation
- Review the code comments
- Open an issue on GitHub

---

**Smart Dining** - Making restaurant discovery and reservations simple and enjoyable! 🍽️✨ # Smart-Dining-repo
