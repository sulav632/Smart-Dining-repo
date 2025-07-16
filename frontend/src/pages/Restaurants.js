import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Restaurants.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const cuisines = ['All', 'Italian', 'Japanese', 'French', 'Mexican', 'Chinese', 'Indian', 'American', 'Thai'];
  const prices = ['All', '$', '$$', '$$$', '$$$$'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRestaurants = [
        {
          id: 1,
          name: "La Bella Italia",
          cuisine: "Italian",
          location: "Downtown",
          rating: 4.8,
          price: "$$",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
          description: "Authentic Italian cuisine in a cozy atmosphere."
        },
        {
          id: 2,
          name: "Sakura Sushi",
          cuisine: "Japanese",
          location: "Westside",
          rating: 4.6,
          price: "$$$",
          image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          description: "Fresh sushi and traditional Japanese dishes."
        },
        {
          id: 3,
          name: "Le Petit Bistro",
          cuisine: "French",
          location: "Midtown",
          rating: 4.9,
          price: "$$$",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
          description: "Elegant French dining with classic dishes."
        },
        
        {
          id: 5,
          name: "Golden Dragon",
          cuisine: "Chinese",
          location: "Chinatown",
          rating: 4.5,
          price: "$$",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
          description: "Traditional Chinese cuisine with modern twists."
        },
        {
          id: 6,
          name: "Spice Garden",
          cuisine: "Indian",
          location: "Southside",
          rating: 4.7,
          price: "$$",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
          description: "Rich Indian flavors and aromatic spices."
        },
        {
          id: 7,
          name: "Burger Haven",
          cuisine: "American",
          location: "Uptown",
          rating: 4.3,
          price: "$",
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
          description: "Juicy burgers, crispy fries, and classic American comfort food."
        },
        {
          id: 8,
          name: "Green Leaf Vegan",
          cuisine: "Vegan",
          location: "Central",
          rating: 4.6,
          price: "$$",
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
          description: "Delicious plant-based meals and fresh organic juices."
        },
      
      ];
      setRestaurants(mockRestaurants);
      setFilteredRestaurants(mockRestaurants);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [searchTerm, selectedCuisine, selectedPrice, restaurants]);

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCuisine && selectedCuisine !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }

    if (selectedPrice && selectedPrice !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.price === selectedPrice);
    }

    setFilteredRestaurants(filtered);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="restaurants-page">
      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <h2>Find Your Perfect Restaurant</h2>
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="search" className="form-label">Search</label>
                <input
                  type="text"
                  id="search"
                  className="form-input"
                  placeholder="Search by name, cuisine, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cuisine" className="form-label">Cuisine</label>
                <select
                  id="cuisine"
                  className="form-input"
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                >
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price" className="form-label">Price Range</label>
                <select
                  id="price"
                  className="form-input"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  {prices.map(price => (
                    <option key={price} value={price}>{price}</option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="how-it-works-grid">
            <div className="how-step">
              <span className="how-icon">🔎</span>
              <h3>Search</h3>
              <p>Find restaurants by cuisine, location, or rating.</p>
            </div>
            <div className="how-step">
              <span className="how-icon">📅</span>
              <h3>Book</h3>
              <p>Reserve your table in just a few clicks.</p>
            </div>
            <div className="how-step">
              <span className="how-icon">🍽️</span>
              <h3>Dine</h3>
              <p>Enjoy your meal and share your experience!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Smart Dining made it so easy to find and book the perfect restaurant for our anniversary!"</p>
              <span>- Priya S.</span>
            </div>
            <div className="testimonial-card">
              <p>"I love the verified reviews. I always know what to expect before I go."</p>
              <span>- Alex T.</span>
            </div>
            <div className="testimonial-card">
              <p>"The reservation process is super quick and hassle-free."</p>
              <span>- Maria L.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section">
        <div className="container">
          <div className="results-header">
            <h2>Restaurants ({filteredRestaurants.length})</h2>
            {(searchTerm || selectedCuisine !== '' || selectedPrice !== '') && (
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCuisine('');
                  setSelectedPrice('');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🍽️</div>
              <h3 className="empty-state-title">No restaurants found</h3>
              <p className="empty-state-text">
                Try adjusting your search criteria or browse all restaurants.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCuisine('');
                  setSelectedPrice('');
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="restaurants-grid">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card">
                  <img
                    src={restaurant.image || '/default-restaurant.png'}
                    alt={restaurant.name}
                    className="restaurant-image"
                    onError={e => { e.target.onerror = null; e.target.src = '/default-restaurant.png'; }}
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
                    <p className="restaurant-description">{restaurant.description}</p>
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Restaurants; 