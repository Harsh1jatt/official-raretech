import React, { useState } from 'react';
import axios from 'axios';
import './css/CreateQuestion.css';
import './css/Modal.css';

const CreateQuestion = ({ show, onClose, examId, onSave, token }) => {
  const initialQuestionState = {
    questionText: '',
    correctAnswer: '',
    subfield: '',
    options: ['', '', '', ''], // Assuming four options initially
  };

  const [createQuestion, setcreateQuestion] = useState(initialQuestionState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcreateQuestion((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    setcreateQuestion((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[index] = value;
      return { ...prevData, options: newOptions };
    });
  };

  const handleSave = async () => {
    if (!createQuestion.questionText.trim()) {
      setError("Please enter a question.");
      return;
    }
    
    const newQuestion = {
      questionText: createQuestion.questionText,
      correctAnswer: createQuestion.correctAnswer,
      subfield: createQuestion.subfield,
      options: createQuestion.options,
    };

    try {
      const response = await axios.post(
        `https://iems.onrender.com/institute/${examId}/questions`,
        newQuestion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        setcreateQuestion(initialQuestionState);
        setError(null);
        onSave(response.data);
        onClose();
      } else {
        setError("Failed to save the question. Please try again.");
      }
    } catch (err) {
      setError("Failed to save the question. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="create-question-modal-overlay">
      <div className="create-question-modal-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Add New Question</h2>
        {error && <p className="error">{error}</p>}

        <form className="create-question-form">
          <label>
            Question Text:
            <input
              type="text"
              name="questionText"
              value={createQuestion.questionText}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Subfield: <span>Example:- Computer Fundamental, MS Excel, MS Word, etc.</span>
            <input
              type="text"
              name="subfield"
              value={createQuestion.subfield}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Options:
            {createQuestion.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
              />
            ))}
          </label>

          <label>
            Correct Answer:
            <select
              name="correctAnswer"
              value={createQuestion.correctAnswer}
              onChange={handleChange}
              className="correct-answer-dropdown"
              required
            >
              <option value="" disabled>
                Select Correct Answer
              </option>
              {createQuestion.options.map((option, index) =>
                option ? (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ) : null
              )}
            </select>
          </label>

          <button
            type="button"
            onClick={handleSave}
            className="create-question-save-btn"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;