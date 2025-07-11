#!/bin/bash

echo "🚀 Setting up Smart Dining Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd ../backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed or not in PATH"
    echo "Please install MongoDB and start the service"
    echo "Visit: https://docs.mongodb.com/manual/installation/"
else
    # Try to connect to MongoDB
    if ! node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/smart-dining').then(() => { console.log('MongoDB connected'); process.exit(0); }).catch(() => { console.log('MongoDB not running'); process.exit(1); });" 2>/dev/null; then
        echo "⚠️  MongoDB is not running. Please start MongoDB service:"
        echo "sudo systemctl start mongod"
        echo "or"
        echo "brew services start mongodb-community"
    else
        echo "✅ MongoDB is running"
    fi
fi

# Seed the database
echo "🌱 Seeding database with sample data..."
cd backend
node seeder.js
if [ $? -ne 0 ]; then
    echo "⚠️  Database seeding failed. You can run it manually later:"
    echo "cd backend && node seeder.js"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Start MongoDB (if not already running):"
echo "   sudo systemctl start mongod"
echo "   or"
echo "   brew services start mongodb-community"
echo ""
echo "2. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start the frontend server (in a new terminal):"
echo "   cd frontend && npm start"
echo ""
echo "4. Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8080"
echo "   API Health Check: http://localhost:8080/api/health"
echo ""
echo "📋 Sample Login Credentials:"
echo "   Admin: admin@smartdining.com / admin123"
echo "   User: john@example.com / password123"
echo ""
echo "🔧 Development Commands:"
echo "   Backend: cd backend && npm run dev"
echo "   Frontend: cd frontend && npm start"
echo "   Seed Database: cd backend && node seeder.js"
echo ""
echo "📚 API Documentation:"
echo "   GET    /api/health - Health check"
echo "   POST   /api/auth/register - Register user"
echo "   POST   /api/auth/login - Login user"
echo "   GET    /api/restaurants - Get all restaurants"
echo "   GET    /api/restaurants/:id - Get restaurant details"
echo "   POST   /api/reservations - Create reservation"
echo "   GET    /api/reservations - Get user reservations"
echo ""
echo "Happy coding! 🍽️" 