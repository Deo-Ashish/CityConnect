<<<<<<< HEAD
import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
=======
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
>>>>>>> 9abce5f (code written again)

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    if (token) fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
=======
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5001/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data.user);
      }).catch(() => {
        localStorage.removeItem('token');
      }).finally(() => {
        setLoading(false);
>>>>>>> 9abce5f (code written again)
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

<<<<<<< HEAD
  const login = async (data) => {
    try {
      const res = await authService.login(data);
      if (res.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setUser(res.user);
      }
    } catch (err) {
      throw err;
    }
=======
  const register = async (userData) => {
    const res = await axios.post('http://localhost:5001/api/auth/register', userData);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
>>>>>>> 9abce5f (code written again)
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
