import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import './PhysioHome.css';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserContext';

function Home() {
  const { user } = useContext(UserContext);
  const { t, i18n } = useTranslation();

  const localeMap = {
    en: 'en-GB',
    af: 'af-ZA',
    am: 'am-AM',
    ar: 'ar-AR',
    bg: 'bg-BG',
    bn: 'bn-BD',
    ca: 'ca-CA',
    cs: 'cs-CZ',
    cy: 'cy-GB',
    da: 'da-DK',
    de: 'de-DE',
    el: 'el-GR',
    es: 'es-ES',
    eu: 'eu-ES',
    fa: 'fa-IR',
    fr: 'fr-FR',
    gl: 'gl-ES',
    he: "he-IL",
    hi: 'hi-IN',
    hu: "hu-HU",
    id: 'id-ID',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: "ko-KR",
    ku: "ku-KU",
    my: "my-MM",
    nl: "nl-NL",
    no: "no-NO",
    pl: "pl-PL",
    pt: 'pt-PT',
    ro: "ro-RO",
    ru: 'ru-RU',
    sh: "sh-SH",
    sq: "sq-AL",
    sv: "sv-SE",
    sw: "sw-SW",
    th: "th-TH",
    tl: "tl-PH",
    tr: "tr-TR",
    uk: "uk-UA",
    ur: 'ur-UR',
    vi: "vi-VN",
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
      <h1>{t('welcomeDr', { name: user.lastName })}</h1>
      <p>{t('today', { date: currentDate })}</p>
      <p>{t('allocation')}2{t('patients')}</p>
      <p>{t('youHave')}4{t('consultationsMonth')}</p>
      <p>{t('youHave')}3{t('slotsAvailable')}</p>
      <Link to="/faqs" className="faq-button">
        ?
      </Link>
    </div>
  );
}

export default Home;