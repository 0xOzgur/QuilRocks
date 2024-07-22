'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  balance: number;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = localStorage.getItem('isAuthenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
        await fetchBalance();
      }
    };

    checkAuth();
  }, []);

  const fetchBalance = async () => {
    // In a real application, this would fetch the balance from an API
    const randomBalance = Math.floor(Math.random() * 1000);
    setBalance(randomBalance);
  };

  const login = async () => {
    // Implement your passkey authentication logic here
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    await fetchBalance();
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setBalance(0);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, balance, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};