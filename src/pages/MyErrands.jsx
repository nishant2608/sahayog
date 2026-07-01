import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/Errands.css';

export default function MyErrands() {
  const { userErrands, user } = useContext(AppContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: 'var(--warning-color)',
      accepted: 'var(--primary-color)',
      completed: 'var(--success-color)',
    };
    return colors[status] || '#999';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: '⏳ Pending',
      accepted: '👤 Accepted',
      completed: '✓ Completed',
    };
    return labels[status] || status;
  };

  return (
    <div className="errands-container">
      <div className="errands-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ←
        </button>
        <h1>My Errands</h1>
      </div>

      {userErrands.length === 0 ? (
        <div className="empty-state">
          <p>No errands posted yet</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/create-errand')}
          >
            Post First Errand
          </button>
        </div>
      ) : (
        <div className="errands-list">
          {userErrands.map((errand) => (
            <div key={errand.id} className="errand-card status-card">
              <div className="errand-header-row">
                <div className="errand-shop">
                  <span className="shop-badge">{errand.shop.toUpperCase()}</span>
                </div>
                <div
                  className="status-badge"
                  style={{ backgroundColor: getStatusBadgeColor(errand.status) }}
                >
                  {getStatusLabel(errand.status)}
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

                {errand.urgency && (
                  <div className="errand-item">
                    <strong>⚡ Priority:</strong>
                    <p>{errand.urgency.charAt(0).toUpperCase() + errand.urgency.slice(1)}</p>
                  </div>
                )}

                {errand.notes && (
                  <div className="errand-item">
                    <strong>📝 Notes:</strong>
                    <p className="notes">{errand.notes}</p>
                  </div>
                )}

                {errand.status === 'accepted' && (
                  <div className="accepted-info">
                    <p>✓ A volunteer has accepted this task!</p>
                  </div>
                )}

                {errand.status === 'completed' && (
                  <div className="completed-info">
                    <p>✓ Order completed and delivered!</p>
                  </div>
                )}

                <div className="errand-timestamp">
                  Posted: {new Date(errand.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
