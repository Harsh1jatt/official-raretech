import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/EditStudentModal.css';

const EditStudentModal = ({ student, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    secCode: '',
    dateOfBirth: '',
    profileImage: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        studentName: student.studentName || '',
        rollNumber: student.rollNumber || '',
        secCode: student.secCode || '',
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.slice(0, 10) : '',
        profileImage: student.profileImage || ''
      });
      setImagePreview(student.profileImage || '');
    }
  }, [student]);

  const handleChange = (e) => {
    if (e.target.name === 'profileImageFile') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({
            ...formData,
            profileImage: reader.result
          });
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
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

    // Prepare update data based on what the backend accepts:
    const updateData = {
      name: formData.studentName,       // backend expects "name"
      rollNumber: formData.rollNumber,
      dateOfBirth: formData.dateOfBirth
    };

    try {
      const response = await axios.post(
        `https://iems.onrender.com/institute/${student._id}/edit-student`,
        updateData
      );
      console.log(response.data);
      // Call onUpdate with the updated student data so that the parent can update its state
      // onUpdate(response.data.student);
      onClose();
    } catch (err) {
      console.error("Error updating student:", err);
      setError("Error updating student details.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Student</h2>
          <div className="close-button" onClick={onClose}>&times;</div>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="formgroup">
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
          </div>

          <div className="formgroup">
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                name="secCode"
                value={formData.secCode}
                onChange={handleChange}
                required
              />
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
          </div>

          <div className="formgroup">
            <div className="form-group">
              <label>Profile Image</label>
              {imagePreview && (
                <img src={imagePreview} alt="Profile Preview" className="preview-image" />
              )}
              <input
                type="file"
                name="profileImageFile"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
