import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import "./Login.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!mobile || !password) {
      alert("Please enter mobile number and password");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
        mobile,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);
      navigate("/app");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="card">
        <h2 className="title">Login</h2>

        <input
          type="text"
          className="input"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            className="password-input"
            placeholder="Password"
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

        <button className="button" onClick={handleLogin}>
          Login
        </button>

        <Link to="/" className="link">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}
