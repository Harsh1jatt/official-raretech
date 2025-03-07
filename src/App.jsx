import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebRoutes from "./Website/WebRoutes";
import DRoutes from "./dashboard/DRoutes";
import SRoutes from "./students/SRoutes";
import ORoutes from "./owner/ORoutes";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Website routes */}
        <Route path="/*" element={<WebRoutes />} />
        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<DRoutes />} />
        {/* Students routes */}
        <Route path="/exam/*" element={<SRoutes />} />
        {/* Owner routes */}
        <Route path="/owner/*" element={<ORoutes/>} />
      </Routes>
    </Router>
  );
};

export default App;
