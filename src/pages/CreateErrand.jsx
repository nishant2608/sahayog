import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/CreateErrand.css';

export default function CreateErrand() {
  const [shop, setShop] = useState('amul');
  const [items, setItems] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { createErrand, user } = useContext(AppContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!items.trim() || !roomNumber.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const errand = createErrand({
        shop,
        items: items.split(',').map((item) => item.trim()),
        roomNumber,
        notes,
        urgency,
      });

      setSuccess('Errand posted successfully! Volunteers will be notified.');
      setTimeout(() => {
        navigate('/my-errands');
      }, 2000);
    } catch (err) {
      setError('Failed to create errand');
    }
  };

  return (
    <div className="create-errand-container">
      <div className="create-errand-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ←
        </button>
        <h1>Post an Errand</h1>
      </div>

      <form onSubmit={handleSubmit} className="create-errand-form">
        <div className="form-section">
          <h3>Select Shop</h3>
          <div className="shop-options">
            <label className="radio-label">
              <input
                type="radio"
                value="amul"
                checked={shop === 'amul'}
                onChange={(e) => setShop(e.target.value)}
              />
              <span className="radio-custom"></span>
              Amul
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="haneena"
                checked={shop === 'haneena'}
                onChange={(e) => setShop(e.target.value)}
              />
              <span className="radio-custom"></span>
              Haneena
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="blinkit"
                checked={shop === 'blinkit'}
                onChange={(e) => setShop(e.target.value)}
              />
              <span className="radio-custom"></span>
              Blinkit
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="zomato"
                checked={shop === 'zomato'}
                onChange={(e) => setShop(e.target.value)}
              />
              <span className="radio-custom"></span>
              Zomato
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="amazon"
                checked={shop === 'amazon'}
                onChange={(e) => setShop(e.target.value)}
              />
              <span className="radio-custom"></span>
              Amazon
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="items">Items Needed <span className="required">*</span></label>
          <textarea
            id="items"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            placeholder="E.g., 1L Milk, 2 Chips packets, 1 Cold drink (comma separated)"
            className="form-input textarea"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomNumber">Room Number <span className="required">*</span></label>
          <input
            type="text"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="E.g., B-507 or 507"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="urgency">Urgency Level</label>
          <select
            id="urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="form-input"
          >
            <option value="low">Low - Can wait</option>
            <option value="normal">Normal - Standard</option>
            <option value="high">High - Soon</option>
            <option value="urgent">Urgent - ASAP</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions? (Optional)"
            className="form-input textarea"
            rows="2"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="btn btn-primary btn-full">
          Post Errand
        </button>
      </form>
    </div>
  );
}
