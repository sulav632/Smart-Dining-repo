import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to the backend here
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-tabs">
              <button 
                className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                📋 Profile Information
              </button>
              <button 
                className={`profile-tab ${activeTab === 'reservations' ? 'active' : ''}`}
                onClick={() => setActiveTab('reservations')}
              >
                📅 My Reservations
              </button>
              <button 
                className={`profile-tab ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                ❤️ Favorite Restaurants
              </button>
              <button 
                className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ Account Settings
              </button>
            </div>
          </div>

          <div className="profile-main">
            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Profile Information</h2>
                  <button 
                    className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-input"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-input"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      className="form-input form-textarea"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="profile-section">
                <h2>My Reservations</h2>
                <div className="reservations-list">
                  <div className="reservation-item">
                    <div className="reservation-header">
                      <h3>La Bella Italia</h3>
                      <span className="reservation-status confirmed">Confirmed</span>
                    </div>
                    <div className="reservation-details">
                      <p><strong>Date:</strong> January 20, 2024</p>
                      <p><strong>Time:</strong> 7:00 PM</p>
                      <p><strong>Guests:</strong> 4 people</p>
                      <p><strong>Reservation ID:</strong> #RES123456</p>
                    </div>
                    <div className="reservation-actions">
                      <button className="btn btn-secondary">Modify</button>
                      <button className="btn btn-secondary">Cancel</button>
                    </div>
                  </div>

                  <div className="reservation-item">
                    <div className="reservation-header">
                      <h3>Sakura Sushi</h3>
                      <span className="reservation-status pending">Pending</span>
                    </div>
                    <div className="reservation-details">
                      <p><strong>Date:</strong> January 25, 2024</p>
                      <p><strong>Time:</strong> 6:30 PM</p>
                      <p><strong>Guests:</strong> 2 people</p>
                      <p><strong>Reservation ID:</strong> #RES123457</p>
                    </div>
                    <div className="reservation-actions">
                      <button className="btn btn-secondary">Modify</button>
                      <button className="btn btn-secondary">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="profile-section">
                <h2>Favorite Restaurants</h2>
                <div className="favorites-grid">
                  <div className="favorite-item">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=150&fit=crop" alt="La Bella Italia" />
                    <div className="favorite-content">
                      <h3>La Bella Italia</h3>
                      <p>Italian • Downtown</p>
                      <div className="favorite-rating">
                        <span className="stars">★★★★★</span>
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>

                  <div className="favorite-item">
                    <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=150&fit=crop" alt="Sakura Sushi" />
                    <div className="favorite-content">
                      <h3>Sakura Sushi</h3>
                      <p>Japanese • Westside</p>
                      <div className="favorite-rating">
                        <span className="stars">★★★★☆</span>
                        <span>4.6</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="profile-section">
                <h2>Account Settings</h2>
                
                <div className="settings-group">
                  <h3>Password</h3>
                  <div className="form-group">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input type="password" id="currentPassword" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" id="newPassword" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                    <input type="password" id="confirmNewPassword" className="form-input" />
                  </div>
                  <button className="btn btn-primary">Update Password</button>
                </div>

                <div className="settings-group">
                  <h3>Notifications</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      Email notifications for reservations
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      SMS notifications for reservation updates
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      Marketing emails and promotions
                    </label>
                  </div>
                </div>

                <div className="settings-group">
                  <h3>Privacy</h3>
                  <button className="btn btn-secondary">Download My Data</button>
                  <button className="btn btn-secondary">Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 