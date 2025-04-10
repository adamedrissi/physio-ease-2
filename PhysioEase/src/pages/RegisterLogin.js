import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserContext';
import { registerUser, loginUser } from '../services/apiService';
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
    phoneNumber: '',
    address: '',
    sex: '',            
    dateOfBirth: '',
    speciality: '',        
    yearsOfExperience: ''   
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      try {
        const loggedInUser = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        setUser(loggedInUser);
        navigate('/');
      } catch (err) {
        setError(t('invalidCredentials'));
      }
    } else {
      const isValid =
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.password &&
        formData.phoneNumber &&
        formData.address &&
        formData.sex &&
        formData.dateOfBirth &&
        (formData.role === 'patient' ||
          (formData.role === 'physio' && formData.speciality && formData.yearsOfExperience));

      if (!isValid) {
        setError(t('fillAllFields'));
        return;
      }

      try {
        const newUser = await registerUser(formData);
        setUser(newUser);
        navigate('/'); 
      } catch (err) {
        setError(err); 
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
              <label>{t('firstname')}</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t('lastname')}</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t('sex')}</label>
              <select name="sex" value={formData.sex} onChange={handleChange} required>
                <option value="">{t('selectSex')}</option>
                <option value="male">{t('male')}</option>
                <option value="female">{t('female')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('dob')}</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t('phone')}</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t('address')}</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>

        {formData.role === 'patient' && (
          <>
          <div className="form-group">
          <label>{t('height')}</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('weight')}</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            />
            </div>
          </>
        )}
            {formData.role === 'physio' && (
              <>
                <div className="form-group">
              <label>{t('speciality')}</label>
                <select name="speciality" value={formData.speciality} onChange={handleChange} required>
                  <option value="">{t('enterSpeciality')}</option>
                    <option value="neurologicalDisorder">{t('neurologicalDisorder')}</option>
                    <option value="geriatrics">{t('geriatrics')}</option>
                    <option value="cardiovascularPulmonaryPhysiotherapy">{t('cardiovascularPulmonaryPhysiotherapy')}</option>
                    <option value="pediatricPhysiotherapy">{t('pediatricPhysiotherapy')}</option>
                    <option value="musculoskeletalPhysiotherapy">{t('musculoskeletalPhysiotherapy')}</option>
                    <option value="sportsPhysiotherapy">{t('sportsPhysiotherapy')}</option>
                    <option value="cardiovascularDisease">{t('cardiovascularDisease')}</option>
                    <option value="orthopedics">{t('orthopedics')}</option>
                    <option value="vestibularRehabilitation">{t('vestibularRehabilitation')}</option>
                    <option value="homecarePhysiotherapy">{t('homecarePhysiotherapy')}</option>
                    <option value="pediatrics">{t('pediatrics')}</option>
                    <option value="pelvicFloor">{t('pelvicFloor')}</option>
                    <option value="womensHealthPhysiotherapy">{t('womensHealthPhysiotherapy')}</option>
                    <option value="acupuncture">{t('acupuncture')}</option>
                    <option value="magneticTherapy">{t('magneticTherapy')}</option>
                    <option value="manualTherapy">{t('manualTherapy')}</option>
                    <option value="oncology">{t('oncology')}</option>
                    <option value="postOperativePhysiotherapist">{t('postOperativePhysiotherapist')}</option>
                    <option value="rehabilitation">{t('rehabilitation')}</option>
                    <option value="chestPhysiotherapy">{t('chestPhysiotherapy')}</option>
                    <option value="womensHealth">{t('womensHealth')}</option>
                  </select>
                </div>
            <div className="form-group">
              <label>{t('yearsOfExperience')}</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                placeholder={t('enterYearsOfExperience')}
                required
                min="0"
                max="50"
              />
            </div>
              </>
            )}
          </>
        )}

        <div className="form-group">
          <label>{t('emaiL')}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t('password')}</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit">{isLogin ? t('login') : t('register')}</button>
      </form>

      <p>
        {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
        <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? t('registerHere') : t('loginHere')}
        </button>
      </p>
      <div className="faq-links">
        <Link to="/faqs2" className="button">{t('physioFAQs')}
        </Link>
      </div>
      <div className="faq-links">
        <Link to="/faqs1" className="button">{t('patientFAQs')}
        </Link>
      </div>
      <footer className="login-footer">
        <img src="/logo1024.png" alt="PhysioEase Logo" />
      </footer>
      <footer>
      {t('contact')}
      </footer>
        contact.physioease@gmail.com
    </div>
  );
}

export default RegisterLogin;