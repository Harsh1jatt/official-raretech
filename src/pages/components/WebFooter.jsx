import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import "./css/Web.css";

const WebFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 pt-10 pb-6 px-6 md:px-16 border-t border-gray-700">
      {/* Top Section */}
      <div className="grid md:grid-cols-3 gap-10 border-b border-gray-700 pb-8">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Raretech Institute of Information Technology
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Providing quality computer education, IT training, and career-building
            opportunities for students and professionals across Punjab.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <MapPin size={18} /> Ludhiana, Punjab
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} />{" "}
              <a href="tel:6280009096" className="hover:text-blue-400 transition">
                +91 62800 09096
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} />{" "}
              <a
                href="mailto:info@raretech.co.in"
                className="hover:text-blue-400 transition"
              >
                info@raretech.co.in
              </a>
            </p>
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            For Institute Use Only
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://exam.raretech.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:pl-1 transition-all"
              >
                Exam
              </a>
            </li>
            <li>
              <a
                href="https://admin.raretech.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:pl-1 transition-all"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="https://typing.raretech.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:pl-1 transition-all"
              >
                Typing Tutor
              </a>
            </li>
            <li>
              <Link
                to="/certificate"
                className="hover:text-blue-400 hover:pl-1 transition-all"
              >
                Certificate Verification
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-blue-400 hover:pl-1 transition-all"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/refund"
                className="hover:text-blue-400 hover:pl-1 transition-all"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                to="/shipping-delivery"
                className="hover:text-blue-400 hover:pl-1 transition-all"
              >
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link
                to="/terms-conditions"
                className="hover:text-blue-400 hover:pl-1 transition-all"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <p className="text-gray-500 text-sm text-center md:text-left">
          Copyright © 2025 -{" "}
          <span className="text-white font-semibold">
            Raretech Institute of Information Technology
          </span>{" "}
          • Ludhiana, Punjab • Tel: +91-6280009096
        </p>

        {/* Social Icons */}
        <div className="flex gap-5 mt-4 md:mt-0">
          <a
            href="https://softweb.raretech.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
            title="Instagram"
          >
            <Instagram className="text-pink-500 hover:text-pink-400" size={22} />
          </a>
          <a
            href="https://wa.me/916280009096"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
            title="WhatsApp"
          >
            <MessageCircle
              className="text-green-500 hover:text-green-400"
              size={22}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default WebFooter;
