// ProfileContext.js (อัปเดตใหม่ รองรับข้อมูลเพิ่ม)

import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        avatar: require('../assets/mod.png'),
        dob: '',
        address: '',
        gender: '',
        genderPrivate: false,
        displayName: ''
    });

    const updateProfile = (newProfile) => {
        setProfile(prev => ({ ...prev, ...newProfile }));
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};
