import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { ToastContainer } from 'react-toastify';

function Auth({ onLogin, onSignup }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'

  const handleSwitchToSignup = () => {
    setMode('signup');
  };

  const handleSwitchToLogin = () => {
    setMode('signin');
  };

  if (mode === 'signup') {
    return <Signup onSignup={onSignup} onSwitchToLogin={handleSwitchToLogin} />;
  }

  // return <Login onLogin={onLogin} onSwitchToSignup={handleSwitchToSignup} />;
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {mode === 'signup' ? <Signup onSignup={onSignup} onSwitchToLogin={handleSwitchToLogin} /> : <Login onLogin={onLogin} onSwitchToSignup={handleSwitchToSignup} />}
    </div>
  );
}

export default Auth;

