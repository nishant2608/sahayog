import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/Errands.css';

export default function AvailableErrands() {
  const { errands, user, acceptErrand, removeNotification, notifications } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [acceptedList, setAcceptedList] = useState([]);

  if (!user) {
    navigate('/');
    return null;
  }

  const pendingErrands = errands.filter((e) => e.status === 'pending');

  const handleAcceptErrand = (errandId) => {
    acceptErrand(errandId);
    setAcceptedList((prev) => [...prev, errandId]);
    removeNotification(errandId);
    
    // Show success message
    alert('Errand accepted! Visit My Tasks to see delivery details.');
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: 'var(--success-color)',
      normal: 'var(--primary-color)',
      high: 'var(--warning-color)',
      urgent: 'var(--danger-color)',
    };
    return colors[urgency] || 'var(--primary-color)';
  };

  const getUrgencyLabel = (urgency) => {
    const labels = {
      low: '⚪ Low',
      normal: '🔵 Normal',
      high: '🟠 High',
      urgent: '🔴 Urgent',
    };
    return labels[urgency] || 'Normal';
  };

  return (
    <div className="errands-container">
      <div className="errands-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ←
        </button>
        <h1>Available Errands</h1>
        <div className="notification-count">
          {notifications.length > 0 && (
            <span className="count-badge">{notifications.length}</span>
          )}
        </div>
      </div>

      {pendingErrands.length === 0 ? (
        <div className="empty-state">
          <p>No errands available right now</p>
          <p className="empty-hint">Check back later!</p>
        </div>
      ) : (
        <div className="errands-list">
          {pendingErrands.map((errand) => (
            <div
              key={errand.id}
              className={`errand-card ${
                acceptedList.includes(errand.id) ? 'accepted' : ''
              }`}
              style={{
                borderLeftColor: getUrgencyColor(errand.urgency),
              }}
            >
              <div className="errand-header-row">
                <div className="errand-shop">
                  <span className="shop-badge">{errand.shop.toUpperCase()}</span>
                </div>
                <div className="errand-urgency">
                  {getUrgencyLabel(errand.urgency)}
                </div>
              </div>

              <div className="errand-body">
                <div className="errand-item">
                  <strong>📦 Items:</strong>
                  <div className="items-list">
                    {errand.items.map((item, idx) => (
                      <span key={idx} className="item-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="errand-item">
                  <strong>🚪 Room:</strong>
                  <p className="room-number">{errand.roomNumber}</p>
                </div>

                {errand.notes && (
                  <div className="errand-item">
                    <strong>📝 Notes:</strong>
                    <p className="notes">{errand.notes}</p>
                  </div>
                )}

                <div className="errand-timestamp">
                  {new Date(errand.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {!acceptedList.includes(errand.id) && (
                <button
                  className="btn btn-accept"
                  onClick={() => handleAcceptErrand(errand.id)}
                >
                  Accept Task +50 Points
                </button>
              )}

              {acceptedList.includes(errand.id) && (
                <div className="accepted-badge">✓ Task Accepted</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
