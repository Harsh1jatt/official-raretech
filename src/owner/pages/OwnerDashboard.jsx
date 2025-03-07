import React, { useState } from 'react';
import './components/css/Institutes.css';
import ODashboard from './components/ODashboard.jsx';
import Institutes from './components/Institutes.jsx';
import OSidebar from './components/OSidebar.jsx';

const OwnerDashboard = () => {
  const [currentTab, setCurrentTab] = useState('Dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'ODashboard':
        return <ODashboard />;
      case 'Institutes':
        return <Institutes />;
      default:
        return <ODashboard />;
    }
  };

  return (
    <div className="dashboard-container">
      <OSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default OwnerDashboard;
