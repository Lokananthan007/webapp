import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/WithdrawRecord.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function WithdrawRecord() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ FIXED

        if (!token) {
          alert("Login required");
          navigate("/login");
          return;
        }

        const res = await axios.get(`${API_URL}/api/claims/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecords(res.data.claims || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [navigate]);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="withdraw-record-container">
      <div className="header-row">
        <button className="back-btn" onClick={() => navigate(-1)}>🔙</button>
        <h2>Withdrawal Records</h2>
        <div />
      </div>

      {records.length === 0 ? (
        <p className="no-data">No withdrawal records found</p>
      ) : (
        records.map((rec) => (
          <div key={rec._id} className="record-wrapper">
            <div className="user-card">
              <p>👤 {rec.user?.username}</p>
              <p>📱 {rec.user?.mobile}</p>
            </div>

            <div className="detail-card">
              <p>💰 Amount: ₹{rec.amount}</p>
              <p>🏦 A/C: {rec.accountNo}</p>
              <p>IFSC: {rec.ifsc}</p>
              <p>📍 {rec.address}</p>
              <p>📅 {new Date(rec.createdAt).toLocaleDateString()}</p>

              <p className={`status ${rec.status.toLowerCase()}`}>
                Status: {rec.status}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
