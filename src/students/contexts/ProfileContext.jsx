// src/context/ProfileContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [institute, setInstitute] = useState(null);
  const [examInfo, setExamInfo] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const [obtainedMarks, setObtainedMarks] = useState(null);
  const navigate = useNavigate();

  // Fetch Profile Function
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Session expired. Please log in again.');
        navigate('/exam/login');
        return;
      }

      try {
        const response = await axios.get(
          'https://iems.onrender.com/student/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        
        // Correctly extracting student and institute data
        setProfile(response.data.student);
        setInstitute(response.data.institute);
      } catch (err) {
        console.error('Error fetching profile:', err);
        alert('Failed to fetch profile. Please log in again.');
        navigate('/exam/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <ProfileContext.Provider 
      value={{ 
        profile, 
        institute, 
        examInfo, 
        setExamInfo, 
        typingSpeed, 
        setTypingSpeed, 
        obtainedMarks, 
        setObtainedMarks,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
