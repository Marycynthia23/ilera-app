import React from 'react';
import './Settings.css';

function Settings({ currentUser, userData }) {
  // Generate user initials from fullname or email
  const getInitials = () => {
    if (!userData) return 'U';
    if (userData.fullname) {
      const parts = userData.fullname.split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return userData.fullname.substring(0, 2).toUpperCase();
    }
    const emailPrefix = userData.email?.split('@')[0] || '';
    return emailPrefix.substring(0, 2).toUpperCase() || 'U';
  };

  const initials = getInitials();
  const displayName = userData?.fullname || userData?.email?.split('@')[0] || currentUser || 'User';
  const email = userData?.email || (currentUser ? `${currentUser}@example.com` : 'user@example.com');

  return (
    <div className="settings">
      <div className="settings-header">
        <p className="settings-subtitle">Manage your account settings and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2 className="section-title">Profile</h2>
          <div className="profile-card">
            <div className="profile-avatar">
              <span className="avatar-initials">{initials}</span>
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{displayName}</h3>
              <p className="profile-email">{email}</p>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Account</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Full Name</h4>
                <p className="setting-description">Your display name</p>
              </div>
              <div className="setting-value">{userData?.fullname || 'N/A'}</div>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Email Address</h4>
                <p className="setting-description">Your account email</p>
              </div>
              <div className="setting-value">{email}</div>
            </div>
           
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

