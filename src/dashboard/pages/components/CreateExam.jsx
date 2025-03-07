import React, { useState } from "react";
import axios from "axios";
import "./css/CreateExam.css";

const CreateExam = ({ show, onClose, onSave }) => {
  const [examData, setExamData] = useState({
    examName: "",
    examDescription: "",
    duration: "",
  });
  const instituteId = localStorage.getItem("instituteId");
  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(null); // To handle errors

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!examData.examName.trim() || !examData.examDescription.trim() || !examData.duration.trim()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://iems.onrender.com/institute/${instituteId}/exam`,
        examData, // Directly passing examData
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onSave(response.data); // Pass new exam data to parent component
      setExamData({ examName: "", examDescription: "", duration: "" }); // Reset form
      onClose(); // Close modal
    } catch (error) {
      setError(error.response ? error.response.data.message : "Error creating exam.");
      console.error("Error creating exam:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create New Exam</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Exam Name:
            <input
              type="text"
              name="examName"
              value={examData.examName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Exam Description:
            <input
              type="text"
              name="examDescription"
              value={examData.examDescription}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Duration (in minutes):
            <input
              type="number"
              name="duration"
              value={examData.duration}
              onChange={handleChange}
              required
              min="1"
            />
          </label>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Exam"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
