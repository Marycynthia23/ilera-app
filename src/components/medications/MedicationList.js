import React, { useState } from 'react';
import './MedicationList.css';
import { FaTrashCan } from "react-icons/fa6";
import ConfirmModal from '../../common/ConfirmModal';

function MedicationList({ medications, onRemoveMedication }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const handleRemoveClick = (medication) => {
    setSelectedMedication(medication);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    onRemoveMedication(selectedMedication.id);
    setIsModalOpen(false);
    setSelectedMedication(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMedication(null);
  };

  if (medications.length === 0) {
    return (
      <div className="medication-list-container">
        <h2 className="section-title">My Medications</h2>
        <p className="empty-message">
          No medications added yet. Add your first medication above.
        </p>
      </div>
    );
  }

  return (
    <div className="medication-list-container">
      <h2 className="section-title">My Medications</h2>

      <div className="medication-list">
        {medications.map((medication) => (
          <div key={medication.id} className="medication-item">
            <div className="medication-info">
              <h3 className="medication-name">{medication.name}</h3>
              <div className="medication-details">
                <span>{medication.dosage}</span>
                <span className="medication-separator">•</span>
                <span>{medication.frequency}</span>
              </div>
            </div>

            <button
              onClick={() => handleRemoveClick(medication)}
              className="remove-button"
              aria-label="Remove medication"
            >
              <FaTrashCan className="remove-button-icon" />
            </button>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Remove Medication"
        message={`Are you sure you want to remove "${selectedMedication?.name}"?`}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default MedicationList;
