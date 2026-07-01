import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/Errands.css';

export default function AcceptedTasks() {
  const { errands, user, completeErrand } = useContext(AppContext);
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState([]);

  if (!user) {
    navigate('/');
    return null;
  }

  const myAcceptedTasks = errands.filter(
    (e) => e.acceptedBy === user.id && e.status !== 'completed'
  );

  const completedTasksList = errands.filter(
    (e) => e.acceptedBy === user.id && e.status === 'completed'
  );

  const handleCompleteTask = (errandId) => {
    completeErrand(errandId);
    setCompletedTasks((prev) => [...prev, errandId]);
    alert('Great! You earned 50 reward points for completing this task!');
  };

  return (
    <div className="errands-container">
      <div className="errands-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ←
        </button>
        <h1>My Tasks</h1>
      </div>

      {myAcceptedTasks.length === 0 && completedTasksList.length === 0 ? (
        <div className="empty-state">
          <p>No tasks accepted yet</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/available-errands')}
          >
            Browse Available Errands
          </button>
        </div>
      ) : (
        <>
          {myAcceptedTasks.length > 0 && (
            <div className="section">
              <h3 className="section-title">Active Tasks</h3>
              <div className="errands-list">
                {myAcceptedTasks.map((errand) => (
                  <div key={errand.id} className="errand-card active-task">
                    <div className="errand-header-row">
                      <div className="errand-shop">
                        <span className="shop-badge">
                          {errand.shop.toUpperCase()}
                        </span>
                      </div>
                      <div className="status-badge" style={{ backgroundColor: 'var(--primary-color)' }}>
                        👤 In Progress
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

                      <div className="task-info">
                        <p>⏱️ Remember to deliver within 30 minutes</p>
                      </div>
                    </div>

                    {!completedTasks.includes(errand.id) && (
                      <button
                        className="btn btn-success"
                        onClick={() => handleCompleteTask(errand.id)}
                      >
                        Mark as Delivered +50 Points
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedTasksList.length > 0 && (
            <div className="section">
              <h3 className="section-title">Completed Tasks</h3>
              <div className="errands-list">
                {completedTasksList.map((errand) => (
                  <div key={errand.id} className="errand-card completed-task">
                    <div className="errand-header-row">
                      <div className="errand-shop">
                        <span className="shop-badge">
                          {errand.shop.toUpperCase()}
                        </span>
                      </div>
                      <div
                        className="status-badge"
                        style={{ backgroundColor: 'var(--success-color)' }}
                      >
                        ✓ Completed
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

                      <p className="earned-points">+50 Reward Points Earned!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
