import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { updateUserProfile } from '../services/apiService';

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUser(JSON.parse(storedProfile));
    }
  }, [setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
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
    if (!user.firstName.trim()) {
      newErrors.firstName = t('firstNameRequired');
    }
    if (!user.lastName.trim()) {
      newErrors.lastName = t('lastNameRequired');
    }
    if (!user.email.trim()) {
      newErrors.email = t('emailRequired');
    }
    if (!user.phoneNumber?.trim()) {
      newErrors.phoneNumber = t('phoneNumberRequired');
    }
    if (!user.sex) {
      newErrors.sex = t('sexRequired');
    }
    if (!user.dateOfBirth) {
      newErrors.dateOfBirth = t('dobRequired');
    } else {
      const date = new Date(user.dateOfBirth);
      const minDate = new Date("1900-01-01");
      const maxDate = new Date("2024-12-31");
      if (date < minDate || date > maxDate) {
        newErrors.dateOfBirth = t('dobCorrect');
      }
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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const updatedPhysio = { ...user };
      localStorage.setItem('userProfile', JSON.stringify(updatedPhysio));
      alert('Profile saved successfully!');
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error saving profile. Please try again.");
    }
  };
  
  return (
    <div>
      <h1>{t('editProfile')}</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
          />
          {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </div>
        <div>
          <label>{t('lastName')}</label>
          <input 
            type="text" 
            name="lastName" 
            value={user.lastName} 
            onChange={handleChange}
          />
          {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
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
          <div>
          <label>{t('phoneNumber')}</label>
          <input 
            type="tel" 
            name="phoneNumber" 
            value={user.phoneNumber || ''} 
            onChange={handleChange}
          />
          {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>{t('sex')}</label>
          <select name="sex" value={user.sex || ''} onChange={handleChange}>
            <option value="">{t('selectSex')}</option>
            <option value="male">{t('male')}</option>
            <option value="female">{t('female')}</option>
          </select>
          {errors.sex && <span style={{ color: 'red' }}>{errors.sex}</span>}
        </div>
        <div>
          <label>{t('dob')}</label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={user.dateOfBirth || ''} 
            onChange={handleChange}
            min="1900-01-01"
            max="2024-12-31"
          />
          {errors.dateOfBirth && <span style={{ color: 'red' }}>{errors.dateOfBirth}</span>}
        </div>
        <div>
          <label>{t('speciality')}</label>
          <select name="speciality" value={user.speciality || ''} onChange={handleChange}>
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
          {errors.speciality && <span className="error">{errors.speciality}</span>}
        </div>
        <div>
          <label>{t('yearsOfExperience')}</label>
          <input 
            type="number" 
            name="yearsOfExperience" 
            value={user.yearsOfExperience || ''} 
            onChange={handleChange} 
            placeholder={t('enterYearsOfExperience')}
            min="0"
          />
          {errors.yearsOfExperience && <span className="error">{errors.yearsOfExperience}</span>}
        </div>
        <div>
          <label>{t('location')}</label>
          <input 
            type="text" 
            name="address" 
            value={user.address || ''} 
            onChange={handleChange}
          />
          {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
        </div>
        <button type="submit">{t('saveProfile')}</button>
      </form>
      <button onClick={() => {setUser({});localStorage.removeItem('userProfile');}}>
        Logout
      </button>
    </div>
  );
}

export default UserProfile;