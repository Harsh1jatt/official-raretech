import React, { useState } from 'react';
import logo from '../../assets/rare.png';
import './css/Web.css';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'

const WebHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='nav'>
            <Link to="/">
                <h1>
                    <div className="wlogo">
                        <img src={logo} alt="Logo" />
                    </div>
                    Raretech
                </h1>
            </Link>
            <div className="hamburger" onClick={toggleMenu}>
                {menuOpen ? (
                    <i className="ri-close-line"></i>
                ) : (
                    <i className="ri-menu-line"></i>
                )}
            </div>
            <div className={`menu ${menuOpen ? 'open' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/legal">Legal-Docs</Link>
                <Link to="/certificate">Certificate</Link>
            </div>
        </div>
    );
};

export default WebHeader;
