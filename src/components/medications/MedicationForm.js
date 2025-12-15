import React, { useState } from 'react';
import './MedicationForm.css';

function MedicationForm({ onAddMedication }) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Medication name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Medication name must be at least 2 characters';
    }

    if (!dosage.trim()) {
      newErrors.dosage = 'Dosage is required';
    } else if (!/\d/.test(dosage)) {
      newErrors.dosage = 'Dosage should include a number (e.g. 20mg)';
    }

    if (!frequency.trim()) {
      newErrors.frequency = 'Frequency is required';
    } else if (frequency.trim().length < 3) {
      newErrors.frequency = 'Frequency must be more descriptive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onAddMedication({
      id: Date.now(),
      name: name.trim(),
      dosage: dosage.trim(),
      frequency: frequency.trim()
    });

    setName('');
    setDosage('');
    setFrequency('');
    setErrors({});
  };

  return (
    <div className="medication-form-container">
      <h2 className="section-title">Add Medication</h2>

      <form onSubmit={handleSubmit} className="medication-form" noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="med-name">Medication Name</label>
            <input
              type="text"
              id="med-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Lisinopril"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="med-dosage">Dosage</label>
            <input
              type="text"
              id="med-dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g., 20mg"
            />
            {errors.dosage && <p className="error-text">{errors.dosage}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="med-frequency">Frequency</label>
          <input
            type="text"
            id="med-frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="e.g., Once daily in the morning"
          />
          {errors.frequency && (
            <p className="error-text">{errors.frequency}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Add Medication
        </button>
      </form>
    </div>
  );
}

export default MedicationForm;
