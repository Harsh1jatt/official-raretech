import React, { useContext, useEffect, useState } from 'react';
import './css/styles.css';
import './css/Exam.css';
import Tabs from './components/Tabs';
import QuestionSection from './components/QuestionSection';
import Sidebar from './components/Sidebar';
import Timer from './components/Timer';
import ExamResult from './ExamResult';
import axios from 'axios';
import { ProfileContext } from '../contexts/ProfileContext.jsx';
import { useNavigate } from 'react-router-dom';

const StudentExam = () => {
  const { profile } = useContext(ProfileContext);
  const [questions, setQuestions] = useState([]);
  const [subfields, setSubfields] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [tabQuestionIndex, setTabQuestionIndex] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null); // State for score
  const [submitted, setSubmitted] = useState(false); // Submission state
  const [activeModal, setActiveModal] = useState(null); // Manage all modals dynamically
  const navigate = useNavigate();
  const examId = localStorage.getItem('examId');
  const examDuration = parseInt(localStorage.getItem('examDuration'));
  const wpm = parseInt(localStorage.getItem('wpm')); // Typing speed


  useEffect(() => {
    if (!examId) {
      setError('No examId found in localStorage');
      setLoading(false);
      return;
    }
  
    const examQuestionsUrl = `https://iems.onrender.com/institute/${examId}/questions`;
  
    axios
      .get(examQuestionsUrl)
      .then((response) => {
        const fetchedQuestions = response.data;
  
        // Extract subfields and shuffle questions by subfield
        const questionsBySubfield = fetchedQuestions.reduce((acc, question) => {
          const subfield = question.subfield;
          if (!acc[subfield]) acc[subfield] = [];
          acc[subfield].push(question);
          return acc;
        }, {});
  
        Object.keys(questionsBySubfield).forEach((subfield) => {
          // Shuffle questions for each subfield
          questionsBySubfield[subfield] = questionsBySubfield[subfield].sort(
            () => Math.random() - 0.5
          );
        });
  
        // Flatten the shuffled questions and set state
        setQuestions(Object.values(questionsBySubfield).flat());
  
        // Extract unique subfields
        const uniqueSubfields = Object.keys(questionsBySubfield);
        setSubfields(uniqueSubfields);
  
        // Set default selected tab to 0th index
        setSelectedTab(uniqueSubfields[0]);
        setTabQuestionIndex(uniqueSubfields.reduce((acc, subfield) => {
          acc[subfield] = 0; // Default index for all subfields is 0
          return acc;
        }, {}));
  
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching questions');
        setLoading(false);
      });
  }, [examId]);
  
  const handleSaveAnswer = (questionId, selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  const handleQuestionIndexChange = (newIndex) => {
    setTabQuestionIndex((prev) => ({
      ...prev,
      [selectedTab]: newIndex,
    }));
  };

  const handleSubmitExam = async () => {
    if (submitted) return; // Prevent multiple submissions
  
    setSubmitted(true); // Disable the submit button immediately
    setError(null); // Clear previous errors
  
    try {
      // Calculate correct answers
      const correctAnswers = questions.reduce((total, question) => {
        const userAnswer = userAnswers[question._id];
        const isCorrect = userAnswer === question.correctAnswer;
        return total + (isCorrect ? 1 : 0);
      }, 0);
  
      // Check pass/fail
      const pass = correctAnswers >= questions.length * 0.3;
  
      // Prepare payload
      const payload = {
        studentName: profile.studentName,
        RollNumber: profile.rollNumber,
        profileImage: profile.profileImage,
        userAnswers,
        wpm, // Include WPM if applicable
        marks: correctAnswers,
        pass,
      };
  
      // Send payload to the backend
      const response = await axios.post(
        `https://iems.onrender.com/institute/submitExam/${examId}`,
        payload
      );
  
      // Handle successful submission
      if (response.status === 200) {
        setScore(correctAnswers);
  
        // Save result data locally
        const resultData = {
          userImage: profile.profileImage,
          userName: profile.studentName,
          rollNumber: profile.rollNumber,
          userScore: correctAnswers,
          wpm: wpm || null,
          totalQuestions: questions.length,
        };
  
        localStorage.setItem("examResult", JSON.stringify(resultData));
  
        // Navigate to the result page
        navigate("/exam/result");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
  
      // Display error message
      setError("Failed to submit the exam. Please try again.");
      setSubmitted(false); // Re-enable the button for retry
    }
  };
  
  

  const filteredQuestions = questions.filter((q) => q.subfield === selectedTab);

  return (
    <div className={`exam-container ${submitted ? 'exam-disabled' : ''}`}>
      <nav className="nav-tabs" id="nav-tabs">
        <Tabs
          subfields={subfields}
          selectedTab={selectedTab}
          onSelectTab={handleTabChange}
        />
      </nav>
      <div className="main-content">
        <Timer duration={examDuration} onTimeUp={handleSubmitExam} />
        <QuestionSection
          questions={filteredQuestions}
          loading={loading}
          error={error}
          userAnswers={userAnswers}
          onSaveAnswer={handleSaveAnswer}
          currentQuestionIndex={tabQuestionIndex[selectedTab]}
          onIndexChange={handleQuestionIndexChange}
        />
        <Sidebar
          questions={filteredQuestions}
          userAnswers={userAnswers}
          onQuestionClick={(index) => handleQuestionIndexChange(index)}
          onSubmitExam={handleSubmitExam}
          submitted={submitted} // Pass the submitted state
/>

        {submitted && (
          <div className="modal1">
            <div className="modal-content1">
              <ExamResult
                userImage={profile.profileImage}
                userName={profile.studentName}
                rollNumber={profile.rollNumber}
                userScore={score}
                wpm={wpm}
                totalQuestions={questions.length}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentExam;
