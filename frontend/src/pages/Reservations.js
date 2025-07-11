import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reservations.css';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockReservations = [
        {
          id: 1,
          restaurantName: "La Bella Italia",
          restaurantId: 1,
          date: "2024-01-20",
          time: "19:00",
          guests: 4,
          status: "confirmed",
          reservationId: "RES123456",
          specialRequests: "Window seat preferred",
          restaurantImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=150&fit=crop"
        },
        {
          id: 2,
          restaurantName: "Sakura Sushi",
          restaurantId: 2,
          date: "2024-01-25",
          time: "18:30",
          guests: 2,
          status: "pending",
          reservationId: "RES123457",
          specialRequests: "Allergic to shellfish",
          restaurantImage: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=150&fit=crop"
        },
        {
          id: 3,
          restaurantName: "Le Petit Bistro",
          restaurantId: 3,
          date: "2024-01-15",
          time: "20:00",
          guests: 6,
          status: "completed",
          reservationId: "RES123458",
          specialRequests: "Anniversary celebration",
          restaurantImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=150&fit=crop"
        },
        {
          id: 4,
          restaurantName: "Taco Fiesta",
          restaurantId: 4,
          date: "2024-02-01",
          time: "19:30",
          guests: 3,
          status: "confirmed",
          reservationId: "RES123459",
          specialRequests: "",
          restaurantImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop"
        }
      ];
      setReservations(mockReservations);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const filteredReservations = reservations.filter(reservation => {
    if (activeFilter === 'all') return true;
    return reservation.status === activeFilter;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="reservations-page">
      <div className="container">
        <div className="reservations-header">
          <h1>My Reservations</h1>
          <p>Manage your restaurant bookings and view your reservation history</p>
        </div>

        {/* Filter Tabs */}
        <div className="reservations-filters">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Reservations ({reservations.length})
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('confirmed')}
          >
            Confirmed ({reservations.filter(r => r.status === 'confirmed').length})
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending ({reservations.filter(r => r.status === 'pending').length})
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed ({reservations.filter(r => r.status === 'completed').length})
          </button>
        </div>

        {/* Reservations List */}
        <div className="reservations-content">
          {filteredReservations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <h3 className="empty-state-title">No reservations found</h3>
              <p className="empty-state-text">
                {activeFilter === 'all' 
                  ? "You haven't made any reservations yet."
                  : `No ${activeFilter} reservations found.`
                }
              </p>
              <Link to="/restaurants" className="btn btn-primary">
                Browse Restaurants
              </Link>
            </div>
          ) : (
            <div className="reservations-grid">
              {filteredReservations.map((reservation) => (
                <div key={reservation.id} className="reservation-card">
                  <div className="reservation-image">
                    <img src={reservation.restaurantImage} alt={reservation.restaurantName} />
                    <div className={`status-badge ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </div>
                  </div>
                  
                  <div className="reservation-content">
                    <div className="reservation-header">
                      <h3>{reservation.restaurantName}</h3>
                      <span className="reservation-id">#{reservation.reservationId}</span>
                    </div>
                    
                    <div className="reservation-details">
                      <div className="detail-row">
                        <span className="detail-label">📅 Date:</span>
                        <span className="detail-value">{formatDate(reservation.date)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">🕒 Time:</span>
                        <span className="detail-value">{formatTime(reservation.time)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">👥 Guests:</span>
                        <span className="detail-value">{reservation.guests} {reservation.guests === 1 ? 'person' : 'people'}</span>
                      </div>
                      {reservation.specialRequests && (
                        <div className="detail-row">
                          <span className="detail-label">📝 Special Requests:</span>
                          <span className="detail-value">{reservation.specialRequests}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="reservation-actions">
                      <Link 
                        to={`/restaurant/${reservation.restaurantId}`}
                        className="btn btn-secondary"
                      >
                        View Restaurant
                      </Link>
                      {reservation.status === 'confirmed' && (
                        <>
                          <button className="btn btn-secondary">Modify</button>
                          <button className="btn btn-secondary">Cancel</button>
                        </>
                      )}
                      {reservation.status === 'pending' && (
                        <>
                          <button className="btn btn-secondary">Modify</button>
                          <button className="btn btn-secondary">Cancel</button>
                        </>
                      )}
                      {reservation.status === 'completed' && (
                        <button className="btn btn-primary">Book Again</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations; 