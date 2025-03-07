import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/InstituteProfile.css';

function InstituteProfile() {
    const [formData, setFormData] = useState({
        ownerName: '',
        instituteName: '',
        shortName: '',
        logo: '',
        email: '',
        phone: '',
        iso: '',
        uniqueId: '',
    });

    useEffect(() => {
        const fetchInstituteDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://iems.onrender.com/institute/my-institute', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching institute details:", error);
            }
        };

        fetchInstituteDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const instituteId = localStorage.getItem('instituteId')
            await axios.post(`https://iems.onrender.com/owner/${instituteId}/edit`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Institute details updated successfully!');
        } catch (error) {
            console.error('Error updating details:', error);
            alert('Failed to update details.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out!');
        window.location.href = '/';
    };

    return (
        <div className="InstituteProfile-container">
            <div className="profile">
                <div className="logo">
                    <img src={formData.logo} alt="Institute Logo" />
                </div>
                <div className="details">
                    <div className="OwnerName">Institute Owner: {formData.ownerName}</div>
                    <div className="InstituteName">Institute: {formData.instituteName}</div>
                    <div className="InstituteShortName">Short Name: {formData.shortName}</div>
                    <div className="InstituteEmail">Email: {formData.email}</div>
                    <div className="InstitutePhone">Phone: {formData.phone}</div>
                    <div className="IsoId">Unique ID: {formData.uniqueId}</div>
                </div>
                <div className="iso">
                    <img src={formData.iso} alt="ISO Certificate" />
                </div>
            </div>
            <div className="Edit">
                <h1>Edit Your Details</h1>
                <p>Institute Name</p>
                <input 
                    type="text" 
                    name="instituteName" 
                    value={formData.instituteName} 
                    onChange={handleChange} 
                />
                <p>Short Name</p>
                <input 
                    type="text" 
                    name="shortName" 
                    value={formData.shortName} 
                    onChange={handleChange} 
                />
                <p>Phone</p>
                <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                />
                <button className="update-btn" onClick={handleUpdate}>Update Details</button>
            </div>
            <div className="note">
                <h1>Note:</h1>
                <p>You cannot update your Logo, ISO Certificate, or Email. Contact support if needed.</p>
            </div>
            <button className="logout-btn danger" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default InstituteProfile;
