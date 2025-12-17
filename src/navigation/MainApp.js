import React, { useState } from "react";
import Home from "../components/Home";
import Product from "../components/Product";
import Team from "../components/Team";
import Myaccount from "../components/Myaccount";
import MyAppBar from "../components/MyAppBar";
import "./MainApp.css";

export default function MainApp() {
  const [active, setActive] = useState("home");

  const renderScreen = () => {
    switch (active) {
      case "home":
        return <Home />;
      case "product":
        return <Product />;
      case "team":
        return <Team />;
      case "profile":
        return <Myaccount />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="main-container">
      <div className="screen-container">{renderScreen()}</div>
      <MyAppBar active={active} setActive={setActive} />
    </div>
  );
}
