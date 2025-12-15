import React, { useState } from 'react';
import './Sidebar.css';
import logo from '../../assets/images/ilera-logo.png';
import { FaPills } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

function Sidebar({ activeView, onViewChange, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { id: 'medications', label: 'Manage Meds', icon: <FaPills /> },
    { id: 'vitals', label: 'Track Vitals', icon: <FaHeartbeat /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  const handleNavClick = (id) => {
    onViewChange(id);
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
      <button className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="">
            <img src={logo} alt="logo" width={200} height={100} className="auth-logo" />
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
          <button className="nav-item logout-item" onClick={handleLogoutClick}>
            <span className="nav-icon"><FaSignOutAlt /></span>
            <span className="nav-label">Log out</span>
          </button>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;

