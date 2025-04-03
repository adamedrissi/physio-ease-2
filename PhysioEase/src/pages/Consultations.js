import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Consultations.css';

function Consultations() {
  // Sample data for 10 consultations
  const consultationsData = [
    { id: 1, fullName: "Dr. John Smith", speciality: "Orthopedic", location: "Camden, London", email: "john.smith@google.com" },
    { id: 2, fullName: "Dr. Emily Johnson", speciality: "Sports Therapy", location: "Newcastle", email: "emily.johnson@gmail.com" },
    { id: 3, fullName: "Dr. Michael Brown", speciality: "Neurology", location: "Birmingham", email: "michael.brown@outlook.com" },
    { id: 4, fullName: "Dr. Linda Davis", speciality: "Pediatrics", location: "Croydon, London", email: "linda.davis@gmail.com" },
    { id: 5, fullName: "Dr. William Miller", speciality: "Geriatrics", location: "Leyton, London", email: "william.miller@hotmail.com" },
    { id: 6, fullName: "Dr. Elizabeth Wilson", speciality: "Cardiology", location: "Carlisle", email: "elizabeth.wilson@gmail.com" },
    { id: 7, fullName: "Dr. James Taylor", speciality: "Pulmonology", location: "Plymouth", email: "james.taylor@gmail.com" },
    { id: 8, fullName: "Dr. Patricia Anderson", speciality: "Dermatology", location: "Glasgow", email: "patricia.anderson@outlook.com" },
    { id: 9, fullName: "Dr. Robert Thomas", speciality: "Gastroenterology", location: "Southampton", email: "robert.thomas@ymail.com" },
    { id: 10, fullName: "Dr. Jennifer Jackson", speciality: "Endocrinology", location: "Manchester", email: "jennifer.jackson@google.com" }
  ];

  // State for the selected consultation and modal visibility
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  const { t } = useTranslation();

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setScheduleDateTime('');
    setIsModalOpen(false);
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    // Additional validation could be given (e.g., ensuring the date is in the future)
    alert(`Consultation scheduled with ${selectedDoctor.fullName} on ${scheduleDateTime}`);
    closeModal();
  };

  return (
    <div>
      <h1>{t('consultations')}</h1>
      <p>{t('consultationTag')}</p>
      <div className="consultations-container">
        {consultationsData.map(doctor => (
          <div 
            key={doctor.id} 
            className="consultation-box" 
            onClick={() => openModal(doctor)}
          >
            <h3>{doctor.fullName}</h3>
            <p><strong>{t('speciality')}</strong> {doctor.speciality}</p>
            <p><strong>{t('location')}</strong> {doctor.location}</p>
            <p><strong>{t('email')}</strong> {doctor.email}</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{t('scheduleWith')}{selectedDoctor.fullName}</h2>
            <form onSubmit={handleSchedule}>
              <div className="form-group">
                <label>{t('selectDateTime')}</label>
                <input 
                  type="datetime-local" 
                  value={scheduleDateTime} 
                  onChange={(e) => setScheduleDateTime(e.target.value)}
                  required 
                />
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={closeModal}>{t('cancel')}</button>
                <button type="submit">{t('schedule')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Consultations;