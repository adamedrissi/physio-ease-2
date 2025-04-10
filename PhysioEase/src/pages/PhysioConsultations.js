import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './PhysioConsultations.css';

function Consultations() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('consultations')}</h1>
      <p>{t('youHave')} X {t('consultationsMonth')}</p>
      <button type="change">{t('change')}</button>
      <button type="remove">{t('remove')}</button>
      <p>{t('youHave')} X {t('slotsAvailable')}</p>
      <button type="add">{t('addSlots')}</button>
      <button type="remove">{t('removeSlots')}</button>
    </div>
  );
}

export default Consultations;