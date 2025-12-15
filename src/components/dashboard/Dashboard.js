import React from 'react';
import './Dashboard.css';
import { FaPills } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { FaWeight } from "react-icons/fa";

function Dashboard({ medications, vitals }) {
  const latestVital = vitals.length > 0 ? vitals[0] : null;
  const medicationCount = medications.length;
  const vitalsCount = vitals.length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <p className="dashboard-subtitle">Overview of your health status</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon"><FaPills className='stat-icon-icon'/></div>
          <div className="stat-content">
            <h3 className="stat-value">{medicationCount}</h3>
            <p className="stat-label">Active Medications</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FaHeartbeat className='stat-icon-icon'/></div>
          <div className="stat-content">
            <h3 className="stat-value">{vitalsCount}</h3>
            <p className="stat-label">Vital Records</p>
          </div>
        </div>
        {latestVital && (
          <div className="stat-card">
            <div className="stat-icon"><FaWeight className='stat-icon-icon'/></div>
            <div className="stat-content">
              <h3 className="stat-value">{latestVital.systolic}/{latestVital.diastolic}</h3>
              <p className="stat-label">Latest BP (mmHg)</p>
            </div>
          </div>
        )}
      </div>

      {latestVital && (
        <div className="dashboard-recent">
          <h2 className="section-title">Latest Vital Signs</h2>
          <div className="recent-vital-card">
            <div className="recent-vital-header">
              <span className="recent-vital-date">
              {new Date(latestVital.timestamp).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}

              </span>
            </div>
            <div className="recent-vital-metrics">
              <div className="recent-metric">
                <span className="recent-metric-label">Blood Pressure</span>
                <span className="recent-metric-value">{latestVital.systolic}/{latestVital.diastolic} mmHg</span>
              </div>
              <div className="recent-metric">
                <span className="recent-metric-label">Heart Rate</span>
                <span className="recent-metric-value">{latestVital.heartRate} BPM</span>
              </div>
              <div className="recent-metric">
                <span className="recent-metric-label">Weight</span>
                <span className="recent-metric-value">{latestVital.weight} (Kg)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

