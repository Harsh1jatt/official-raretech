import React, { useState } from 'react';
import axios from 'axios';
import './css/CreateStudent.css';

const CreateStudent = ({ instituteId, isOpen, onClose, onCreateStudent }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    secCode: '',
    dateOfBirth: '',
    profileImage: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update state on input change.
  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      // For file input, store the file object
      setFormData({
        ...formData,
        profileImage: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.studentName);
    data.append("password", formData.secCode);
    data.append("rollNumber", formData.rollNumber);
    data.append("dateOfBirth", formData.dateOfBirth);
    if (formData.profileImage) {
      data.append("image", formData.profileImage);
    }

    try {
      const response = await axios.post(
        `https://iems.onrender.com/institute/${instituteId}/student`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onCreateStudent(response.data)
      onClose();
    } catch (err) {
      console.error("Error creating student:", err);
      setError("Error creating student. Please try again.");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-cstudent">
      <div className="modal-content-cstudent">
        <div className="modal-header">
          <h2>Add New Student</h2>
          <div className="close-button" onClick={onClose}>×</div>
        </div>
        <form onSubmit={handleSubmit} className="create-student-form">
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="secCode"
              value={formData.secCode}
              onChange={handleChange}
              required
            />
            <div className="show-password-toggle">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="create-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Student"}
            </button>
            <button type="button" className="btn-danger" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
