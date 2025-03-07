import React, { useState, useEffect } from "react";
import "./css/Students.css";
import "./css/Result.css";
import axios from "axios";

const ViewResult = ({ examId, onClose }) => {
  const [students, setStudents] = useState([]);
  const [examName, setExamName] = useState("");
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  // Get the token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://iems.onrender.com/institute/${examId}/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { examName, results } = response.data;
        setExamName(examName || "Exam");
        setStudents(results || []);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load results. Please try again later.");
      }
    };

    fetchResults();
  }, [examId, token]);

  const fetchAnswers = async (resultId) => {
    try {
      const response = await axios.get(`https://iems.onrender.com/institute/results/${resultId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resultDetails = response.data.resultDetails;
      if (resultDetails) {
        setSelectedStudent(resultDetails);
        setShowAnswerModal(true);
      }
    } catch (err) {
      console.error("Error fetching answers:", err);
      setError("Failed to load answers. Please try again later.");
    }
  };

  return (
    <div className="full-screen-modal">
      <div className="modal-content">
        {/* Close Button */}
        <button className="btn-close" onClick={onClose}>X</button>
        <h1>Results for {examName}</h1>

        <div className="studentsContainer">
          <div className="student-card">
            <div className="student-header">
              <h2 className="student-title">Students Result</h2>
            </div>

            <div className="table-container">
              {error ? (
                <p className="error-message">{error}</p>
              ) : students.length === 0 ? (
                <p className="no-students">No Results are Available</p>
              ) : (
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Roll Number</th>
                      <th>Result</th>
                      <th>Marks</th>
                      {students.some(student => student.wpm !== undefined) && <th>WPM</th>}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student._id}>
                        <td>{index + 1}</td>
                        <td className="image-cell">
                          <img
                            src={student.profileImage || "default-profile.png"}
                            alt="Student"
                            className="student-image"
                          />
                        </td>
                        <td>{student.studentName}</td>
                        <td>{student.RollNumber}</td>
                        <td>{student.pass ? "Pass" : "Fail"}</td>
                        <td>{student.marks}</td>
                        {student.wpm !== undefined && <td>{student.wpm}</td>}
                        <td>
                          <button onClick={() => fetchAnswers(student._id)}>View Answers</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Answers */}
      {showAnswerModal && selectedStudent && (
        <div className="modal-overlay-result">
          <div className="modal-container-result">
            <button className="btn-close btn-danger" onClick={() => setShowAnswerModal(false)}>Close</button>
            <h2 className="modal-title">{selectedStudent.studentName}'s Answers</h2>
            <div className="modal-body">
              {selectedStudent.userAnswers && selectedStudent.userAnswers.length > 0 ? (
                selectedStudent.userAnswers.map((answer, index) => (
                  <div key={index} className="question-block">
                    <p className="question-number">Question {index + 1}:</p>
                    <p className="question-text"><strong>Q:</strong> {answer.questionText}</p>
                    <p className="question-text"><strong>Type:</strong> {answer.subType}</p>
                    <ul className="options-list">
                      {answer.options.map((option, idx) => (
                        <li
                          key={idx}
                          className={`option-item ${
                            option === answer.correctAnswer ? "correct-answer" :
                            option === answer.userAnswer ? "user-answer" : ""
                          }`}
                        >
                          {option}
                          {option === answer.userAnswer && <span className="badge">Your Answer</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No answers available.</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ViewResult;
