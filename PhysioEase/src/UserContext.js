import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const defaultUser = {
    id: null,
    role: 'patient',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    profilePicture: '',
    sex: '',
    dateOfBirth: '',
    height: null,
    weight: null,
    address: '',
    trackingPlanCompleted: false,
    speciality: '',
    yearsSinceLicensed: null,
    companyName: '',
  };

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userProfile');
    return storedUser ? JSON.parse(storedUser) : defaultUser;
  });

  useEffect(() => {
    if (user && user.id !== null) {
      localStorage.setItem('userProfile', JSON.stringify(user));
    }
  }, [user]);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};