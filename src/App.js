import React, { useState, useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import Auth from './components/auth/Auth';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import MedicationForm from './components/medications/MedicationForm';
import MedicationList from './components/medications/MedicationList';
import VitalsForm from './components/vitals/VitalsForm';
import VitalsLog from './components/vitals/VitalsLog';
import Settings from './components/settings/Settings';
import {
  loadMedications,
  saveMedications,
  loadVitals,
  saveVitals,
  getCurrentUser,
  setCurrentUser,
  registerUser,
  authenticateUser,
  getUserByUsername
} from './utils/storage';

function App() {
  const [currentUser, setCurrentUserState] = useState(null);
  const [medications, setMedications] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Load user-specific data
  const loadUserData = useCallback((username) => {
    const loadedMedications = loadMedications(username);
    const loadedVitals = loadVitals(username);
    setMedications(loadedMedications);
    // Sort vitals by timestamp (newest first)
    const sortedVitals = loadedVitals.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    setVitals(sortedVitals);
  }, []);

  // Load user and data on mount
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setCurrentUserState(savedUser);
      loadUserData(savedUser);
    }
  }, [loadUserData]);

  // Handle login (username-only, no password required)
  const handleLogin = useCallback((username) => {
    const result = authenticateUser(username);
    if (result.success) {
      // Use username from result for data storage
      const user = result.username;
      setCurrentUserState(user);
      setCurrentUser(user);
      loadUserData(user);
      setLastActivityTime(Date.now());
      toast.success(`Welcome back, ${user}!`);
      return { success: true };
    }
    return result;
  }, [loadUserData]);

  // Handle signup
  const handleSignup = useCallback((fullname, email, password) => {
    const result = registerUser(fullname, email, password);
    if (result.success) {
      // Use username from result for data storage compatibility
      const username = result.username;
      setCurrentUserState(username);
      setCurrentUser(username);
      loadUserData(username);
      setLastActivityTime(Date.now());
      toast.success(`Account created successfully! Welcome, ${fullname}!`);
      return { success: true };
    }
    return result;
  }, [loadUserData]);

  // Handle logout
  const handleLogout = useCallback(() => {
    setCurrentUserState(null);
    setCurrentUser(null);
    setMedications([]);
    setVitals([]);
    toast.info('You have been logged out');
  }, []);

  // Track user activity
  const updateActivity = useCallback(() => {
    setLastActivityTime(Date.now());
  }, []);

  // Set up activity listeners
  useEffect(() => {
    if (!currentUser) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [currentUser, updateActivity]);

  // Auto-logout after 10 minutes of inactivity
  useEffect(() => {
    if (!currentUser) return;

    const checkInactivity = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityTime;
      const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

      if (timeSinceLastActivity >= tenMinutes) {
        handleLogout();
        toast.warning('You have been automatically logged out due to inactivity.');
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInactivity);
  }, [currentUser, lastActivityTime, handleLogout]);

  // Handle add medication
  const handleAddMedication = (medication) => {
    const updatedMedications = [...medications, medication];
    setMedications(updatedMedications);
    saveMedications(currentUser, updatedMedications);
    updateActivity();
    toast.success(`${medication.name} added successfully`);
  };

  // Handle remove medication
  const handleRemoveMedication = (id) => {
    const medication = medications.find(med => med.id === id);
    const updatedMedications = medications.filter(med => med.id !== id);
    setMedications(updatedMedications);
    saveMedications(currentUser, updatedMedications);
    updateActivity();
    toast.info(`${medication?.name || 'Medication'} removed`);
  };

  // Handle log vitals
  const handleLogVitals = (vital) => {
    const updatedVitals = [vital, ...vitals];
    // Sort by timestamp (newest first)
    const sortedVitals = updatedVitals.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    setVitals(sortedVitals);
    saveVitals(currentUser, sortedVitals);
    updateActivity();
    toast.success('Vital signs logged successfully');
  };

  // Get user data
  const getUserData = () => {
    if (!currentUser) return null;
    const user = getUserByUsername(currentUser);
    return user || { fullname: currentUser, email: `${currentUser}` };
  };

  // Generate user initials from fullname or username
  const getInitials = (userData) => {
    if (!userData) return 'U';
    if (userData.fullname) {
      const parts = userData.fullname.split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return userData.fullname.substring(0, 2).toUpperCase();
    }
    const parts = userData.email?.split('@')[0].split(/[\s_-]/) || [];
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (userData.email?.substring(0, 2) || 'U').toUpperCase();
  };

  // Generate display name from user data
  const getDisplayName = (userData) => {
    if (!userData) return 'User';
    return userData.fullname || userData.email?.split('@')[0] || 'User';
  };

  // Render current view
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard medications={medications} vitals={vitals} />;
      case 'medications':
        return (
          <div className="view-container">
            <MedicationForm onAddMedication={handleAddMedication} />
            <MedicationList 
              medications={medications} 
              onRemoveMedication={handleRemoveMedication} 
            />
          </div>
        );
      case 'vitals':
        return (
          <div className="view-container">
            <VitalsForm onLogVitals={handleLogVitals} />
            <VitalsLog vitals={vitals} />
          </div>
        );
      case 'settings':
        return <Settings currentUser={currentUser} userData={getUserData()} />;
      default:
        return <Dashboard medications={medications} vitals={vitals} />;
    }
  };

  // Show auth screen if not authenticated
  if (!currentUser) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup} />;
  }

  const userData = getUserData();
  const initials = getInitials(userData);
  const displayName = getDisplayName(userData);
  const email = userData?.email || `${currentUser}`;

  // Main application view
  return (
    <div className="App">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        onLogout={handleLogout}
      />
      <div className="main-content">
       <div className="main-content-right">
       <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'medications' && 'Manage Medications'}
              {activeView === 'vitals' && 'Track Vitals'}
              {activeView === 'settings' && 'Settings'}
            </h1>
            <div className="user-profile">
              <div className="profile-avatar-small">
                <span className="avatar-initials-small">{initials}</span>
              </div>
              <div className="profile-details">
                <span className="profile-name-small">{displayName}</span>
                <span className="profile-email-small">{email}</span>
              </div>
            </div>
          </div>
        </header>
        <main className="app-main">
          {renderView()}
        </main>
       </div>
      </div>
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
    </div>
  );
}

export default App;
