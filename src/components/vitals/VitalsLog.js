import React from 'react';
import './VitalsLog.css';

function VitalsLog({ vitals }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (vitals.length === 0) {
    return (
      <div className="vitals-log-container">
        <h2 className="section-title">Vital Signs History</h2>
        <p className="empty-message">No vital signs logged yet. Log your first reading above.</p>
      </div>
    );
  }

  return (
    <div className="vitals-log-container">
      <h2 className="section-title">Vital Signs History</h2>
      <div className="vitals-log">
        {vitals.map((vital) => (
          <div key={vital.id} className="vital-entry">
            <div className="vital-header">
              <span className="vital-timestamp">{formatTimestamp(vital.timestamp)}</span>
            </div>
            <div className="vital-metrics">
              <div className="vital-metric">
                <span className="metric-label">Blood Pressure</span>
                <span className="metric-value">{vital.systolic}/{vital.diastolic} mmHg</span>
              </div>
              <div className="vital-metric">
                <span className="metric-label">Heart Rate</span>
                <span className="metric-value">{vital.heartRate} BPM</span>
              </div>
              <div className="vital-metric">
                <span className="metric-label">Weight</span>
                <span className="metric-value">{vital.weight} (Kg)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VitalsLog;

