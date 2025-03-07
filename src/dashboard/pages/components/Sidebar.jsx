import React, { useState } from "react";
import { Home, Users, ClipboardList, Settings, Menu, X } from "lucide-react"; // Added Menu icon
import { Link } from "react-router-dom";

const Sidebar = ({ currentTab, setCurrentTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
        <span className="sidebar-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </span>

        {/* Sidebar Menu */}
        <ul>
          <Link to="/dashboard">
            <li
              onClick={() => setCurrentTab('Dashboard')}
              className={currentTab === 'Dashboard' ? 'active' : ''}
            >
              <Home size={22} /> {isOpen && <span>Dashboard</span>}
            </li>
          </Link>
          <Link to="/dashboard/students">
            <li
              onClick={() => setCurrentTab('Students')}
              className={currentTab === 'Students' ? 'active' : ''}
            >
              <Users size={22} /> {isOpen && <span>Students</span>}
            </li>
          </Link>
          <Link to="/dashboard/exams">
            <li
              onClick={() => setCurrentTab('Exams')}
              className={currentTab === 'Exams' ? 'active' : ''}
            >
              <ClipboardList size={22} /> {isOpen && <span>Exams</span>}
            </li>
          </Link>
          <Link to="/dashboard/settings">
            <li
              onClick={() => setCurrentTab('Settings')}
              className={currentTab === 'Settings' ? 'active' : ''}
            >
              <Settings size={22} /> {isOpen && <span>Settings</span>}
            </li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isOpen ? "expanded" : "collapsed"}`}></div>
    </div>
  );
};

export default Sidebar;
