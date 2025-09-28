import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [careerPath, setCareerPath] = useState(null);

  const updateProfile = (profile) => {
    setUserProfile(profile);
  };

  const updateCareerPath = (path) => {
    setCareerPath(path);
  };

  return (
    <ProfileContext.Provider value={{ userProfile, careerPath, updateProfile, updateCareerPath }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};