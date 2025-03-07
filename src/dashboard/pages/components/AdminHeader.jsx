import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Admin.css';
import './css/AdminHeader.css';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger icon
import logo from '../../../assets/rare.png'
const AdminHeader = () => {
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState('Institute Owner');
  const [menuOpen, setMenuOpen] = useState(false); // State to manage hamburger menu

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const Greeting = () => {
    const hour = new Date().getHours();
    const greeting =
      hour < 5 ? 'Good Night' :
        hour < 12 ? 'Good Morning' :
          hour < 17 ? 'Good Afternoon' :
            hour < 21 ? 'Good Evening' :
              'Good Night';

    return <b>{greeting}, {ownerName}</b>;
  };

  const getFormattedDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    return today.toLocaleDateString('en-GB', options).replace(',', '').replace(' ', '-');
  };

  return (
    <div id="headers" >
      <div className="">
            <Link to="/dashboad/">
                <h1 className='flex'>
                    <div className="ilogo">
                        <img src={logo} alt="Logo" />
                    </div>
                    Raretech
                </h1>
            </Link>
    </div>
      <div className="header-right">
        {/* Hamburger Icon for Mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <Link className="link" to="/dashboard">Dashboard</Link>
          <Link className="link" to="/dashboard/students">Students</Link>
          <Link className="link" to="/dashboard/exams">Exams</Link>
          <Link className="link" to="/dashboard/settings">Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
