import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserContext';
import { useLocation } from 'react-router-dom';
import { registerUser, loginUser } from '../services/apiService';
import '../styles/RegisterLogin.css';
import { FiSun, FiMoon, FiArrowDown, FiArrowRightCircle } from 'react-icons/fi';
import Footer from '../components/Footer';
import Select from 'react-select';
import en from '../assets/en.png';
import af from '../assets/af.png';
import am from '../assets/am.png';
import ar from '../assets/ar.png';
import bg from '../assets/bg.png';
import bn from '../assets/bn.png';
import ca from '../assets/ca.png';
import cs from '../assets/cs.png';
import cy from '../assets/cy.png';
import da from '../assets/da.png';
import de from '../assets/de.png';
import el from '../assets/el.png';
import es from '../assets/es.png';
import eu from '../assets/eu.png';
import fa from '../assets/fa.png';
import fr from '../assets/fr.png';
import gl from '../assets/gl.png';
import he from '../assets/he.png';
import hi from '../assets/hi.png';
import hu from '../assets/hu.png';
import id from '../assets/id.png';
import it from '../assets/it.png';
import ja from '../assets/ja.png';
import ko from '../assets/ko.png';
import ku from '../assets/ku.png';
import my from '../assets/my.png';
import nl from '../assets/nl.png';
import no from '../assets/no.png';
import pl from '../assets/pl.png';
import pt from '../assets/pt.png';
import ro from '../assets/ro.png';
import ru from '../assets/ru.png';
import sq from '../assets/sq.png';
import sr from '../assets/sr.png';
import sv from '../assets/sv.png';
import sw from '../assets/sw.png';
import th from '../assets/th.png';
import tl from '../assets/tl.png';
import tr from '../assets/tr.png';
import uk from '../assets/uk.png';
import ur from '../assets/ur.png';
import vi from '../assets/vi.png';
import zh from '../assets/zh.png';
import AddressAutocomplete from '../components/AddressAutocomplete';
import { countryDialingInfo } from '../components/PhonePrefixes';

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

