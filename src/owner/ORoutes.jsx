import React from "react";
import { Routes, Route } from "react-router-dom";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
const ORoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<OwnerLogin />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
    </>
  );
};

export default ORoutes;
