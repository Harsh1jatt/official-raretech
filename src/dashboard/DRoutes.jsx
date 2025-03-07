import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./pages/components/AdminHeader";
import Sidebar from "./pages/components/Sidebar";
import Dashboard from "./pages/components/Dashboard";
import Students from "./pages/components/Students";
import Exams from "./pages/components/Exams";
import InstituteProfile from "./pages/components/InstituteProfile";
import Login from "./pages/Login";

// Import Context Providers
import { StudentProvider } from "../students/contexts/StudentContext.jsx";
import { ExamProvider } from "./context/ExamContext.jsx";

const DRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token once
  const isLoginPage = location.pathname === "/dashboard/login";

  useEffect(() => {
    console.log("Current Path:", location.pathname, "Token:", token); // Debugging

    // Redirect to login only if token is missing and the user is not already on login page
    if (!token && !isLoginPage) {
      navigate("/dashboard/login", { replace: true });
    }
  }, [token, isLoginPage, navigate, location]);

  return (
      <StudentProvider>
        <ExamProvider>
          <Routes>
            {/* Always show login page if user is not authenticated */}
            {!token ? (
              <>
                <Route path="/dashboard/login/" element={<Login />} />
                <Route path="*" element={<Login />} /> 
              </>
            ) : (
              // Protected routes
              <Route
                path="/*"
                element={
                  <div className="admin-container">
                    <div className="dashboard-container">
                      <Sidebar />
                      <div className="admin-content-area">
                        <AdminHeader />
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/students" element={<Students />} />
                          <Route path="/exams" element={<Exams />} />
                          <Route path="/settings" element={<InstituteProfile />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                }
              />
            )}
          </Routes>
        </ExamProvider>
      </StudentProvider>
  );
};

export default DRoutes;
