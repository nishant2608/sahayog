import { createContext, useState, useCallback, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [errands, setErrands] = useState([]);
  const [userErrands, setUserErrands] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const login = useCallback((email, password) => {
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      role: 'student', // 'student' or 'volunteer'
      rewardPoints: 0,
      phone: '+91-9876543210',
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const signup = useCallback((email, password, name) => {
    const userData = {
      id: Date.now(),
      email,
      name,
      role: 'student',
      rewardPoints: 0,
      phone: '+91-9876543210',
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }, []);

  const createErrand = useCallback((errandData) => {
    const newErrand = {
      id: Date.now(),
      ...errandData,
      status: 'pending', // pending, accepted, completed
      createdBy: user.id,
      createdAt: new Date(),
      acceptedBy: null,
    };
    setUserErrands((prev) => [...prev, newErrand]);
    setErrands((prev) => [...prev, newErrand]);

    // Simulate notifying volunteers
    setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        {
          id: newErrand.id,
          type: 'new_errand',
          errand: newErrand,
          timestamp: new Date(),
        },
      ]);
    }, 500);

    return newErrand;
  }, [user]);

  const acceptErrand = useCallback((errandId) => {
    setErrands((prev) =>
      prev.map((e) =>
        e.id === errandId ? { ...e, status: 'accepted', acceptedBy: user.id } : e
      )
    );
    setUserErrands((prev) =>
      prev.map((e) =>
        e.id === errandId ? { ...e, status: 'accepted', acceptedBy: user.id } : e
      )
    );
  }, [user]);

  const completeErrand = useCallback((errandId) => {
    setErrands((prev) =>
      prev.map((e) => (e.id === errandId ? { ...e, status: 'completed' } : e))
    );
    setUserErrands((prev) =>
      prev.map((e) => (e.id === errandId ? { ...e, status: 'completed' } : e))
    );

    // Award points to volunteer
    setUser((prev) => ({
      ...prev,
      rewardPoints: prev.rewardPoints + 50,
    }));
  }, []);

  const removeNotification = useCallback((notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  }, []);

  const updateProfile = useCallback((data) => {
    setUser((prev) => ({ ...prev, ...data }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...data }));
  }, [user]);

  const value = {
    user,
    errands,
    userErrands,
    notifications,
    login,
    logout,
    signup,
    createErrand,
    acceptErrand,
    completeErrand,
    removeNotification,
    updateProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
