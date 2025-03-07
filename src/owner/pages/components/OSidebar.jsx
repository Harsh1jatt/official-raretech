import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'; // Import Remix Icons
import './css/OSidebar.css';

const OSidebar = ({ currentTab, setCurrentTab }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/owner/owner-login');
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
      </div>

      {/* Sidebar */}
      <div className={`Osidebar ${isOpen ? 'open' : ''}`}>
        <h2>Owner Panel</h2>
        <ul>
          <li
            className={currentTab === 'ODashboard' ? 'active' : ''}
            onClick={() => { setCurrentTab('ODashboard'); setIsOpen(false); }}
          >
            Dashboard
          </li>
          <li
            className={currentTab === 'Institutes' ? 'active' : ''}
            onClick={() => { setCurrentTab('Institutes'); setIsOpen(false); }}
          >
            Institutes
          </li>
        </ul>
        <button className="close-btnadmin" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default OSidebar;
