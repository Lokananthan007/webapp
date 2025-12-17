import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Withdraw.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Withdraw() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const [accountNo, setAccountNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [address, setAddress] = useState("");

  /* Fetch Purchases */
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_URL}/api/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data.user);
        setPurchases(data.purchases);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  /* Claim Eligibility */
  const canClaim = (purchase) => {
    if (!purchase.tracker) return true;

    const last = new Date(purchase.tracker.lastClaimDate || purchase.createdAt);
    const today = new Date();

    if (purchase.claimType === "Weekly") {
      let current = new Date(last);
      let workingDays = 0;

      while (current < today) {
        if (current.getDay() !== 0 && current.getDay() !== 6) workingDays++;
        current.setDate(current.getDate() + 1);
      }
      return workingDays >= 5;
    } else {
      const daysPassed = Math.floor((today - last) / (1000 * 60 * 60 * 24));
      return daysPassed >= 30;
    }
  };

  /* Submit Claim */
  const handleClaim = async () => {
    if (!accountNo || !ifsc || !address) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/claims`,
        {
          purchaseId: selectedPurchase._id,
          accountNo,
          ifsc,
          address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Claim submitted successfully!");
      setModalVisible(false);
      setSelectedPurchase(null);
      setAccountNo("");
      setIfsc("");
      setAddress("");
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting claim");
    }
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="withdraw-container">
      {/* Header */}
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅
        </button>
        <h2>Withdraw Request</h2>
      </div>

      {/* User Info */}
      {user && (
        <div className="user-box">
          <p>👤 {user.username}</p>
          <p>📱 {user.mobile}</p>
        </div>
      )}

      {/* Purchases */}
      {purchases.map((item) => {
        const eligible = canClaim(item);
        const amount =
          item.claimType === "Weekly"
            ? item.dailyIncome * 5
            : item.dailyIncome * 30;

        return (
          <div key={item._id} className="purchase-card">
            <p>Invest: ₹{item.invest}</p>
            <p>Daily Income: ₹{item.dailyIncome.toFixed(2)}</p>
            <p>
              Claim Amount: ₹{amount.toFixed(2)} ({item.claimType})
            </p>
            <p>Status: {eligible ? "✅ Eligible" : "⏳ Not Yet"}</p>

            <button
              disabled={!eligible}
              className={eligible ? "btn-success" : "btn-disabled"}
              onClick={() => {
                setSelectedPurchase(item);
                setModalVisible(true);
              }}
            >
              {eligible ? "Claim Now" : "Not Eligible"}
            </button>
          </div>
        );
      })}

      {/* Modal */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              Claim Amount: ₹
              {selectedPurchase &&
                (
                  selectedPurchase.claimType === "Weekly"
                    ? selectedPurchase.dailyIncome * 5
                    : selectedPurchase.dailyIncome * 30
                ).toFixed(2)}
            </h3>

            <input
              placeholder="Account No"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
            />
            <input
              placeholder="IFSC Code"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
            />
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="modal-actions">
              <button className="btn-success" onClick={handleClaim}>
                Submit
              </button>
              <button
                className="btn-cancel"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
