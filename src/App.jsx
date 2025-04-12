import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebHeader from "./pages/components/WebHeader";
import WebFooter from "./pages/components/WebFooter";
import Home from "./pages/Home";
import About from "./pages/About";
import Certificate from "./pages/Certificate";
import Courses from "./pages/Courses";
import Legal from "./pages/Legal";
import Contact from "./pages/Contact";
import BackToTop from "./components/BackToTop";
import PrivacyPolicy from "./razorpages/PrivacyPolicy";
import CancellationRefund from "./razorpages/CancellationAndRefund";
import ShippingDelivery from "./razorpages/ShippingAndDelivery";
import TermsAndConditions from "./razorpages/TermsAndConditions";
const App = () => {

  return (
    <Router>
      <WebHeader />
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<CancellationRefund />} />
        <Route path="/shipping-delivery" element={<ShippingDelivery />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <BackToTop />
      <WebFooter />
    </Router>
  );
};

export default App;
