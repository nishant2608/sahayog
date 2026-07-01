import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/Profile.css';

export default function Profile() {
  const { user, logout, updateProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  if (!user) {
    navigate('/');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    updateProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ←
        </button>
        <h1>My Profile</h1>
      </div>

      <div className="profile-content">
        <div className="avatar-section">
          <div className="avatar">
            {formData.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="profile-card">
          <h2>Personal Information</h2>

          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled
                />
                <p className="hint">Email cannot be changed</p>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div className="form-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span className="label">Name</span>
                <span className="value">{formData.name}</span>
              </div>
              <div className="info-row">
                <span className="label">Email</span>
                <span className="value">{formData.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone</span>
                <span className="value">{formData.phone}</span>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="stats-card">
          <h2>Your Stats</h2>
          <div className="stats-grid">
            <div className="stat">
              <p className="stat-label">Total Reward Points</p>
              <p className="stat-value">{user.rewardPoints}</p>
            </div>
            <div className="stat">
              <p className="stat-label">Account Type</p>
              <p className="stat-value">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="rewards-card">
          <h2>🎁 Reward Points</h2>
          <p className="rewards-desc">
            Earn reward points for every task you complete as a volunteer. 
            Your current balance: <strong>{user.rewardPoints} points</strong>
          </p>
          <div className="rewards-info">
            <p>📌 Complete 1 errand = 50 points</p>
            <p>🏆 Redeem points for campus perks soon!</p>
          </div>
        </div>

        <div className="help-card">
          <h2>📞 Support</h2>
          <p>If you face any issues, contact us at:</p>
          <p className="contact">support@sahayog.local</p>
        </div>

        <button className="btn btn-danger btn-full" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
