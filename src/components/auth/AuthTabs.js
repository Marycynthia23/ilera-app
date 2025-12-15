import React from 'react';
import './AuthForm.css';

function AuthTabs({ activeTab, onSignInClick, onSignUpClick }) {
  return (
    <div className="auth-tabs">
      <button
        type="button"
        className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
        onClick={onSignInClick}
      >
        Sign In
      </button>
      <button
        type="button"
        className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
        onClick={onSignUpClick}
      >
        Sign Up
      </button>
    </div>
  );
}

export default AuthTabs;

