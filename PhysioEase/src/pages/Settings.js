import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Settings.css';

function Settings() {
  // Initialise dark mode state from localStorage (if available)
  const { i18n, t } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  // Update document body and localStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  return (
    <div className="settings">
      <h1>{t('settings')}</h1>
      <div className="setting-item">
        <label>
        {t('darkMode')}:
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
        </label>
      </div>
      <div className="setting-item">
        <label>
        {t('language')}:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="af">Afrikaans</option>
            <option value="am">Amharic - አማርኛ</option>
            <option value="ar">Arabic - اَلْعَرَبِيَّةُ</option>
            <option value="bg">Bulgarian - Български</option>
            <option value="bn">Bengali/Bangla - বাংলা</option>
            <option value="ca">Catalan - Català</option>
            <option value="cs">Czech - Čeština</option>
            <option value="cy">Welsh - Cymraeg</option>
            <option value="da">Danish - Dansk</option>
            <option value="de">German - Deutsch</option>
            <option value="el">Greek - Ελληνικά</option>
            <option value="es">Spanish - Español/Castellano</option>
            <option value="eu">Basque - Euskara</option>
            <option value="fa">Persian/Farsi - فارسی</option>
            <option value="fr">French - Français</option>
            <option value="gl">Galician - Galego</option>
            <option value="he">Hebrew - עברית</option>
            <option value="hi">Hindi - हिन्दी</option>
            <option value="hu">Hungarian - Magyar</option>
            <option value="id">Indonesian - Bahasa Indonesia</option>
            <option value="it">Italian - Italiano</option>
            <option value="ja">Japanese - 日本語</option>
            <option value="ko">Korean - 한국어</option>
            <option value="ku">Kurdish - Kurdî</option>
            <option value="my">Burmese - မြန်မာဘာသာ</option>
            <option value="nl">Dutch - Nederlands</option>
            <option value="no">Norwegian - Norsk</option>
            <option value="pl">Polish - Polski</option>
            <option value="pt">Portuguese - Português</option>
            <option value="ro">Romanian - Română</option>
            <option value="ru">Russian - русский язык</option>
            <option value="sh">Serbo-Croatian - Srpskohrvatski/српскохрватски</option>
            <option value="sq">Albanian - Shqip</option>
            <option value="sv">Swedish - Svenska</option>
            <option value="sw">Swahili - Kiswahili</option>
            <option value="th">Thai - ไทย</option>
            <option value="tl">Tagalog</option>
            <option value="tr">Turkish - Türkçe</option>
            <option value="uk">Ukrainian - Українська</option>
            <option value="ur">Urdu - اُردُو</option>
            <option value="vi">Vietnamese - Tiếng Việt</option>
            <option value="zh">Standard Chinese - 现代标准汉语</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Settings;