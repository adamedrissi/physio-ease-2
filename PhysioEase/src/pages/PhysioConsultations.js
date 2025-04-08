import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './PhysioConsultations.css';

function Consultations() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('consultations')}</h1>
      <p>You have X Consultations this month.</p>
      <button type="change">{t('change')}</button>
      <button type="remove">{t('remove')}</button>
      <p>You have X Slots still available.</p>
      <button type="add">{t('addSlots')}</button>
      <button type="remove">{t('removeSlots')}</button>
    </div>
  );
}

export default Consultations;