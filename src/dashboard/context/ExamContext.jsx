import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const ExamContext = createContext();

// Provider Component
export const ExamProvider = ({ children }) => {
  const [examCount, setExamCount] = useState(0);
  const [exams, setExams] = useState([]);
  const instituteId = localStorage.getItem("instituteId"); // Get from localStorage

  // Fetch exams from backend
  const fetchExams = async (id) => {
    try {
      const response = await axios.get(`https://iems.onrender.com/institute/${id}/exams`);
      setExamCount(response.data.length)
      setExams(response.data);
      // console.log(response.data[0])
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  // Auto-fetch exams when component mounts
  useEffect(() => {
    if (instituteId) {
      fetchExams(instituteId);
    }
  }, [instituteId]);

  return (
    <ExamContext.Provider value={{ exams, examCount, fetchExams }}>
      {children}
    </ExamContext.Provider>
  );
};

// ✅ Fix: Add custom hook
export const useExams = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExams must be used within an ExamProvider");
  }
  return context;
};
