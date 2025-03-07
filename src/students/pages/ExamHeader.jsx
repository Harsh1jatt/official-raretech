import React from 'react';
import './css/ExamHeader.css';

const ExamHeader = ({ institute, student }) => {
  return (
    <header>
      <div className="header-left">
        <div className="profileImage">
          <img
            height="60"
            src={institute?.logo }
            alt="Institute Logo"
          />
        </div>
        <div className="Titles">
          <h2 className="title">{institute?.instituteName || "ABC Institute"}</h2>
          <p className="title">Welcome to the exam portal</p>
        </div>
      </div>
      <div className="header-right">
        <div className="user-info">
          <img
            className="profileimage"
            id="userImg"
            src={student?.profileImage}
            alt="User Profile"
          />
          <div className="details">
            <span>
              Name: <p className="userName" id="userName">{student?.studentName || "John Doe"}</p>
            </span>
            <span>
              Roll No: <p className="rollNumber" id="rollNumber">{student?.rollNumber || "123456"}</p>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;
