'use client';

import React from 'react';
import { useAuth } from './context/AuthContext';
import { usePasskeysContext } from './context/PasskeysContext';
import './AuthButton.css';

const AuthButton = () => {
  const { isAuthenticated, balance, login, logout } = useAuth();

  const handleAuth = async () => {
    if (isAuthenticated) {
      logout();
    } else {
      await login();
    }
  };

  return (
    <div className="auth-button-container">
      {isAuthenticated ? (
        <>
          <div className="auth-balance">Balance: {balance} QUIL</div>
          <button
            onClick={handleAuth}
            className="auth-button auth-button-signout"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={handleAuth}
          className="auth-button auth-button-signin"
        >
          Sign In With Passkey
        </button>
      )}
    </div>
  );
};

export default AuthButton;
