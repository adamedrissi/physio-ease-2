import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/patient/PatientSettings.css';
import Select from 'react-select';
import en from '../../assets/en.png';
import af from '../../assets/af.png';
import am from '../../assets/am.png';
import ar from '../../assets/ar.png';
import bg from '../../assets/bg.png';
import bn from '../../assets/bn.png';
import ca from '../../assets/ca.png';
import cs from '../../assets/cs.png';
import cy from '../../assets/cy.png';
import da from '../../assets/da.png';
import de from '../../assets/de.png';
import el from '../../assets/el.png';
import es from '../../assets/es.png';
import eu from '../../assets/eu.png';
import fa from '../../assets/fa.png';
import fr from '../../assets/fr.png';
import gl from '../../assets/gl.png';
import he from '../../assets/he.png';
import hi from '../../assets/hi.png';
import hu from '../../assets/hu.png';
import id from '../../assets/id.png';
import it from '../../assets/it.png';
import ja from '../../assets/ja.png';
import ko from '../../assets/ko.png';
import ku from '../../assets/ku.png';
import my from '../../assets/my.png';
import nl from '../../assets/nl.png';
import no from '../../assets/no.png';
import pl from '../../assets/pl.png';
import pt from '../../assets/pt.png';
import ro from '../../assets/ro.png';
import ru from '../../assets/ru.png';
import sq from '../../assets/sq.png';
import sr from '../../assets/sr.png';
import sv from '../../assets/sv.png';
import sw from '../../assets/sw.png';
import th from '../../assets/th.png';
import tl from '../../assets/tl.png';
import tr from '../../assets/tr.png';
import uk from '../../assets/uk.png';
import ur from '../../assets/ur.png';
import vi from '../../assets/vi.png';
import zh from '../../assets/zh.png';

const customSingleValue = ({ data }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={data.icon} alt={data.label} style={{ width: 20, marginRight: 8, color: '#333' }} />
    {data.label}
  </div>
);

const customOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} style={{ display: 'flex', alignItems: 'center', padding: 10, color: '#333' }}>
      <img src={data.icon} alt={data.label} style={{ width: 20, marginRight: 10, color: '#333' }} />
      {data.label}
    </div>
  );
};

function Settings() {
  const { i18n, t } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  /*const [notificationPreference, setNotificationPreference] = useState(() => {
    return localStorage.getItem('notificationPreference') || 'email';
  });*/

  const languageOptions = [
    { value: 'en', label: 'English', icon: en },
    { value: 'af', label: 'Afrikaans', icon: af },
    { value: 'am', label: 'Amharic - አማርኛ', icon: am },
    { value: 'ar', label: 'Arabic - اَلْعَرَبِيَّةُ', icon: ar },
    { value: 'bg', label: 'Bulgarian - Български', icon: bg },
    { value: 'bn', label: 'Bengali/Bangla - বাংলা', icon: bn },
    { value: 'ca', label: 'Catalan - Català', icon: ca },
    { value: 'cs', label: 'Czech - Čeština', icon: cs },
    { value: 'cy', label: 'Welsh - Cymraeg', icon: cy },
    { value: 'da', label: 'Danish - Dansk', icon: da },
    { value: 'de', label: 'German - Deutsch', icon: de },
    { value: 'el', label: 'Greek - Ελληνικά', icon: el },
    { value: 'es', label: 'Spanish - Español/Castellano', icon: es },
    { value: 'eu', label: 'Basque - Euskara', icon: eu },
    { value: 'fa', label: 'Persian/Farsi - فارسی', icon: fa },
    { value: 'fr', label: 'French - Français', icon: fr },
    { value: 'gl', label: 'Galician - Galego', icon: gl },
    { value: 'he', label: 'Hebrew - עברית', icon: he },
    { value: 'hi', label: 'Hindi - हिन्दी', icon: hi },
    { value: 'hu', label: 'Hungarian - Magyar', icon: hu },
    { value: 'id', label: 'Indonesian - Bahasa Indonesia', icon: id },
    { value: 'it', label: 'Italian - Italiano', icon: it },
    { value: 'ja', label: 'Japanese - 日本語', icon: ja },
    { value: 'ko', label: 'Korean - 한국어', icon: ko },
    { value: 'ku', label: 'Kurdish - Kurdî', icon: ku },
    { value: 'my', label: 'Burmese - မြန်မာဘာသာ', icon: my },
    { value: 'nl', label: 'Dutch - Nederlands', icon: nl },
    { value: 'no', label: 'Norwegian - Norsk', icon: no },
    { value: 'pl', label: 'Polish - Polski', icon: pl },
    { value: 'pt', label: 'Portuguese - Português', icon: pt },
    { value: 'ro', label: 'Romanian - Română', icon: ro },
    { value: 'ru', label: 'Russian - русский язык', icon: ru },
    { value: 'sq', label: 'Albanian - Shqip', icon: sq },
    { value: 'sr', label: 'Serbian - Српски / srpski', icon: sr },
    { value: 'sv', label: 'Swedish - Svenska', icon: sv },
    { value: 'sw', label: 'Swahili - Kiswahili', icon: sw },
    { value: 'th', label: 'Thai - ไทย', icon: th },
    { value: 'tl', label: 'Tagalog', icon: tl },
    { value: 'tr', label: 'Turkish - Türkçe', icon: tr },
    { value: 'uk', label: 'Ukrainian - Українська', icon: uk },
    { value: 'ur', label: 'Urdu - اُردُو', icon: ur },
    { value: 'vi', label: 'Vietnamese - Tiếng Việt', icon: vi },
    { value: 'zh', label: 'Standard Chinese - 现代标准汉语', icon: zh }
  ];

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
      <br/>
      <div className="setting-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span>{t('darkMode')}:</span>
        <input
          type="checkbox"
          id="darkToggle"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>
      <div className="setting-item">
        <label>
        {t('language')}:
        </label>
        <Select
          value={languageOptions.find(opt => opt.value === language)}
          onChange={(selectedOption) => setLanguage(selectedOption.value)}
          options={languageOptions}
          components={{ SingleValue: customSingleValue, Option: customOption }}
          isSearchable={true}
          styles={{
            control: (base) => ({
              ...base,
              fontFamily: 'Figtree',
              width: '300px',
              marginTop: '10px',
              color: '#333',
              backgroundColor: '#ffffffcc'
            }),
          }}
        />
      </div>
      {/*<div className="setting-item">
        <label>
        {t('notificationPreference')}:
        <div>
        <label>
            <input
              type="radio"
              name="notificationPreference"
              value="email"
              checked={notificationPreference === 'email'}
              onChange={(e) => setNotificationPreference(e.target.value)}
            />
            {t('emaiL')}
          </label>
          <label>
            <input
              type="radio"
              name="notificationPreference"
              value="phone"
              checked={notificationPreference === 'phone'}
              onChange={(e) => setNotificationPreference(e.target.value)}
            />
            {t('phone')}
          </label>
          <label>
            <input
              type="radio"
              name="notificationPreference"
              value="both"
              checked={notificationPreference === 'both'}
              onChange={(e) => setNotificationPreference(e.target.value)}
            />
            {t('both')}
            </label>
          </div>
        </label>
      </div>*/}
    </div>
  );
}

export default Settings;