import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../UserContext';
import { fetchPhysioConsultations } from '../../services/apiService';
import { format } from 'date-fns';
import '../../styles/physio/PhysioConsultations.css';

const Card = ({ children }) => (
  <div className="card-style">{children}</div>
);

const formatSlot = (dateTimeString) =>
  format(new Date(dateTimeString), 'EEEE HH:mm');

function PhysioConsultations() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const { data: consultations = [], isLoading, error } = useQuery(['my-consultations'], ()=> 
   fetchPhysioConsultations(user.id));

  if (isLoading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('errorLoadingConsultations')}</p>;

  return (
    <div className="grid">
      {consultations.map(c=>(
        <Card key={c.id}>{formatSlot(c.slotStart)} – {c.patientName}</Card>
      ))}
      <p>{t('capacity')}: {consultations.length}/40</p>
    </div>
  );
}

export default PhysioConsultations;