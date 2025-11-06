import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";

const WebFooter = () => {
  return (
    <footer className="bg-[#0a0f1c] text-gray-400 px-6 md:px-20 py-14 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10 md:gap-20">
        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="text-white text-2xl font-semibold mb-3">
            Raretech Institute
          </h2>
          <p className="text-sm leading-relaxed">
            Raretech Institute of Information Technology • Ludhiana, Punjab  
            <br />
            Tel:{" "}
            <a href="tel:6280009096" className="hover:text-blue-400">
              +91 62800 09096
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-6">
            © {new Date().getFullYear()} Raretech Institute. All rights reserved.
          </p>
        </div>

        {/* For Institute Use Only */}
        <div>
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">
            Institute
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://exam.raretech.co.in/"
                className="hover:text-blue-400 transition"
              >
                Exam
              </a>
            </li>
            <li>
              <a
                href="https://admin.raretech.co.in/"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="https://typing.raretech.co.in/"
                className="hover:text-blue-400 transition"
              >
                Typing Tutor
              </a>
            </li>
            <li>
              <Link
                to="/certificate"
                className="hover:text-blue-400 transition"
              >
                Certificate Verification
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">
            Policies
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy-policy" className="hover:text-blue-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/refund" className="hover:text-blue-400">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/shipping-delivery" className="hover:text-blue-400">
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link to="/terms-conditions" className="hover:text-blue-400">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">
            Connect
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://softweb.raretech.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-400 transition"
              >
                <Instagram size={18} />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/916280009096"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default WebFooter;
