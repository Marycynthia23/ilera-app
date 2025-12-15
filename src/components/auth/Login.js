import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './AuthForm.css';
import logo from '../../assets/images/ilera-logo.png';
import AuthTabs from './AuthTabs';
import FormGroup from './FormGroup';
import ErrorMessage from './ErrorMessage';

function Login({ onLogin, onSwitchToSignup }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Please enter a username');
      toast.error('Please enter a username');
      return;
    }

    const result = onLogin(username.trim());
    if (!result.success) {
      const errorMsg = result.message || 'Invalid username';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="logo" width={200} height={100} className="auth-logo" />
        <p className="auth-subtitle">Monitor your blood pressure and sugar levels</p>
        
        <AuthTabs 
          activeTab="signin"
          onSignInClick={() => {}}
          onSignUpClick={onSwitchToSignup}
        />

        <form onSubmit={handleSubmit} className="auth-form">
          <ErrorMessage message={error} />
          
          <FormGroup
            label="Username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            autoFocus
          />
          
          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
