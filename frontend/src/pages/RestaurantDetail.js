import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('menu');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRestaurant = {
        id: parseInt(id),
        name: "La Bella Italia",
        cuisine: "Italian",
        location: "Downtown",
        rating: 4.8,
        price: "$$",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
        description: "Authentic Italian cuisine in a cozy atmosphere. Our family-owned restaurant brings the flavors of Italy to your table with fresh ingredients and traditional recipes.",
        hours: "Mon-Sun: 11:00 AM - 10:00 PM",
        phone: "+1 (555) 123-4567",
        address: "123 Main Street, Downtown",
        menu: {
          appetizers: [
            { name: "Bruschetta", description: "Toasted bread with tomatoes, garlic, and olive oil", price: "$8" },
            { name: "Calamari", description: "Crispy fried squid with marinara sauce", price: "$12" },
            { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and basil", price: "$10" }
          ],
          mainCourses: [
            { name: "Spaghetti Carbonara", description: "Pasta with eggs, cheese, and pancetta", price: "$18" },
            { name: "Margherita Pizza", description: "Classic pizza with tomato, mozzarella, and basil", price: "$16" },
            { name: "Chicken Parmesan", description: "Breaded chicken with marinara and cheese", price: "$22" },
            { name: "Beef Lasagna", description: "Layered pasta with beef, cheese, and sauce", price: "$20" }
          ],
          desserts: [
            { name: "Tiramisu", description: "Classic Italian dessert with coffee and mascarpone", price: "$8" },
            { name: "Cannoli", description: "Sicilian pastry with sweet ricotta filling", price: "$7" }
          ]
        },
        reviews: [
          {
            id: 1,
            user: "Sarah M.",
            rating: 5,
            date: "2024-01-15",
            comment: "Amazing food and great service! The pasta was perfectly cooked and the atmosphere was wonderful."
          },
          {
            id: 2,
            user: "John D.",
            rating: 4,
            date: "2024-01-10",
            comment: "Great Italian food. The pizza was delicious and the staff was friendly. Will definitely return!"
          },
          {
            id: 3,
            user: "Maria L.",
            rating: 5,
            date: "2024-01-08",
            comment: "Authentic Italian cuisine. The tiramisu was to die for! Highly recommend this place."
          }
        ]
      };
      setRestaurant(mockRestaurant);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🍽️</div>
        <h3 className="empty-state-title">Restaurant not found</h3>
        <p className="empty-state-text">The restaurant you're looking for doesn't exist.</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const renderMenuSection = (items, title) => (
    <div className="menu-section">
      <h3 className="menu-section-title">{title}</h3>
      <div className="menu-items">
        {items.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-item-header">
              <h4 className="menu-item-name">{item.name}</h4>
              <span className="menu-item-price">{item.price}</span>
            </div>
            <p className="menu-item-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="restaurant-detail">
      {/* Hero Section */}
      <div className="restaurant-hero">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-hero-image" />
        <div className="restaurant-hero-overlay">
          <div className="container">
            <div className="restaurant-hero-content">
              <h1 className="restaurant-hero-title">{restaurant.name}</h1>
              <p className="restaurant-hero-cuisine">{restaurant.cuisine} Cuisine</p>
              <div className="restaurant-hero-info">
                <div className="restaurant-rating">
                  <span className="stars">{renderStars(restaurant.rating)}</span>
                  <span>{restaurant.rating}</span>
                </div>
                <span className="restaurant-price">{restaurant.price}</span>
                <span className="restaurant-location">📍 {restaurant.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Restaurant Info */}
        <div className="restaurant-info">
          <div className="restaurant-description">
            <h2>About {restaurant.name}</h2>
            <p>{restaurant.description}</p>
          </div>
          
          <div className="restaurant-details">
            <div className="detail-item">
              <span className="detail-icon">🕒</span>
              <div>
                <h4>Hours</h4>
                <p>{restaurant.hours}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p>{restaurant.phone}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div>
                <h4>Address</h4>
                <p>{restaurant.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="restaurant-tabs">
          <button 
            className={`tab-button ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu
          </button>
          <button 
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`tab-button ${activeTab === 'reservation' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservation')}
          >
            Make Reservation
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'menu' && (
            <div className="menu-content">
              {renderMenuSection(restaurant.menu.appetizers, "Appetizers")}
              {renderMenuSection(restaurant.menu.mainCourses, "Main Courses")}
              {renderMenuSection(restaurant.menu.desserts, "Desserts")}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-header">
                <h3>Customer Reviews</h3>
                <div className="average-rating">
                  <span className="stars">{renderStars(restaurant.rating)}</span>
                  <span>{restaurant.rating} out of 5</span>
                </div>
              </div>
              <div className="reviews-list">
                {restaurant.reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-user">
                        <h4>{review.user}</h4>
                        <span className="stars">{renderStars(review.rating)}</span>
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reservation' && (
            <div className="reservation-content">
              <h3>Make a Reservation</h3>
              <p>Book your table at {restaurant.name}</p>
              <form className="reservation-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" id="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time" className="form-label">Time</label>
                    <select id="time" className="form-input">
                      <option value="">Select time</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="guests" className="form-label">Number of Guests</label>
                    <select id="guests" className="form-input">
                      <option value="">Select guests</option>
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6">6 people</option>
                      <option value="7+">7+ people</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" className="form-input" placeholder="Your name" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel" id="phone" className="form-input" placeholder="Your phone number" />
                </div>
                <div className="form-group">
                  <label htmlFor="notes" className="form-label">Special Requests</label>
                  <textarea id="notes" className="form-input form-textarea" placeholder="Any special requests or dietary restrictions"></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-large">
                  Book Reservation
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail; 