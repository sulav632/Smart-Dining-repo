import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const featuredRestaurants = [
    {
      id: 1,
      name: "La Bella Italia",
      cuisine: "Italian",
      location: "Downtown",
      rating: 4.8,
      price: "$$",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Sakura Sushi",
      cuisine: "Japanese",
      location: "Westside",
      rating: 4.6,
      price: "$$$",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Le Petit Bistro",
      cuisine: "French",
      location: "Midtown",
      rating: 4.9,
      price: "$$$",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
    }
  ];

  const features = [
    {
      icon: "🔍",
      title: "Easy Search",
      description: "Find the perfect restaurant with our advanced search and filter options."
    },
    {
      icon: "📅",
      title: "Quick Reservations",
      description: "Book your table in seconds with our streamlined reservation system."
    },
    {
      icon: "⭐",
      title: "Verified Reviews",
      description: "Read authentic reviews from real customers to make informed decisions."
    },
    {
      icon: "🎯",
      title: "Personalized",
      description: "Get recommendations based on your preferences and dining history."
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Amazing Restaurants</h1>
          <p className="hero-subtitle">
            Find the best dining experiences in your area. Book tables, explore menus, 
            and enjoy unforgettable meals with Smart Dining.
          </p>
          <div className="hero-buttons">
            <Link to="/restaurants" className="btn btn-primary btn-large">
              Explore Restaurants
            </Link>
            <Link to="/register" className="btn btn-secondary btn-large">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <h2 className="section-title">Why Choose Smart Dining?</h2>
          <p className="section-subtitle">
            We make dining out simple, enjoyable, and memorable with our innovative platform.
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Restaurants</h2>
          <p className="section-subtitle">
            Discover some of the most popular and highly-rated restaurants in your area.
          </p>
          <div className="restaurants-grid">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-content">
                  <div className="restaurant-header">
                    <div>
                      <h3 className="restaurant-name">{restaurant.name}</h3>
                      <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                      <p className="restaurant-location">📍 {restaurant.location}</p>
                    </div>
                    <span className="restaurant-price">{restaurant.price}</span>
                  </div>
                  <div className="restaurant-rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(restaurant.rating))}
                      {'☆'.repeat(5 - Math.floor(restaurant.rating))}
                    </span>
                    <span>{restaurant.rating}</span>
                  </div>
                  <Link 
                    to={`/restaurant/${restaurant.id}`} 
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/restaurants" className="btn btn-secondary btn-large">
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Culinary Journey?</h2>
            <p>Join thousands of food lovers who trust Smart Dining for their dining experiences.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started Today
              </Link>
              <Link to="/restaurants" className="btn btn-secondary btn-large">
                Browse Restaurants
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 