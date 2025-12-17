import React, { useState } from "react";
import axios from "axios";
import "../styles/Password.css";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function Password() {
  const [mobile, setMobile] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      const res = await axios.put(
        `${API_URL}/api/users/change-password`,
        { mobile, oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": API_KEY,
          },
        }
      );

      alert(res.data.message || "Password changed successfully");

      setMobile("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Change password error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="password-wrapper">
      <div className="password-card">
        <h2 className="title">Change Password</h2>

        <input
          className="input"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="button" onClick={handleChangePassword}>
          Change Password
        </button>
      </div>
    </div>
  );
}
