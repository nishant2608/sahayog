import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CreateErrand from './pages/CreateErrand';
import AvailableErrands from './pages/AvailableErrands';
import MyErrands from './pages/MyErrands';
import AcceptedTasks from './pages/AcceptedTasks';
import Profile from './pages/Profile';
import './styles/Global.css';

// Protected Route Component
function ProtectedRoute({ element }) {
  const { user } = useContext(AppContext);
  return user ? element : <Navigate to="/" replace />;
}

function AppRoutes() {
  const { user } = useContext(AppContext);

  useEffect(() => {
    // Load user from localStorage on app load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      // User will be set by context initialization
    }
  }, []);

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', background: 'white', minHeight: '100vh' }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/create-errand" element={<ProtectedRoute element={<CreateErrand />} />} />
        <Route path="/available-errands" element={<ProtectedRoute element={<AvailableErrands />} />} />
        <Route path="/my-errands" element={<ProtectedRoute element={<MyErrands />} />} />
        <Route path="/accepted-tasks" element={<ProtectedRoute element={<AcceptedTasks />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />

        {/* Catch all - redirect to home or login */}
        <Route path="*" element={<Navigate to={user ? '/home' : '/'} replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
