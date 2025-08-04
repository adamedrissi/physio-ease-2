import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { formatISO, startOfWeek } from 'date-fns';
import { UserContext } from '../../UserContext';
import { searchPhysios, fetchSlots, bookConsultation } from '../../services/apiService';
import '../../styles/patient/PatientConsultations.css';

function Consultations() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const [autoLocation, setAutoLocation] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [radiusKm, setRadiusKm] = useState(10);
  const [week, setWeek] = useState(startOfWeek(new Date()));
  const [slots, setSlots] = useState([]);

  const specialities = [
    t('neurologicalDisorder'),
    t('geriatrics'),
    t('cardiovascularPulmonaryPhysiotherapy'),
    t('paediatricPhysiotherapy'),
    t('musculoskeletalPhysiotherapy'),
    t('sportsPhysiotherapy'),
    t('cardiovascularDisease'),
    t('orthopedics'),
    t('vestibularRehabilitation'),
    t('homecarePhysiotherapy'),
    t('hydrotherapy'),
    t('pelvicFloor'),
    t('womensHealthPhysiotherapy'),
    t('acupuncture'),
    t('magneticTherapy'),
    t('manualTherapy'),
    t('oncology'),
    t('postOperativePhysiotherapist'),
    t('generalRehabilitation'),
    t('chestPhysiotherapy'),
    t('electrotherapy')
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!autoLocation || !user.country) {
      alert(t('countryRequired') + ' / ' + t('pProvideLocation'));
      return;
    }
    if (!selectedSpeciality) {
      alert(t('pSelectSpeciality'));
      return;
    }
    const results = await searchPhysios({
      lat: autoLocation.latitude,
      lon: autoLocation.longitude,
      radiusKm,
      speciality: selectedSpeciality,
      country: user.country
    });
    setSearchResults(results);
  };

  const openModal = async (physio) => {
    setSelectedDoctor(physio);
    const weekIso = formatISO(week, { representation: 'date' });
    const free = await fetchSlots(physio.id, weekIso);
    setSlots(free);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
    setSlots([]);
  };

  const book = async (slot) => {
    try {
      await bookConsultation({
        physioId: selectedDoctor.id,
        patientId: user.id,
        slotStart: slot,
        online: false
      });
      alert(t('consultationScheduled'));
      closeModal();
    } catch (err) {
      console.error("Booking failed", err);
      alert(t('bookingFailed'));
    }
  };

  return (
    <div className="consultations-page">
      <h1>{t('consultations')}</h1>
      <p>{t('consultationTag')}</p>

      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
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
        <div className="form-group">
          <label>{t('radius')}</label>
          <input type="range" min="1" max="200" value={radiusKm} onChange={(e) => setRadiusKm(Number(e.target.value))} />
          <span>{radiusKm} km</span>
        </div>
        <div className="form-group">
          <label>{t('weekOf')}</label>
          <input
            type="date"
            value={formatISO(week, { representation: 'date' })}
            onChange={(e) => setWeek(startOfWeek(new Date(e.target.value)))}
          />
        </div>
        <button type="submit">{t('search')}</button>
      </form>

      <div className="results-container">
        {searchResults.map(doctor => (
          <div key={doctor.id} className="consultation-box" onClick={() => openModal(doctor)}>
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
            <h2>{t('scheduleWith')} {selectedDoctor.fullName}</h2>
            {slots.length === 0 ? (
              <p>{t('noSlotsAvailable')}</p>
            ) : (
              <div className="slots-list">
                {slots.map((slot, index) => (
                  <button key={index} onClick={() => book(slot)}>
                    {new Date(slot).toLocaleString()}
                  </button>
                ))}
              </div>
            )}
            <div className="modal-buttons">
              <button type="button" onClick={closeModal}>{t('cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Consultations;