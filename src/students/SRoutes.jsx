import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProfileProvider, ProfileContext } from "./contexts/ProfileContext.jsx"; // Import ProfileProvider
import StudentLogin from "./pages/StudentLogin";
import Rules from "./pages/Rules";
import Exams from "./pages/Exams";
import ExamHeader from "./pages/ExamHeader";
import SProfile from "./pages/SProfile";
import TypingExam from "./pages/TypingExam";
import StudentExam from "./pages/StudentExam";
import ExamResult from "./pages/ExamResult";

const SRoutesContent = () => {
  const { institute, profile } = useContext(ProfileContext); // Get institute from context
  const location = useLocation();
  return (
    <>
      {/* Hide header only on "/exam/login", show on other routes */}
      {location.pathname !== "/exam/login" && <ExamHeader institute={institute} student={profile} />}

      <Routes>
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/profile" element={<SProfile />} />
        <Route path="/exams" element={<Exams institute={institute} student={profile} />} />
        <Route path="/rules" element={<Rules institute={institute} student={profile} />} />
        <Route path="/typingtest" element={<TypingExam institute={institute} student={profile} />} />
        <Route path="/" element={<StudentExam institute={institute} student={profile} />} />
        <Route path="/result" element={<ExamResult institute={institute} student={profile} />} />
      </Routes>
    </>
  );
};

const SRoutes = () => {
  return (
    <ProfileProvider>
      <SRoutesContent />
    </ProfileProvider>
  );
};

export default SRoutes;
