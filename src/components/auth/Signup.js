import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './AuthForm.css';
import logo from '../../assets/images/ilera-logo.png';
import AuthTabs from './AuthTabs';
import FormGroup from './FormGroup';
import ErrorMessage from './ErrorMessage';

function Signup({ onSignup, onSwitchToLogin }) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!fullname.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    const result = onSignup(fullname.trim(), email.trim(), password);
    if (!result.success) {
      const errorMsg = result.message || 'Error creating account';
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
          activeTab="signup"
          onSignInClick={onSwitchToLogin}
          onSignUpClick={() => {}}
        />

        <form onSubmit={handleSubmit} className="auth-form">
          <ErrorMessage message={error} />
          
          <FormGroup
            label="Full Name"
            id="fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your full name"
            required
            autoFocus
          />
          
          <FormGroup
            label="Email Address"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
          
          <FormGroup
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
