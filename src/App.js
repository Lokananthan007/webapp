import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./screens/Registration";
import Login from "./screens/Login";
import MainApp from "./navigation/MainApp";

import Checkin from "./components/pages/Checkin";
import Invite from "./components/pages/Invite";
import Basicplan from "./components/pages/Basicplan";
import Vipplan from "./components/pages/Vipplan";
import Product from "./components/Product";
import Withdraw from "./components/pages/Withdraw";
import Password from "./components/pages/Password";
import WithdrawRecord from "./components/pages/WithdrawRecord";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Main App */}
        <Route path="/app" element={<MainApp />} />

        {/* Sub Pages */}
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/basicplan" element={<Basicplan />} />
        <Route path="/vipplan" element={<Vipplan />} />
        <Route path="/product" element={<Product />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/password" element={<Password />} />
        <Route path="/withdraw-record" element={<WithdrawRecord />} />

      </Routes>
    </BrowserRouter>

  );
}
