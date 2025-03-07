import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Exams from './components/Exams';
import ExamQuestions from './components/ExamQuestions';
import AdminHeader from './components/AdminHeader';
import InstituteProfile from './components/InstituteProfile';

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState('Dashboard');
  const [instituteId, setInstituteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();


  return (
    <div className="dashboard-container">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="content-area">
        <AdminHeader />
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {currentTab === 'Dashboard' && <Dashboard instituteId={instituteId} />}
            {currentTab === 'Students' && <Students instituteId={instituteId} />}
            {currentTab === 'Exams' && <Exams instituteId={instituteId} />}
            {currentTab === 'Settings' && <InstituteProfile />}
            {currentTab === 'ExamQuestions' && <ExamQuestions instituteId={instituteId} />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
