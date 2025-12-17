import React, { useState } from "react";
import axios from "axios";
import "../styles/Vipplan.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Vipplan() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [claimType, setClaimType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [loadingQr, setLoadingQr] = useState(false);

  const plans = [
    { invest: 10000, income: 400 },
    { invest: 15000, income: 600 },
    { invest: 20000, income: 800 },
  ];

  const fetchDisplayedQr = async () => {
    try {
      setLoadingQr(true);
      const res = await axios.get(`${API_URL}/api/qr/displayed`);
      setQrData(res.data || null);
    } catch {
      setQrData(null);
    } finally {
      setLoadingQr(false);
    }
  };

  const handleBuy = (plan) => {
    setSelectedPlan(plan);
    setModalVisible(true);
    fetchDisplayedQr();
  };

  const handleSubmit = async () => {
    if (!upiId) return alert("Enter UPI transaction ID");
    if (!claimType) return alert("Select claim type");

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login required");

      await axios.post(
        `${API_URL}/api/purchases`,
        {
          invest: selectedPlan.invest,
          dailyIncome: selectedPlan.income,
          upiId,
          claimType,
          qrName: qrData?.name || "N/A",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Purchase successful");
      setModalVisible(false);
      setUpiId("");
      setClaimType("");
      setQrData(null);
    } catch {
      alert("❌ Purchase failed");
    }
  };

  const copyUpi = () => {
    if (!qrData?.upiId) return;
    navigator.clipboard.writeText(qrData.upiId);
    setUpiId(qrData.upiId);
    alert("UPI copied & filled");
  };

  return (
    <div className="vip-wrapper">
      {plans.map((plan, i) => (
        <div className="card" key={i}>
          <div className="row">
            <b>₹{plan.invest}</b>
            <span>Daily ₹{plan.income}</span>
          </div>
          <button onClick={() => handleBuy(plan)}>Buy</button>
        </div>
      ))}

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Selected Plan</h3>
            <h4>₹{selectedPlan?.invest}</h4>

            {loadingQr ? (
              <p>Loading QR...</p>
            ) : qrData ? (
              <>
                <h4>{qrData.name}</h4>
                <img src={qrData.qrImage} alt="QR" />
                <div className="upi-row">
                  <span>{qrData.upiId}</span>
                  <button onClick={copyUpi}>Copy</button>
                </div>
              </>
            ) : (
              <p>No QR available</p>
            )}

            <input
              placeholder="UPI Transaction ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />

            <div className="claims">
              {["Weekly", "Monthly", "90Day"].map((t) => (
                <label key={t}>
                  <input
                    type="radio"
                    name="claim"
                    checked={claimType === t}
                    onChange={() => setClaimType(t)}
                  />
                  {t}
                </label>
              ))}
            </div>

            <button className="confirm" onClick={handleSubmit}>
              Confirm
            </button>
            <button className="cancel" onClick={() => setModalVisible(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
