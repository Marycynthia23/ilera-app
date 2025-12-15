import React, { useState } from 'react';
import './VitalsForm.css';

function VitalsForm({ onLogVitals }) {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const sys = Number(systolic);
    const dia = Number(diastolic);
    const hr = Number(heartRate);
    const wt = Number(weight);

    if (!systolic) {
      newErrors.systolic = 'Systolic pressure is required';
    } else if (sys < 70 || sys > 250) {
      newErrors.systolic = 'Systolic must be between 70 and 250';
    }

    if (!diastolic) {
      newErrors.diastolic = 'Diastolic pressure is required';
    } else if (dia < 40 || dia > 150) {
      newErrors.diastolic = 'Diastolic must be between 40 and 150';
    }

    if (sys && dia && sys <= dia) {
      newErrors.diastolic = 'Diastolic must be lower than systolic';
    }

    if (!heartRate) {
      newErrors.heartRate = 'Heart rate is required';
    } else if (hr < 30 || hr > 220) {
      newErrors.heartRate = 'Heart rate must be between 30 and 220 BPM';
    }

    if (!weight) {
      newErrors.weight = 'Weight is required';
    } else if (wt < 20 || wt > 300) {
      newErrors.weight = 'Weight must be between 20 and 300 kg';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onLogVitals({
      id: Date.now(),
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      heartRate: Number(heartRate),
      weight: Number(weight),
      timestamp: new Date().toISOString()
    });

    setSystolic('');
    setDiastolic('');
    setHeartRate('');
    setWeight('');
    setErrors({});
  };

  return (
    <div className="vitals-form-container">
      <h2 className="section-title">Log Vital Signs</h2>

      <form onSubmit={handleSubmit} className="vitals-form" noValidate>
        <div className="form-row">
          <div className="form-group">
            <label>Blood Pressure (Systolic)</label>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="e.g., 120"
            />
            {errors.systolic && <p className="error-text">{errors.systolic}</p>}
          </div>

          <div className="form-group">
            <label>Blood Pressure (Diastolic)</label>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="e.g., 80"
            />
            {errors.diastolic && <p className="error-text">{errors.diastolic}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Heart Rate (BPM)</label>
            <input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              placeholder="e.g., 65"
            />
            {errors.heartRate && <p className="error-text">{errors.heartRate}</p>}
          </div>

          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
            />
            {errors.weight && <p className="error-text">{errors.weight}</p>}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Log Vitals
        </button>
      </form>
    </div>
  );
}

export default VitalsForm;
