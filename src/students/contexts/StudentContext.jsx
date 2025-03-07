import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const StudentContext = createContext();

// Provider Component
export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const instituteId = localStorage.getItem("instituteId");

  // Fetch students from backend
  const fetchStudents = async (id) => {
    try {
      const response = await axios.get(`https://iems.onrender.com/institute/${id}/students`);
      setStudents(response.data);
      setStudentCount(response.data.length);
      
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Auto-fetch students when component mounts
  useEffect(() => {
    if (instituteId) {
      fetchStudents(instituteId);
    }
  }, [instituteId]);

  return (
    <StudentContext.Provider value={{ students, studentCount, fetchStudents, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

// ✅ Custom Hook
export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};
