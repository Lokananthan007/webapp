import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Product.css";

export default function Product() {
  const navigate = useNavigate();

  return (
    <div className="gradient-bg">
      <div className="scroll-container">

        {/* BASIC PLAN */}
        <div className="special-plan">
          <div className="header-row">
            <span className="header-text">BASIC PLAN</span>
            <span className="price-tag">90 Days</span>
          </div>

          <h3 className="plan-title">90 DAYS INCOME PLAN</h3>

          <div className="info-row">
            <div className="info-box">
              <p className="info-label">Starting Invest Plan ₹. 2,000</p>
              <p className="info-value">Income Rs. 50</p>
            </div>
          </div>

          <button
            className="buy-btn"
            onClick={() => navigate("/basicplan")}
          >
            Invest
          </button>
        </div>

        {/* VIP PLAN */}
        <div className="special-plan">
          <div className="header-row">
            <span className="header-text">VIP PLAN</span>
            <span className="price-tag">90 Days</span>
          </div>

          <h3 className="plan-title">90 DAYS INCOME PLAN</h3>

          <div className="info-row">
            <div className="info-box">
              <p className="info-label">Starting Invest Plan ₹. 10,000</p>
              <p className="info-value">Income Rs. 400</p>
            </div>
          </div>

          <button
            className="buy-btn"
            onClick={() => navigate("/vipplan")}
          >
            Invest
          </button>
        </div>

      </div>
    </div>
  );
}
