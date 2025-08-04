import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../UserContext';
import '../../styles/patient/PatientHome.css';

function Home() {
  const { user } = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const [trackingCompleted, setTrackingCompleted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('trackingCompleted');
    setTrackingCompleted(stored === 'true');
  }, []);

  const localeMap = {
    en: 'en-GB', af: 'af-ZA', am: 'am-AM', ar: 'ar-AR', bg: 'bg-BG', bn: 'bn-BD',
    ca: 'ca-CA', cs: 'cs-CZ', cy: 'cy-GB', da: 'da-DK', de: 'de-DE', el: 'el-GR',
    es: 'es-ES', eu: 'eu-ES', fa: 'fa-IR', fr: 'fr-FR', gl: 'gl-ES', he: "he-IL",
    hi: 'hi-IN', hu: "hu-HU", id: 'id-ID', it: 'it-IT', ja: 'ja-JP', ko: "ko-KR",
    ku: "ku-KU", my: "my-MM", nl: "nl-NL", no: "no-NO", pl: "pl-PL", pt: 'pt-PT',
    ro: "ro-RO", ru: 'ru-RU', sq: "sq-AL", sr: "sr-RS", sv: "sv-SE", sw: "sw-SW",
    th: "th-TH", tl: "tl-PH", tr: "tr-TR", uk: "uk-UA", ur: 'ur-UR', vi: "vi-VN",
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
      {trackingCompleted ? (
        <p>{t('trackingCompleted')}</p>
      ) : (
        <p>{t('trackingNotCompleted')}</p>
      )}
      <Link to="/track-progress">
        <button className="track-button">{t('checkHere')}</button>
      </Link>
    </div>
  );
}

export default Home;