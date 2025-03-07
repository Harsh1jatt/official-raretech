import React, { useState } from 'react';
import axios from 'axios';
import './css/Modal.css'; // Add styling for the modal

const AddTypingTest = ({ show, onClose, examId, onSave, token }) => {
  const [title, setTitle] = useState('');
  const [passage, setPassage] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!title || !passage || !duration) {
      setError('Please fill in all fields.');
      return;
    }

    const newTest = { title, passage, duration };

    try {
      const response = await axios.post(
        `https://iems.onrender.com/institute/${examId}/typing-test/create`,
        newTest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        // Clear fields on success
        setTitle('');
        setPassage('');
        setDuration('');
        setError(null);

        onSave(response.data); // Pass saved data
        onClose(); // Close the modal
      } else {
        setError('Failed to save the typing test. Please try again.');
      }
    } catch (err) {
      setError('Failed to save the typing test. Please try again.');
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Add Typing Test</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Passage:</label>
          <textarea value={passage} onChange={(e) => setPassage(e.target.value)} />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddTypingTest;
