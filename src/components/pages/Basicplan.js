import React, { useState } from "react";
import axios from "axios";
import "../styles/Basicplan.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Basicplan() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [claimType, setClaimType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [loadingQr, setLoadingQr] = useState(false);

  const plans = [
    { invest: 2000, income: 50 },
    { invest: 3600, income: 85 },
    { invest: 5200, income: 200 },
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

    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
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
      setSelectedPlan(null);
      setUpiId("");
      setClaimType("");
      setQrData(null);
    } catch {
      alert("❌ Purchase failed");
    }
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(qrData?.upiId || "");
    alert("UPI ID copied");
  };

  return (
    <div className="basic-container">
      <div className="plans">
        {plans.map((plan, i) => (
          <div className="plan-card" key={i}>
            <div className="row">
              <span className="invest">₹{plan.invest}</span>
              <span className="income">₹{plan.income}/day</span>
            </div>
            <button onClick={() => handleBuy(plan)}>Buy</button>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Selected Plan ₹{selectedPlan?.invest}</h3>

            {loadingQr ? (
              <div className="loader" />
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
              <p className="error">QR not available</p>
            )}

            <input
              placeholder="Enter UPI Transaction ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />

            <div className="claims">
              {["Weekly", "Monthly", "90Day"].map((c) => (
                <label key={c}>
                  <input
                    type="radio"
                    checked={claimType === c}
                    onChange={() => setClaimType(c)}
                  />
                  {c} Claim
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
