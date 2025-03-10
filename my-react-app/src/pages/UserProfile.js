import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Might make an API call here
    alert('Profile saved!');
  };

  return (
    <div>
      <h1>Edit Profile</h1>
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
              No Image
            </div>
          )}
        </div>
        <div>
          <label>Profile Picture: </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleProfilePictureChange}
          />
        </div>
        <div>
          <label>First Name: </label>
          <input 
            type="text" 
            name="firstName" 
            value={user.firstName} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input 
            type="text" 
            name="lastName" 
            value={user.lastName} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth: </label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={user.dateOfBirth || ''} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Height (cm): </label>
          <input 
            type="number" 
            name="height" 
            value={user.height || ''} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weight (kg): </label>
          <input 
            type="number" 
            name="weight" 
            value={user.weight || ''} 
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default UserProfile;