import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserContext';

function Home() {
  const { user } = useContext(UserContext);
  const { t, i18n } = useTranslation();

  const localeMap = {
    en: 'en-GB',
    ar: 'ar-AR',
    bn: 'bn-BN',
    ca: 'ca-CA',
    de: 'de-DE',
    es: 'es-ES',
    fr: 'fr-FR',
    hi: 'hi-HI',
    id: 'id-ID',
    it: 'it-IT',
    ja: 'ja-JA',
    pt: 'pt-PT',
    ru: 'ru-RU',
    ur: 'ur-UR',
    zh: 'zh-CN'
  };
  const currentLocale = localeMap[i18n.language] || 'en-GB';

  const currentDate = new Date().toLocaleDateString(currentLocale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div>
      <h1>{t('welcome', { name: user.firstName })}</h1>
      <p>{t('today', { date: currentDate })}</p>
      {user.trackingPlanCompleted ? (
        <p>{t('trackingCompleted')}</p>
      ) : (
        <p>{t('trackingNotCompleted')}</p>
      )}
      <Link to="/faqs" className="faq-button">
        ?
      </Link>
    </div>
  );
}

export default Home;