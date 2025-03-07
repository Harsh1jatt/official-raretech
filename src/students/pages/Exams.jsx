import React, { useContext, useEffect, useState }from 'react';
import './css/Exams.css';
import { ProfileContext } from '../contexts/ProfileContext';
import axios from 'axios';
const Exams = () => {
  // Dummy exam data
  const { profile, examInfo, setExamInfo } = useContext(ProfileContext);
  console.log(profile.institute)
  const [exams, setExams] = useState(false);

  // const [exams] = useState([
  //   {
  //     _id: "exam1",
  //     examName: "Mathematics Test",
  //     examDescription: "A basic test covering algebra and geometry.",
  //     typingTest: "",
  //     duration: 60,
  //   },
  //   {
  //     _id: "exam2",
  //     examName: "Science Test",
  //     examDescription: "Covers physics, chemistry, and biology basics.",
  //     typingTest: "true",
  //     duration: 45,
  //   },
  //   {
  //     _id: "exam3",
  //     examName: "English Grammar Test",
  //     examDescription: "Test your grammar and vocabulary skills.",
  //     typingTest: "",
  //     duration: 30,
  //   },
  // ]);

  const [loading] = useState(false);
  const [error] = useState(null);
  useEffect(() => {
    
    const fetchExams = async () => {
      try {
        const response = await axios.get(`https://iems.onrender.com/institute/${profile.institute}/exams`);
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    fetchExams();
  }, [profile.institute]);

  const handleStartExam = (examId) => {
    const selectedExam = exams.find((exam) => exam._id === examId);

    if (selectedExam) {
      const typingTestValue = selectedExam.typingTest && selectedExam.typingTest !== '' ? true : false;
      
      // Store exam details in localStorage
      localStorage.setItem('examInfo', JSON.stringify(typingTestValue));
      localStorage.setItem('examId', selectedExam._id);
      localStorage.setItem('examDuration', selectedExam.duration);

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = '/exam/rules';
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="SelectExam" id="select-exam-section">
      <div className="exam-options">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam._id} className="exam-card">
              <h2>{exam.examName}</h2>
              <p>{exam.examDescription}</p>
              <button
                className="btn-select"
                onClick={() => handleStartExam(exam._id)}
              >
                Start {exam.examName} Exam
              </button>
            </div>
          ))
        ) : (
          <div className="no-exams">No exams available for this institute.</div>
        )}
      </div>
    </div>
  );
};

export default Exams;
