import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./css/StudentLogin.css";

const StudentLogin = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rollNumber || !password) {
      setError("Both Roll Number and Password are required");
      return;
    }

    try {
      const response = await axios.post("https://iems.onrender.com/student/login", {
        rollNumber,
        password,
      });

      // Store token and user data in localStorage or sessionStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("student", JSON.stringify(response.data.student));

      // Navigate to profile page on success
      navigate("/exam/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className="w-full h-screen login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
            </div>
          </div>
          <button type="submit" className="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
