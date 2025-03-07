import React, { useState, useEffect, useRef } from "react";
import { useExams } from "../../context/ExamContext"; // Import useExams hook
import "./css/ExamPage.css";
import EditExamModal from "./EditExamModal";
import ExamQuestions from "./ExamQuestions";
import CreateExam from "./CreateExam";
import AddTypingModal from "./AddTypingTest";
import AddQuestionsModal from "./CreateQuestion";
import ViewTypingModal from "./TypingTest";
import ViewResult from "./ViewResult";
import "remixicon/fonts/remixicon.css";

const Exam = () => {
  const { exams, fetchExams } = useExams(); // ✅ Get exams from context
  const instituteId = localStorage.getItem("instituteId");

  const [activeModal, setActiveModal] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedExams, setSelectedExams] = useState([]);
  const [sortType, setSortType] = useState("A-Z");
  const [selectionMode, setSelectionMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const dropdownRefs = useRef({}); // 🔹 Create refs for dropdowns
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`https://iems.onrender.com/institute/${examId}/questions`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // 🔥 Fetch exams when the component mounts
  useEffect(() => {
    if (instituteId) {
      fetchExams(instituteId);
    }
  }, [instituteId]);

  const toggleDropdown = (examId, event) => {
    event.stopPropagation(); // Prevent event bubbling
    setDropdownOpen((prev) => (prev === examId ? null : examId));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any dropdown
      if (dropdownOpen !== null) {
        const currentRef = dropdownRefs.current[dropdownOpen];
        if (currentRef && !currentRef.contains(event.target)) {
          setDropdownOpen(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const openModal = (modalType, examId = null) => {
    setActiveModal(modalType);
    if (examId) setSelectedExamId(examId);
    setDropdownOpen(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedExamId(null);
  };

  const toggleSelection = (examId) => {
    setSelectedExams((prev) =>
      prev.includes(examId) ? prev.filter((id) => id !== examId) : [...prev, examId]
    );
  };

  const deleteSelectedExams = () => {
    // This should ideally be handled via API call to delete the exams in the backend
    setSelectedExams([]);
    fetchExams(instituteId); // Refresh exams after deletion
  };

  const sortExams = (type) => {
    let sortedExams;
    if (type === "A-Z") {
      sortedExams = [...exams].sort((a, b) => a.examName.localeCompare(b.examName));
    } else if (type === "Z-A") {
      sortedExams = [...exams].sort((a, b) => b.examName.localeCompare(a.examName));
    } else if (type === "Newest") {
      sortedExams = [...exams].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      sortedExams = [...exams].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setSortType(type);
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.examDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderModalContent = () => {
    switch (activeModal) {
      case "viewQuestions":
        return <ExamQuestions examId={selectedExamId} closeModal={closeModal} />;
      case "editExam":
        return <EditExamModal exam={selectedExamId} closeModal={closeModal} />;
      case "createExam":
        return <CreateExam show={true} onClose={closeModal} onSave={() => fetchExams(instituteId)} />;
      case "addTyping":
        return <AddTypingModal show={true} examId={selectedExamId} onSave={() => fetchExams(instituteId)} onClose={closeModal} />;
      case "addQuestions":
        return <AddQuestionsModal show={true} examId={selectedExamId} onClose={closeModal} />;
      case "viewTyping":
        return <ViewTypingModal examId={selectedExamId} closeModal={closeModal} />;
      case "viewResult":
        return <ViewResult examId={selectedExamId} onClose={closeModal}  />;
      default:
        return null;
    }
  };

  return (
    <div className="exam-page">
      <div className="header">
        <h1>Exams</h1>
        <div className="actions">
          <input
            type="text"
            placeholder="Search exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="select-btn" onClick={() => setSelectionMode(!selectionMode)}>
            {selectionMode ? "Cancel Selection" : "Select"}
          </button>
          <select className="sort-dropdown" value={sortType} onChange={(e) => sortExams(e.target.value)}>
            <option value="A-Z">Sort A-Z</option>
            <option value="Z-A">Sort Z-A</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
          {selectedExams.length > 0 && selectionMode && (
            <button className="delete-btn" onClick={deleteSelectedExams}>
              <i className="ri-delete-bin-line"></i> Delete
            </button>
          )}
          <button className="create-btn" onClick={() => openModal("createExam")}>+ Create Exam</button>
        </div>
      </div>

      <div className="table-container">
        {filteredExams.length > 0 ? (
          <table className="exam-table">
            <thead>
              <tr>
                {selectionMode && (
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedExams(e.target.checked ? filteredExams.map((exam) => exam._id) : [])
                      }
                      checked={selectedExams.length === filteredExams.length}
                    />
                  </th>
                )}
                <th>Sr.</th>
                <th>Exam Name</th>
                <th>Description</th>
                <th>Duration (mins)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam, index) => (
                <tr key={exam._id}>
                  {selectionMode && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedExams.includes(exam._id)}
                        onChange={() => toggleSelection(exam._id)}
                      />
                    </td>
                  )}
                  <td>{index + 1}</td>
                  <td>{exam.examName}</td>
                  <td>{truncateText(exam.examDescription, 5)}</td>
                  <td>{exam.duration}</td>
                  <td className="action-buttons">
                    <div
                      className={`dropdown-container ${dropdownOpen === exam._id ? 'active' : ''}`}
                      ref={el => dropdownRefs.current[exam._id] = el}
                    >
                      <i
                        className="ri-more-2-fill"
                        onClick={(e) => toggleDropdown(exam._id, e)}
                      ></i>
                      {dropdownOpen === exam._id && (
                        <ul className="dropdown-menu">
                          <li onClick={() => openModal("viewQuestions", exam._id)}>View Questions</li>
                          <li onClick={() => openModal("editExam", exam)}>Edit Exam</li>
                          {exam.typingTest ? (
                            <li onClick={() => openModal("viewTyping", exam._id)}>View Typing Test</li>
                          ) : (
                            <li onClick={() => openModal("addTyping", exam._id)}>Add Typing Test</li>
                          )}
                          <li onClick={() => openModal("addQuestions", exam._id)}>Add Questions</li>
                          {exam.results && exam.results.length > 0 ? (
                            <li onClick={() => openModal("viewResult", exam._id)}>View Results</li>
                          ) : (
                            ""
                          )}

                          <li className="delete-option" onClick={() => deleteSelectedExams()}>Delete Exam</li>
                        </ul>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-exams">No exams found.</p>
        )}
      </div>

      {renderModalContent()}
    </div>
  );
};

export default Exam;