import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import './RegisterLogin.css';

function RegisterLogin() {
  const { t, i18n } = useTranslation();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    role: 'patient',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const storedUserJSON = localStorage.getItem('registeredUser');
      if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        if (storedUser.email === formData.email && storedUser.password === formData.password) {
          setUser(storedUser);
          localStorage.setItem('userProfile', JSON.stringify(storedUser));
          navigate('/');
        } else {
          setError(t('invalidCredentials'));
        }
      } else {
        setError(t('noRegisteredUser'));
      }
    } else {
      if (formData.firstName && formData.lastName && formData.email && formData.password) {
        const newUser = { ...formData, id: Date.now() };
        setUser(newUser);
        localStorage.setItem('registeredUser', JSON.stringify(newUser));
        localStorage.setItem('userProfile', JSON.stringify(newUser));
        navigate('/');
      } else {
        setError(t('fillAllFields'));
      }
    }
  };

  return (
    <div className="register-login-container">
      <header className="login-header">
        <h1>PhysioEase</h1>
      </header>
      <div className="dark-mode-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? t('lightMode') : t('darkMode')}
        </button>
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
      </div>
      <h2>{isLogin ? t('login') : t('register')}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('selectRole')}</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="patient">{t('patient')}</option>
            <option value="physio">{t('physio')}</option>
          </select>
        </div>
        {!isLogin && (
          <>
            <div className="form-group">
              <label>{t('firstName')}</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('lastName')}</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>{t('email')}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('password')}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? t('login') : t('register')}</button>
      </form>
      <p>
        {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
        <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? t('registerHere') : t('loginHere')}
        </button>
      </p>
      <footer className="login-footer">
        <img src="/logo1024.png" alt="PhysioEase Logo" />
      </footer>
    </div>
  );
}

export default RegisterLogin;