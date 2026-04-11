import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5001/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const u = res.data.user;
        setUser({ ...u, username: u.username || u.name });
      }).catch(() => {
        localStorage.removeItem('token');
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    const userData = { ...res.data.user, username: res.data.user.username || res.data.user.name };
    setUser(userData);
    return res.data;
  };

  const register = async (userData) => {
    const res = await axios.post('http://localhost:5001/api/auth/register', userData);
    localStorage.setItem('token', res.data.token);
    const userObj = { ...res.data.user, username: res.data.user.username || res.data.user.name };
    setUser(userObj);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
