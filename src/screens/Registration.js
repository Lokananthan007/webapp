import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const showMessage = (msg, isSuccess = false) => {
    setMessage(msg);
    setSuccess(isSuccess);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRegister = async () => {
    if (!username || !mobile || !password) {
      showMessage("All fields are required", false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/users/register`, {
        username,
        mobile,
        password,
      });

      if (response.data.user) {
        showMessage("User registered successfully", true);
        navigate("/login");
      } else {
        showMessage(
          response.data.message || "Mobile number already registered",
          false
        );
      }
    } catch (err) {
      showMessage(err.response?.data?.message || "Something went wrong", false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="card">
        <h2 className="title">Register</h2>

        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="input"
          placeholder="Mobile Number"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <div className="password-container">
          <input
            className="password-input"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {message && (
          <div className={`alert ${success ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <button className="button" onClick={handleRegister}>
          Register
        </button>

        <div className="link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}
