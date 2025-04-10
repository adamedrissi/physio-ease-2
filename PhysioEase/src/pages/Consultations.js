import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Consultations.css';

function Consultations() {
  const { t } = useTranslation();

  const [manualLocation, setManualLocation] = useState('');
  const [autoLocation, setAutoLocation] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('');

  const specialities = [
    t('neurologicalDisorder'),
    t('geriatrics'),
    t('cardiovascularPulmonaryPhysiotherapy'),
    t('pediatricPhysiotherapy'),
    t('musculoskeletalPhysiotherapy'),
    t('sportsPhysiotherapy'),
    t('cardiovascularDisease'),
    t('orthopedics'),
    t('vestibularRehabilitation'),
    t('homecarePhysiotherapy'),
    t('pediatrics'),
    t('pelvicFloor'),
    t('womensHealthPhysiotherapy'),
    t('acupuncture'),
    t('magneticTherapy'),
    t('manualTherapy'),
    t('oncology'),
    t('postOperativePhysiotherapist'),
    t('rehabilitation'),
    t('chestPhysiotherapy'),
    t('womensHealth')
  ];

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setAutoLocation(coords);
          alert(t('locationDetected'));
          alert(`${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)}`);
        },
        (error) => {
          console.error(t('errorLocation'), error);
          alert(t('errorLocation'));
        }
      );
    } else {
      alert(t('geoLocation'));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let locationUsed = autoLocation ? `${autoLocation.latitude}, ${autoLocation.longitude}` : manualLocation;
    if (!locationUsed) {
      alert(t('pProvideLocation'));
      return;
    }
    if (!selectedSpeciality) {
      alert(t('pSelectSpeciality'));
      return;
    }
    console.log("Searching with:", { location: locationUsed, speciality: selectedSpeciality });
    
    const dummyResults = [];
    for (let i = 1; i <= 3; i++) {
      dummyResults.push({
        id: i,
        fullName: `Physiotherapist ${i}`,
        speciality: selectedSpeciality,
        location: locationUsed,
        email: `physio${i}@example.com`
      });
    }
    setSearchResults(dummyResults);
  };

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
    alert(t('consultationScheduledWith'));
    alert(`${selectedDoctor.fullName} - ${scheduleDateTime}`);
    closeModal();
  };

  return (
    <div className="consultations-page">
      <h1>{t('consultations')}</h1>
      <p>{t('consultationTag')}</p>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>{t('location')}</label>
          {/*
          <input 
            type="text" 
            value={manualLocation} 
            onChange={(e) => setManualLocation(e.target.value)} 
            placeholder="Enter your location manually" 
          />*/}
          <button type="button" onClick={handleDetectLocation}>{t('detectMyLocation')}</button>
        </div>
        <div className="form-group">
          <label>{t('speciality')}</label>
          <select value={selectedSpeciality} onChange={(e) => setSelectedSpeciality(e.target.value)}>
            <option value="">{t('enterSpeciality')}</option>
            {specialities.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        <button type="submit">{t('search')}</button>
      </form>

      <div className="results-container">
        {searchResults.map(doctor => (
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