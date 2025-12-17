import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Myaccount.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function MyAccount() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyIncome, setTodayIncome] = useState(0);
  const [rechargeTotal, setRechargeTotal] = useState(0);
  const [withdrawTotal, setWithdrawTotal] = useState(0);

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (e) {
        console.log("Profile Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_URL}/api/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const purchases = res.data.purchases || [];

        let today = 0, invested = 0, withdraw = 0;

        purchases.forEach((p) => {
          today += p.todayIncome || 0;
          invested += p.invest || 0;
          withdraw += p.withdrawn || 0;
        });

        setTodayIncome(today);
        setRechargeTotal(invested);
        setWithdrawTotal(withdraw);
      } catch (err) {
        console.log("Purchase Error:", err);
      }
    };

    fetchPurchases();
  }, []);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="account-container">
      
      {/* Header */}
      <div className="profile-header">
        <div className="avatar">
          {user?.username ? user.username.charAt(0).toUpperCase() : "?"}
        </div>
        <p className="mobile">{user?.mobile}</p>
      </div>

      {/* Stats */}
      <div className="stats-box">
        <div className="stat">
          <h3>₹{dailyIncome.toFixed(2)}</h3>
          <p>Today</p>
        </div>
        <div className="stat">
          <h3>₹{rechargeTotal.toFixed(2)}</h3>
          <p>Recharge</p>
        </div>
        <div className="stat">
          <h3>₹{withdrawTotal.toFixed(2)}</h3>
          <p>Withdraw</p>
        </div>
      </div>

      {/* Options */}
      <div className="options">

        <button className="option-btn">About Company</button>

        <button
          className="option-btn"
          onClick={() => navigate("/withdraw")}
        >
          Withdraw Request
        </button>

        <button
          className="option-btn"
          onClick={() => navigate("/withdraw-record")}
        >
          Withdraw Record
        </button>

        <button
          className="option-btn"
          onClick={() => navigate("/security")}
        >
          Security Manager
        </button>

      </div>

      {/* Actions */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}
