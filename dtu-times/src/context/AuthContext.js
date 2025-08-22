"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, login, signup } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      getProfile(t)
        .then((res) => setUser(res.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    setToken(res.token);
    localStorage.setItem('token', res.token);
    setUser(res.user);
  };

  const handleSignup = async (name, email, password) => {
    await signup(name, email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login: handleLogin, signup: handleSignup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
