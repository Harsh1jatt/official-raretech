import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/EditExamModal.css';

const EditExamModal = ({ exam, closeModal }) => {
  const [formData, setFormData] = useState({
    examName: '',
    examDescription: '',
    duration: '',
  });

  useEffect(() => {
    if (exam) {
      setFormData({
        examName: exam.examName,
        examDescription: exam.examDescription,
        duration: exam.duration,
      });
    }
  }, [exam]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://iems.onrender.com/institute/${exam._id}/edit-exam`, formData);
      console.log('Updated exam:', response.data);
      closeModal();
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  return (
    <div className="modal-overlay-edit">
      <div className="modal-content-edit">
        <div className="close-button" onClick={closeModal}>×</div>
        <h2>Edit Exam</h2>
        <form onSubmit={handleSubmit} className="edit-exam-form">
          <div className="form-group">
            <label>Exam Name</label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Exam Description</label>
            <textarea
              name="examDescription"
              value={formData.examDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Duration (mins)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="btn-danger" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExamModal;