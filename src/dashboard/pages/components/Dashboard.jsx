import React from "react";
import { PiStudentBold, PiExamBold } from "react-icons/pi";
import "./css/Dashboard.css";
import sdeoc from "./assets/sdeoc.png";
import Students from "./Students";
import Exam from "./Exams";

// Import the context hooks
import { useStudents } from "../../../students/contexts/StudentContext";
import { useExams } from "../../context/ExamContext";

const Dashboard = () => {
  const { students, studentCount} = useStudents(); 
  const { exams, examCount } = useExams();

  return (
    <div className="dashboard-main-page">
      <div className="dashboard-main-container">
        <div className="dashboard-left">
          <h1 className="dashboard-title">Manage Students & Exams</h1>
          <p className="dashboard-description">
            Easily create exams, register students, and view statistics all in one place.
          </p>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon exam-icon">
                <PiExamBold />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Exams</p>
                <p className="stat-count">{examCount}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon student-icon">
                <PiStudentBold />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Students</p>
                <p className="stat-count">{studentCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-right">
          <img src={sdeoc} alt="Institute Logo" className="dashboard-image" />
        </div>
      </div>

      {/* Pass context data to components */}
      <Students students={students} />
      <Exam exams={exams} />
    </div>
  );
};

export default Dashboard;
