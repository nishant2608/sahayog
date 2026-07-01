import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/Home.css';

export default function Home() {
  const { user, userErrands, errands, notifications } = useContext(AppContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const pendingErrands = userErrands.filter((e) => e.status === 'pending').length;
  const acceptedErrands = errands.filter((e) => e.acceptedBy === user.id && e.status === 'accepted').length;
  const availableErrands = errands.filter((e) => e.status === 'pending').length;

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <h1>Sahayog</h1>
          <p>Campus Errand Hub</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">🎁</div>
          <div className="stat-content">
            <p className="stat-label">Reward Points</p>
            <p className="stat-value">{user.rewardPoints}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <p className="stat-label">My Pending Errands</p>
            <p className="stat-value">{pendingErrands}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <p className="stat-label">Accepted Tasks</p>
            <p className="stat-value">{acceptedErrands}</p>
          </div>
        </div>
      </div>

      <div className="notifications-alert">
        {notifications.length > 0 && (
          <div className="notification-badge">
            {notifications.length} New Errands Available!
          </div>
        )}
      </div>

      <div className="home-actions">
        <div className="action-card" onClick={() => navigate('/create-errand')}>
          <div className="action-icon">➕</div>
          <h3>Post an Errand</h3>
          <p>Need something from a shop? Post it here</p>
        </div>

        <div className="action-card" onClick={() => navigate('/available-errands')}>
          <div className="action-icon">🔔</div>
          <h3>Available Errands</h3>
          <p>Help others and earn reward points</p>
          {availableErrands > 0 && <span className="badge">{availableErrands}</span>}
        </div>

        <div className="action-card" onClick={() => navigate('/my-errands')}>
          <div className="action-icon">📍</div>
          <h3>Track Orders</h3>
          <p>See status of your posted errands</p>
        </div>

        <div className="action-card" onClick={() => navigate('/accepted-tasks')}>
          <div className="action-icon">✅</div>
          <h3>My Tasks</h3>
          <p>Tasks you've accepted and completed</p>
        </div>

        <div className="action-card" onClick={() => navigate('/profile')}>
          <div className="action-icon">👤</div>
          <h3>Profile</h3>
          <p>View and edit your profile</p>
        </div>
      </div>

      <div className="info-section">
        <h3>ℹ️ How it works?</h3>
        <ol>
          <li><strong>Post:</strong> Post your required items from nearby shops</li>
          <li><strong>Notify:</strong> Volunteers in campus get notified instantly</li>
          <li><strong>Accept:</strong> First volunteer accepts and gets the task</li>
          <li><strong>Deliver:</strong> Volunteer picks and delivers to your room</li>
          <li><strong>Reward:</strong> Volunteers earn reward points for every task</li>
        </ol>
      </div>
    </div>
  );
}
