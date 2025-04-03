import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserContext';
/*import axios from 'axios';

// Function to update user profile
const updateUserProfile = async (userData) => {
  try {
    // Assuming the user has an ID, e.g., stored in context
    const userId = userData.id || 1; // Replace with the actual user ID
    const response = await axios.put(`http://localhost:8080/api/users/${userId}`, userData);
    console.log("Profile updated:", response.data);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Example: when form is submitted in UserProfile.js
const handleSubmit = async (e) => {
  e.preventDefault();
  // Perform local validation...
  await updateUserProfile(user);
  alert('Profile saved!');
};*/

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

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

  // Validate required fields including date of birth, height, and weight
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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Might submit the data via an API call here.
      localStorage.setItem('userProfile', JSON.stringify(user));
      alert(t('profileSaved'));
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
          <label>{t('height')}</label>
          <input 
            type="number" 
            name="height" 
            value={user.height || ''} 
            onChange={handleChange}
            min="50"
            max="250"
          />
          {errors.height && <span style={{ color: 'red' }}>{errors.height}</span>}
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
          {errors.weight && <span style={{ color: 'red' }}>{errors.weight}</span>}
        </div>
        <button type="submit">{t('saveProfile')}</button>
      </form>
    </div>
  );
}

export default UserProfile;