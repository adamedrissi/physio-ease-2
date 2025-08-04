import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../UserContext';
import { updateUser } from '../../services/apiService';
import { searchAddress } from '../../services/apiService';
import { changePassword } from '../../services/apiService';
import { countryDialingInfo } from '../../components/PhonePrefixes';

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [fullPhoneNumber/*, setFullPhoneNumber*/] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUser(JSON.parse(storedProfile));
    }
  }, [setUser]);

  useEffect(() => {
  const fetchSuggestions = async () => {
    if (user.address?.length > 3 && user.country) {
      try {
        const res = await searchAddress(user.address, user.country);
        setAddressSuggestions(res);
      } catch (err) {
        console.error("Failed to fetch address suggestions:", err);
        setAddressSuggestions([]);
      }
    } else {
      setAddressSuggestions([]);
    }
  };

    fetchSuggestions();
  }, [user.address, user.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      setUser({
        ...user,
        country: value,
        address: '',
        phoneNumber: ''
      });
    } else {
      setUser({
        ...user,
        [name]: value
      });
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!user.email.trim()) {
      newErrors.email = t('emailRequired');
    }
    if (!user.phoneNumber?.trim()) {
      newErrors.phoneNumber = t('phoneNumberRequired');
    } else if (!/^[0-9()]{3,20}$/.test(user.phoneNumber)) {
      newErrors.phoneNumber = t('phoneNumberInvalid');
    }
    if (!user.height) {
      newErrors.height = t('heightRequired');
    } else if (user.height < 50 || user.height > 250) {
      newErrors.height = t('heightCorrect');
    }
    if (!user.weight) {
      newErrors.weight = t('weightRequired');
    } else if (user.weight < 2 || user.weight > 600) {
      newErrors.weight = t('weightCorrect');
    }
    if (!user.address?.trim()) {
      newErrors.address = t('addressRequired');
    }
    if (!user.country) {
      newErrors.country = t('countryRequired');
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  if (changingPassword) {
    if (newPassword !== confirmPassword) {
      setPasswordError(t('passwordsDoNotMatch'));
      return;
    }

  try {
    await changePassword(user.id, oldPassword, newPassword);
    } catch (err) {
      console.error('Password update failed:', err);
      setPasswordError(t('incorrectOldPassword'));
      return;
    }
  }
    
  try {
    const updatedUser = await updateUser(user.id, user);
    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    alert(t('profileSaved'));
    setChangingPassword(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error saving profile. Please try again.");
    }
  };

  return (
    <div>
      <h1>{t('editProfile')}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} 
            />
          ) : (
            <div style={{
              width: '100px', 
              height: '100px', 
              border: '1px solid #ccc', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              {t('noImage')}
            </div>
          )}
        </div>
        <div>
          <label>{t('profilePicture')}</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleProfilePictureChange}
          />
        </div>
        <div>
          <label>{t('firstName')}</label>
          <input 
            type="text" 
            name="firstName" 
            value={user.firstName} 
            onChange={handleChange}
            readOnly
            title="This field cannot be changed"
          />
        </div>
        <div>
          <label>{t('lastName')}</label>
          <input 
            type="text" 
            name="lastName" 
            value={user.lastName} 
            onChange={handleChange}
            readOnly
            title="This field cannot be changed"
          />
        </div>
        <div>
          <label>{t('email')}</label>
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
          </div>
            <label>{t('country')}</label>
              <select 
                style={{ fontFamily: 'Figtree', textAlign: 'center' }}
                name="country"
                value={user.country || ''}
                onChange={handleChange}
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
            {errors.country && <span style={{ color: 'red' }}> {errors.country}</span>}
        <div>
          <label>{t('address')}</label>
          <input 
            type="text" 
            name="address" 
            value={user.address || ''} 
            onChange={handleChange}
            disabled={!user.country}
          />
          {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
          {addressSuggestions.length > 0 && (
            <ul style={{ border: '1px solid #ccc', padding: '5px', listStyle: 'none', maxHeight: '100px', overflowY: 'auto' }}>
              {addressSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  style={{ cursor: 'pointer', padding: '3px 5px' }}
                  onClick={() => {
                    setUser({ ...user, address: suggestion.display_name });
                    setAddressSuggestions([]);
                  }}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
              <label>{t('phone')}: </label>
              <input type="tel"
              name="phoneNumber"
              value={user.phoneNumber || ''}
              onChange={handleChange}
              maxLength={20}
              minLength={3}
              required
              disabled={!user.country}
              placeholder={
                user.country
                  ? `${countryDialingInfo[user.country]?.prefix || ''} (${t('enterPhone')})`
                  : t('selectCountryFirst')
              }
              />
              {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}
              {fullPhoneNumber && (
                <div className="form-group">
                  <p><strong>{t('formattedPhone')}:</strong> {fullPhoneNumber}</p>
                </div>
              )}
        <div>
          <label>{t('sex')}</label>
          <select name="sex" title="This field cannot be changed" value={user.sex || ''} disabled>
            <option value="">{t('selectSex')}</option>
            <option value="male">{t('male')}</option>
            <option value="female">{t('female')}</option>
          </select>
        </div>
        <div>
          <label>{t('dob')}</label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={user.dateOfBirth || ''} 
            onChange={handleChange}
            min="1900-01-01"
            max="2025-04-10"
            readOnly
            title="This field cannot be changed"
          />
        </div>   
        <div>
          <label>{t('height')}</label>
          <input 
            type="number" 
            name="height" 
            value={user.height || ''} 
            onChange={handleChange}
            min="50"
            max="250"
          />
          {errors.height && <span style={{ color: 'red' }}> {errors.height}</span>}
        </div>
        <div>
          <label>{t('weight')}</label>
          <input 
            type="number" 
            name="weight"
            value={user.weight || ''} 
            onChange={handleChange}
            min="2"
            max="600"
          />
          {errors.weight && <span style={{ color: 'red' }}> {errors.weight}</span>}
        </div>
        <br/>
        {changingPassword ? (
  <>
    <div>
      <label>{t('currentPassword')}</label>
      <input 
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
    </div>
    <div>
      <label>{t('newPassword')}</label>
      <input 
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
    </div>
    <div>
      <label>{t('confirmPassword')}</label>
      <input 
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </div>
    {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
  </>
  ) : (
  <button
    type="button"
    onClick={() => setChangingPassword(true)}
  >
    {t('changePassword')}
  </button>
  )}
        <br/>
        <button type="submit">{t('saveProfile')}</button>
      </form>
    </div>
  );
}

export default UserProfile;