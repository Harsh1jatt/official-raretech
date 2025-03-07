import React from "react";
import { Routes, Route } from "react-router-dom";
import WebHeader from "./pages/components/WebHeader";
import WebFooter from "./pages/components/WebFooter";
import Home from "./pages/Home";
import About from "./pages/About";
import Certificate from "./pages/Certificate";
import Courses from "./pages/Courses";
import Legal from './pages/Legal'
import Contact from "./pages/Contact";
import BackToTop from "../components/BackToTop";
const WebRoutes = () => {
  return (
    <>
      <WebHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <BackToTop />
      <WebFooter />
    </>
  );
};

export default WebRoutes;
