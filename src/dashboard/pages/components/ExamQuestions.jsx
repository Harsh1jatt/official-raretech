import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ExamQuestions.css';

const ExamQuestions = ({ examId, exam, closeModal }) => {
  const [questions, setQuestions] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [isDeleteAllPopupOpen, setIsDeleteAllPopupOpen] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://iems.onrender.com/institute/${examId}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (examId) {
      fetchQuestions();
    }
  }, [examId]);

  const handleEditClick = (question) => {
    setIsEditing(question._id);
    setEditedQuestion({ ...question });
  };

  const handleInputChange = (e) => {
    setEditedQuestion({ ...editedQuestion, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...editedQuestion.options];
    updatedOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: updatedOptions });
  };

  const editQuestion = async (questionId, updatedQuestion) => {
    try {
      await axios.post(`https://iems.onrender.com/institute/${questionId}/edit-question`, updatedQuestion);
      setQuestions(questions.map(q => (q._id === questionId ? updatedQuestion : q)));
      setIsEditing(null);
      setEditedQuestion(null);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleSaveClick = (questionId) => {
    editQuestion(questionId, editedQuestion);
  };

  const handleDeleteClick = (questionId) => {
    setDeleteQuestionId(questionId);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post(`https://iems.onrender.com/institute/${deleteQuestionId}/delete-question`);
      setQuestions(questions.filter(q => q._id !== deleteQuestionId));
      setIsDeletePopupOpen(false);
      setDeleteQuestionId(null);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleDeleteAllClick = () => {
    setIsDeleteAllPopupOpen(true);
  };

  const confirmDeleteAll = async () => {
    try {
      await axios.post(`https://iems.onrender.com/institute/${examId}/delete-all-questions`);
      setQuestions([]);
      setIsDeleteAllPopupOpen(false);
    } catch (error) {
      console.error('Error deleting all questions:', error);
    }
  };

  return (
    <div className="modal-overlay-exam">
      <div className="modal-content-exam">
        <div className="exam-questions-container">
          <h2>Questions for Exam</h2>
          <div className="btns mb">
            <div className="btn btn-secondary" onClick={closeModal}>Close</div>
            <div className="btn btn-danger" onClick={handleDeleteAllClick}>Delete All Questions</div>
          <h1>Total Questions:- {questions.length}</h1>
          </div>
          <div className="questions-list">
            {questions.length === 0 ? (
              <p className="text-center">No Questions</p>
            ) : (
              questions.map((q) => (
                <div key={q._id} className="question-card">
                  {isEditing === q._id ? (
                    <div className="edit-question-form">
                      <input
                        type="text"
                        name="questionText"
                        value={editedQuestion.questionText}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="subfield"
                        value={editedQuestion.subfield}
                        onChange={handleInputChange}
                      />
                      <ul className="options-list">
                        {editedQuestion.options.map((option, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                          </li>
                        ))}
                      </ul>
                      {/* Dropdown for selecting the correct answer */}
                      <select
                        name="correctAnswer"
                        value={editedQuestion.correctAnswer}
                        onChange={handleInputChange}
                      >
                        {editedQuestion.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="btns">
                        <div className="btn btn-success" onClick={() => handleSaveClick(q._id)}>Save</div>
                        <div className="btn btn-secondary" onClick={() => setIsEditing(null)}>Cancel</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="question-text">{q.questionText}</h3>
                      <p><strong>Type:</strong> {q.subfield}</p>
                      <ul className="options-list">
                        {q.options.map((option, index) => (
                          <li key={index} className="option-item">{option}</li>
                        ))}
                      </ul>
                      <p className="correct-answer"><strong>Answer:</strong> {q.correctAnswer}</p>
                      <div className="btns">
                        <div className="btn btn-primary" onClick={() => handleEditClick(q)}>Edit</div>
                        <div className="btn btn-danger" onClick={() => handleDeleteClick(q._id)}>Delete</div>
                      </div>
                    </>
                  )}

                </div>
              ))
            )}
          </div>
          {isDeletePopupOpen && (
            <div className="delete-popup">
              <div className="delete-popup-content">
                <h3>Are you sure you want to delete this question?</h3>
                <div className="btn btn-danger" onClick={confirmDelete}>Yes</div>
                <div className="btn btn-secondary" onClick={() => setIsDeletePopupOpen(false)}>No</div>
              </div>
            </div>
          )}
          {isDeleteAllPopupOpen && (
            <div className="delete-popup">
              <div className="delete-popup-content">
                <h3>Are you sure you want to delete all questions?</h3>
                <div className="btn btn-danger" onClick={confirmDeleteAll}>Yes</div>
                <div className="btn btn-secondary" onClick={() => setIsDeleteAllPopupOpen(false)}>No</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamQuestions;