function RegisterLogin() {
  const { t, i18n } = useTranslation();
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollToBottom = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
    yearsSinceLicensed: '',
    latitude: '',
    longitude: ''   
  });

  const [fullPhoneNumber, setFullPhoneNumber] = useState('');

  const [error, setError] = useState('');

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

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
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      if (name === 'phoneNumber' || name === 'country') {
        const country = countryDialingInfo[updated.country];
        const prefix = country ? country.prefix : '';
        const raw = updated.phoneNumber.replace(/\D/g, '');
        updated.fullPhoneNumber = prefix + raw;
        setFullPhoneNumber(updated.fullPhoneNumber);
      }
      return updated;
    });
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
        localStorage.setItem('userProfile', JSON.stringify(loggedInUser));
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
          (formData.role === 'physio' && formData.speciality && formData.yearsSinceLicensed && formData.companyName));

      if (!isValid) {
        setError(t('fillAllFields'));
        return;
      }

      try {
        const newUser = await registerUser(formData);
        setUser(newUser);
        localStorage.setItem('userProfile', JSON.stringify(newUser));
        navigate('/'); 
      } catch (err) {
        const message = err?.error || err?.message || "Registration failed.";
        setError(typeof message === 'string' ? message : JSON.stringify(message));
      }
    }
  };

  return (
    <>
    <div className="bar">
          <img src="/logo1024.png" alt="PE Logo" className="bar-left" />
        <div className="bar-center">
          <img src="/PE.png" alt="PE Title" />
        </div>
        <div className="bar-right">
          <button className="scroll-button" onClick={scrollToBottom}><FiArrowDown /> {t('scrollDown')}</button>
        </div>
    </div>
    <div className="register-login-container">
      <h2>{isLogin ? t('login') : t('register')}</h2>
      {error && <p className="error">{error}</p>}
      <div className="toggle-controls">
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
        <button
          className="dark-toggle-button"
          onClick={() => setDarkMode(!darkMode)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title={t('darkLight')}
        >
          {isHovered ? (darkMode ? <FiSun /> : <FiMoon />) : (darkMode ? <FiMoon /> : <FiSun />)}
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        

        {!isLogin && (
          <>
            <div className="form-group">
              <label>{t('selectRole')}:</label>
              <select name="role" style={{ fontFamily: 'Figtree', textAlign: 'center' }} value={formData.role} onChange={handleChange}>
                <option value="patient">{t('patient')}</option>
                <option value="physio">{t('physio')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('firstname')}:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t('lastname')}:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t('sex')}</label>
              <select name="sex" style={{ fontFamily: 'Figtree', textAlign: 'center' }} value={formData.sex} onChange={handleChange} required>
                <option value="">{t('selectSex')}</option>
                <option value="male">{t('male')}</option>
                <option value="female">{t('female')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('dob')}</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} min="1900-01-01" max="2025-04-10" required />
            </div>
            <div className="form-group">
              <label>{t('country')}</label>
              <select 
                style={{ fontFamily: 'Figtree', textAlign: 'center' }}
                name="country"
                value={formData.country || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              >
                <option value="">-- {t('selectCountry')} --</option>
                <option value="gb">{t('gb')}</option>
                <option value="ad">{t('ad')}</option>
                <option value="ae">{t('ae')}</option>
                <option value="af">{t('af')}</option>
                <option value="ag">{t('ag')}</option>
                <option value="ai">{t('ai')}</option>
                <option value="al">{t('al')}</option>
                <option value="am">{t('am')}</option>
                <option value="ao">{t('ao')}</option>
                <option value="aq">{t('aq')}</option>
                <option value="ar">{t('ar')}</option>
                <option value="as">{t('as')}</option>
                <option value="at">{t('at')}</option>
                <option value="au">{t('au')}</option>
                <option value="aw">{t('aw')}</option>
                <option value="ax">{t('ax')}</option>
                <option value="az">{t('az')}</option>
                <option value="ba">{t('ba')}</option>
                <option value="bb">{t('bb')}</option>
                <option value="bd">{t('bd')}</option>
                <option value="be">{t('be')}</option>
                <option value="bf">{t('bf')}</option>
                <option value="bg">{t('bg')}</option>
                <option value="bh">{t('bh')}</option>
                <option value="bi">{t('bi')}</option>
                <option value="bj">{t('bj')}</option>
                <option value="bl">{t('bl')}</option>
                <option value="bm">{t('bm')}</option>
                <option value="bn">{t('bn')}</option>
                <option value="bo">{t('bo')}</option>
                <option value="bq">{t('bq')}</option>
                <option value="br">{t('br')}</option>
                <option value="bs">{t('bs')}</option>
                <option value="bt">{t('bt')}</option>
                <option value="bv">{t('bv')}</option>
                <option value="bw">{t('bw')}</option>
                <option value="by">{t('by')}</option>
                <option value="bz">{t('bz')}</option>
                <option value="ca">{t('ca')}</option>
                <option value="cc">{t('cc')}</option>
                <option value="cd">{t('cd')}</option>
                <option value="cf">{t('cf')}</option>
                <option value="cg">{t('cg')}</option>
                <option value="ch">{t('ch')}</option>
                <option value="ci">{t('ci')}</option>
                <option value="ck">{t('ck')}</option>
                <option value="cl">{t('cl')}</option>
                <option value="cm">{t('cm')}</option>
                <option value="cn">{t('cn')}</option>
                <option value="co">{t('co')}</option>
                <option value="cr">{t('cr')}</option>
                <option value="cu">{t('cu')}</option>
                <option value="cv">{t('cv')}</option>
                <option value="cw">{t('cw')}</option>
                <option value="cx">{t('cx')}</option>
                <option value="cy">{t('cy')}</option>
                <option value="cz">{t('cz')}</option>
                <option value="de">{t('de')}</option>
                <option value="dj">{t('dj')}</option>
                <option value="dk">{t('dk')}</option>
                <option value="dm">{t('dm')}</option>
                <option value="do">{t('do')}</option>
                <option value="dz">{t('dz')}</option>
                <option value="ec">{t('ec')}</option>
                <option value="ee">{t('ee')}</option>
                <option value="eg">{t('eg')}</option>
                <option value="eh">{t('eh')}</option>
                <option value="er">{t('er')}</option>
                <option value="es">{t('es')}</option>
                <option value="et">{t('et')}</option>
                <option value="fi">{t('fi')}</option>
                <option value="fj">{t('fj')}</option>
                <option value="fk">{t('fk')}</option>
                <option value="fm">{t('fm')}</option>
                <option value="fo">{t('fo')}</option>
                <option value="fr">{t('fr')}</option>
                <option value="ga">{t('ga')}</option>
                <option value="gd">{t('gd')}</option>
                <option value="ge">{t('ge')}</option>
                <option value="gf">{t('gf')}</option>
                <option value="gg">{t('gg')}</option>
                <option value="gh">{t('gh')}</option>
                <option value="gi">{t('gi')}</option>
                <option value="gl">{t('gl')}</option>
                <option value="gm">{t('gm')}</option>
                <option value="gn">{t('gn')}</option>
                <option value="gp">{t('gp')}</option>
                <option value="gq">{t('gq')}</option>
                <option value="gr">{t('gr')}</option>
                <option value="gs">{t('gs')}</option>
                <option value="gt">{t('gt')}</option>
                <option value="gu">{t('gu')}</option>
                <option value="gw">{t('gw')}</option>
                <option value="gy">{t('gy')}</option>
                <option value="hk">{t('hk')}</option>
                <option value="hm">{t('hm')}</option>
                <option value="hn">{t('hn')}</option>
                <option value="hr">{t('hr')}</option>
                <option value="ht">{t('ht')}</option>
                <option value="hu">{t('hu')}</option>
                <option value="id">{t('id')}</option>
                <option value="ie">{t('ie')}</option>
                <option value="il">{t('il')}</option>
                <option value="im">{t('im')}</option>
                <option value="in">{t('in')}</option>
                <option value="io">{t('io')}</option>
                <option value="iq">{t('iq')}</option>
                <option value="ir">{t('ir')}</option>
                <option value="is">{t('is')}</option>
                <option value="it">{t('it')}</option>
                <option value="je">{t('je')}</option>
                <option value="jm">{t('jm')}</option>
                <option value="jo">{t('jo')}</option>
                <option value="jp">{t('jp')}</option>
                <option value="ke">{t('ke')}</option>
                <option value="kg">{t('kg')}</option>
                <option value="kh">{t('kh')}</option>
                <option value="ki">{t('ki')}</option>
                <option value="km">{t('km')}</option>
                <option value="kn">{t('kn')}</option>
                <option value="kp">{t('kp')}</option>
                <option value="kr">{t('kr')}</option>
                <option value="kw">{t('kw')}</option>
                <option value="ky">{t('ky')}</option>
                <option value="kz">{t('kz')}</option>
                <option value="la">{t('la')}</option>
                <option value="lb">{t('lb')}</option>
                <option value="lc">{t('lc')}</option>
                <option value="li">{t('li')}</option>
                <option value="lk">{t('lk')}</option>
                <option value="lr">{t('lr')}</option>
                <option value="ls">{t('ls')}</option>
                <option value="lt">{t('lt')}</option>
                <option value="lu">{t('lu')}</option>
                <option value="lv">{t('lv')}</option>
                <option value="ly">{t('ly')}</option>
                <option value="ma">{t('ma')}</option>
                <option value="mc">{t('mc')}</option>
                <option value="md">{t('md')}</option>
                <option value="me">{t('me')}</option>
                <option value="mf">{t('mf')}</option>
                <option value="mg">{t('mg')}</option>
                <option value="mh">{t('mh')}</option>
                <option value="mk">{t('mk')}</option>
                <option value="ml">{t('ml')}</option>
                <option value="mm">{t('mm')}</option>
                <option value="mn">{t('mn')}</option>
                <option value="mo">{t('mo')}</option>
                <option value="mp">{t('mp')}</option>
                <option value="mq">{t('mq')}</option>
                <option value="mr">{t('mr')}</option>
                <option value="ms">{t('ms')}</option>
                <option value="mt">{t('mt')}</option>
                <option value="mu">{t('mu')}</option>
                <option value="mv">{t('mv')}</option>
                <option value="mw">{t('mw')}</option>
                <option value="mx">{t('mx')}</option>
                <option value="my">{t('my')}</option>
                <option value="mz">{t('mz')}</option>
                <option value="na">{t('na')}</option>
                <option value="nc">{t('nc')}</option>
                <option value="ne">{t('ne')}</option>
                <option value="nf">{t('nf')}</option>
                <option value="ng">{t('ng')}</option>
                <option value="ni">{t('ni')}</option>
                <option value="nl">{t('nl')}</option>
                <option value="no">{t('no')}</option>
                <option value="np">{t('np')}</option>
                <option value="nr">{t('nr')}</option>
                <option value="nu">{t('nu')}</option>
                <option value="nz">{t('nz')}</option>
                <option value="om">{t('om')}</option>
                <option value="pa">{t('pa')}</option>
                <option value="pe">{t('pe')}</option>
                <option value="pf">{t('pf')}</option>
                <option value="pg">{t('pg')}</option>
                <option value="ph">{t('ph')}</option>
                <option value="pk">{t('pk')}</option>
                <option value="pl">{t('pl')}</option>
                <option value="pm">{t('pm')}</option>
                <option value="pn">{t('pn')}</option>
                <option value="pr">{t('pr')}</option>
                <option value="ps">{t('ps')}</option>
                <option value="pt">{t('pt')}</option>
                <option value="pw">{t('pw')}</option>
                <option value="py">{t('py')}</option>
                <option value="qa">{t('qa')}</option>
                <option value="re">{t('re')}</option>
                <option value="ro">{t('ro')}</option>
                <option value="rs">{t('rs')}</option>
                <option value="ru">{t('ru')}</option>
                <option value="rw">{t('rw')}</option>
                <option value="sa">{t('sa')}</option>
                <option value="sb">{t('sb')}</option>
                <option value="sc">{t('sc')}</option>
                <option value="sd">{t('sd')}</option>
                <option value="se">{t('se')}</option>
                <option value="sg">{t('sg')}</option>
                <option value="sh">{t('sh')}</option>
                <option value="si">{t('si')}</option>
                <option value="sj">{t('sj')}</option>
                <option value="sk">{t('sk')}</option>
                <option value="sl">{t('sl')}</option>
                <option value="sm">{t('sm')}</option>
                <option value="sn">{t('sn')}</option>
                <option value="so">{t('so')}</option>
                <option value="sr">{t('sr')}</option>
                <option value="st">{t('st')}</option>
                <option value="ss">{t('ss')}</option>
                <option value="sv">{t('sv')}</option>
                <option value="sx">{t('sx')}</option>
                <option value="sy">{t('sy')}</option>
                <option value="sz">{t('sz')}</option>
                <option value="tc">{t('tc')}</option>
                <option value="td">{t('td')}</option>
                <option value="tf">{t('tf')}</option>
                <option value="tg">{t('tg')}</option>
                <option value="th">{t('th')}</option>
                <option value="tj">{t('tj')}</option>
                <option value="tk">{t('tk')}</option>
                <option value="tl">{t('tl')}</option>
                <option value="tm">{t('tm')}</option>
                <option value="tn">{t('tn')}</option>
                <option value="to">{t('to')}</option>
                <option value="tr">{t('tr')}</option>
                <option value="tt">{t('tt')}</option>
                <option value="tv">{t('tv')}</option>
                <option value="tw">{t('tw')}</option>
                <option value="tz">{t('tz')}</option>
                <option value="ua">{t('ua')}</option>
                <option value="ug">{t('ug')}</option>
                <option value="um">{t('um')}</option>
                <option value="us">{t('us')}</option>
                <option value="uy">{t('uy')}</option>
                <option value="uz">{t('uz')}</option>
                <option value="va">{t('va')}</option>
                <option value="vc">{t('vc')}</option>
                <option value="ve">{t('ve')}</option>
                <option value="vg">{t('vg')}</option>
                <option value="vi">{t('vi')}</option>
                <option value="vn">{t('vn')}</option>
                <option value="vu">{t('vu')}</option>
                <option value="wf">{t('wf')}</option>
                <option value="ws">{t('ws')}</option>
                <option value="xk">{t('xk')}</option>
                <option value="ye">{t('ye')}</option>
                <option value="yt">{t('yt')}</option>
                <option value="za">{t('za')}</option>
                <option value="zm">{t('zm')}</option>
                <option value="zw">{t('zw')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('phone')}:</label>
              <input type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^\d()]/g, '');
                  setFormData(prev => ({
                    ...prev,
                    phoneNumber: cleaned,
                    fullPhoneNumber: countryDialingInfo[prev.country]?.prefix + cleaned || cleaned
                  }));
                  setFullPhoneNumber(countryDialingInfo[formData.country]?.prefix + cleaned || cleaned);
                }}
                maxLength={20}
                minLength={3}
                required
                disabled={!formData.country}
                placeholder={formData.country ? t('enterPhone') : t('selectCountryFirst')}
              />
            </div>
              {fullPhoneNumber && (
                <div className="form-group">
                  <p><strong>{t('formattedPhone')}:</strong> {fullPhoneNumber}</p>
                </div>
              )}
            <div className="form-group">
              <label>{t('Address')}</label>
            {formData.country ? (
              <AddressAutocomplete
                onSelect={(place) => {
                  setFormData(prev => ({
                    ...prev,
                    address: place.display_name,
                    latitude: place.lat,
                    longitude: place.lon
                  }));
                }}
                country={formData.country}
              />
            ) : (
              <input
                type="text"
                disabled
                placeholder={t('selectCountryFirst')}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1rem',
                  border: '1px solid #0000FF',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontFamily: 'Figtree'
                }}
              />
            )}
            </div>
            {formData.address && (
              <div className="form-group">
                <p><strong>{t('selectedAddress')}:</strong> {formData.address}</p>
              </div>
            )}
            
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
                <select name="speciality" style={{ fontFamily: 'Figtree', textAlign: 'center' }} value={formData.speciality} onChange={handleChange} required>
                  <option value="">{t('enterSpeciality')}</option>
                    <option value="neurologicalDisorder">{t('neurologicalDisorder')}</option>
                    <option value="geriatrics">{t('geriatrics')}</option>
                    <option value="cardiovascularPulmonaryPhysiotherapy">{t('cardiovascularPulmonaryPhysiotherapy')}</option>
                    <option value="paediatricPhysiotherapy">{t('paediatricPhysiotherapy')}</option>
                    <option value="musculoskeletalPhysiotherapy">{t('musculoskeletalPhysiotherapy')}</option>
                    <option value="sportsPhysiotherapy">{t('sportsPhysiotherapy')}</option>
                    <option value="cardiovascularDisease">{t('cardiovascularDisease')}</option>
                    <option value="orthopedics">{t('orthopedics')}</option>
                    <option value="vestibularRehabilitation">{t('vestibularRehabilitation')}</option>
                    <option value="homecarePhysiotherapy">{t('homecarePhysiotherapy')}</option>
                    <option value="hydrotherapy">{t('hydrotherapy')}</option>
                    <option value="pelvicFloor">{t('pelvicFloor')}</option>
                    <option value="womensHealthPhysiotherapy">{t('womensHealthPhysiotherapy')}</option>
                    <option value="acupuncture">{t('acupuncture')}</option>
                    <option value="magneticTherapy">{t('magneticTherapy')}</option>
                    <option value="manualTherapy">{t('manualTherapy')}</option>
                    <option value="oncology">{t('oncology')}</option>
                    <option value="postOperativePhysiotherapist">{t('postOperativePhysiotherapist')}</option>
                    <option value="generalRehabilitation">{t('rehabilitation')}</option>
                    <option value="chestPhysiotherapy">{t('chestPhysiotherapy')}</option>
                    <option value="electrotherapy">{t('electrotherapy')}</option>
                  </select>
                </div>
            <div className="form-group">
              <label>{t('yearsSinceLicensed')}</label>
              <input
                type="number"
                name="yearsSinceLicensed"
                value={formData.yearsSinceLicensed}
                onChange={handleChange}
                placeholder={t('enterYearOfLicense')}
                required
                min="1982"
                max="2024"
              />
            </div>
            <div className="form-group">
              <label>{t('companyName')}</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder={t('enterCompanyName')}
              />
            </div>
              </>
            )}
          </>
        )}

        <div className="form-group">
          <label>{t('emaiL')}:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t('password')}</label>
          <input type="password" name="password" style={{ color: 'red' }} value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit">{isLogin ? t('login') : t('register')} <FiArrowRightCircle /></button>
      </form>

      <p>
        {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
        <br/>
        <button className="link-button" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? t('registerHere') : t('loginHere')}
        </button>
      </p>
      <nav className="f-links">
        <Link to="/faqs1">{t('patientFAQs')}</Link>
          <span>|</span>
        <Link to="/faqs2">{t('physioFAQs')}</Link>
      </nav>
    </div>
    <Footer path={location.pathname} />
    </>
  );
}

export default RegisterLogin;