import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../components/styles/colors";
import "./styles/Home.css";
import { MdNotificationsNone } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdCheckCircle, MdGroupAdd, MdAccountBalanceWallet, MdMoneyOff } from "react-icons/md";
import Logo from "../assets/images/logo.png";
import Homeimg from "../assets/images/home.png";

export default function Home() {
  
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Gradient Header */}
      <div className="header">
        <img src={Logo} alt="logo" className="logo" />

        <div className="header-icons">
          <FaTelegramPlane
            size={24}
            className="header-icon"
            onClick={() => window.open("https://t.me/+5G73WQWUOdc4ZjI1", "_blank")}
          />
          
          <MdNotificationsNone size={26} className="header-icon" />
        </div>
      </div>

      {/* Home Banner */}
      <div className="img-container">
        <img src={Homeimg} alt="home" className="home-img" />
      </div>

      {/* Icon Buttons Row */}
      <div className="icon-header">
        <div className="icon-button" onClick={() => navigate("/checkin")}>
          <MdCheckCircle size={28} color={colors.primary} />
          <p className="icon-text">Check In</p>
        </div>

        <div className="icon-button" onClick={() => navigate("/invite")}>
          <MdGroupAdd size={28} color={colors.primary} />
          <p className="icon-text">Invite</p>
        </div>

        <div className="icon-button" onClick={() => navigate("/product")}>
          <MdAccountBalanceWallet size={28} color={colors.primary} />
          <p className="icon-text">Recharge</p>
        </div>

        <div className="icon-button" onClick={() => navigate("/withdraw")}>
          <MdMoneyOff size={28} color={colors.primary} />
          <p className="icon-text">Withdraw</p>
        </div>
      </div>

      {/* Special Plan */}
      <div className="special-plan">
        <div className="plan-header-row">
          <p className="plan-header-text">Special Plan</p>
          <p className="price-tag">Price ₹20,000</p>
        </div>

        <p className="plan-title">Product</p>

        <div className="info-row">
          <div className="info-box">
            <p className="info-label">Daily Profit</p>
            <p className="info-value">₹800</p>
          </div>

          <div className="info-box">
            <p className="info-label">Total Revenue</p>
            <p className="info-value">₹24,000</p>
          </div>
        </div>

        <button className="buy-button" onClick={() => navigate("/vipplan")}>
          BUY
        </button>
      </div>

    </div>
  );
}
