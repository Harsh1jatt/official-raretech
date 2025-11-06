import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import "./css/Web.css";

const WebFooter = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-300 py-14 px-6 md:px-20 mt-10 shadow-2xl border-t border-slate-700">
      {/* Subtle Glow Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600 via-indigo-500 to-transparent"></div>

      {/* Content Wrapper */}
      <div className="relative grid md:grid-cols-3 gap-12 z-10">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Raretech Institute of Information Technology
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            Empowering students with practical IT training and computer
            education that transforms their future in the digital world.
          </p>

          <div className="mt-6 space-y-3 text-sm md:text-base">
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-400" /> Ludhiana, Punjab
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-blue-400" />
              <a
                href="tel:6280009096"
                className="hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
              >
                +91 62800 09096
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} className="text-blue-400" />
              <a
                href="mailto:info@raretech.co.in"
                className="hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
              >
                info@raretech.co.in
              </a>
            </p>
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5 relative after:content-[''] after:absolute after:w-14 after:h-[2px] after:bg-blue-500 after:bottom-[-6px] after:left-0">
            For Institute Use Only
          </h3>
          <ul className="space-y-3 mt-3">
            {[
              { name: "Exam", url: "https://exam.raretech.co.in/" },
              { name: "Dashboard", url: "https://admin.raretech.co.in/" },
              { name: "Typing Tutor", url: "https://typing.raretech.co.in/" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/certificate"
                className="block hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
              >
                Certificate Verification
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5 relative after:content-[''] after:absolute after:w-14 after:h-[2px] after:bg-blue-500 after:bottom-[-6px] after:left-0">
            Useful Links
          </h3>
          <ul className="space-y-3 mt-3">
            <li>
              <Link
                to="/privacy-policy"
                className="block hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/refund"
                className="block hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                to="/shipping-delivery"
                className="block hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
              >
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link
                to="/terms-conditions"
                className="block hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-slate-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
        <p className="text-gray-500 text-sm text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">
            Raretech Institute of Information Technology
          </span>{" "}
          | Ludhiana, Punjab | +91-6280009096
        </p>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://softweb.raretech.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            title="Instagram"
          >
            <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-all duration-300"></div>
            <Instagram
              className="text-pink-500 group-hover:text-pink-400 transition-transform duration-300 group-hover:scale-110"
              size={24}
            />
          </a>
          <a
            href="https://wa.me/916280009096"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            title="WhatsApp"
          >
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-all duration-300"></div>
            <MessageCircle
              className="text-green-500 group-hover:text-green-400 transition-transform duration-300 group-hover:scale-110"
              size={24}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default WebFooter;
