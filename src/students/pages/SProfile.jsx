import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../contexts/ProfileContext'; // Import ProfileContext
import axios from 'axios';
import './css/Sprofile.css';

const Sprofile = () => {
  const navigate = useNavigate();
  const { profile, institute } = useContext(ProfileContext); // Access profile & institute
  const handleLogout = () => {
    localStorage.clear()
    alert('Logout successful!');
    navigate('/');
  };

  return (
    <div className="Sprofile">
      <div className="SProfileImage">
        <img src={profile?.profileImage || ''} alt="Profile" />
      </div>
      <div className="Sdetails">
        <div className="StudentName">
          Student Name: <span>{profile?.studentName || 'Loading...'}</span>
        </div>
        <div className="Institute">
          Institute: <span>{institute?.instituteName || 'Loading...'}</span>
        </div>
        <div className="RollNumber">
          Roll Number: <span>{profile?.rollNumber || 'Loading...'}</span>
        </div>
        <div className="DOB">
          Date Of Birth: <span>{profile?.dateOfBirth || 'Loading...'}</span>
        </div>
        <div className="Sbtns">
          <button className="Ssave-btn" onClick={() => navigate('/exam/exams/')}>Do Exam</button>
          <button className="Slogout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sprofile;
