import React from "react";
import {
  MdHome,
  MdShoppingCart,
  MdGroup,
  MdAccountCircle
} from "react-icons/md";

import "./styles/MyAppBar.css";
import { colors } from "../components/styles/colors";

export default function MyAppBar({ active, setActive }) {
  return (
    <div className="bottom-bar">

      <div
        className="nav-icon"
        onClick={() => setActive("home")}
        style={{ color: active === "home" ? colors.black : colors.white }}
      >
        <MdHome size={30} />
      </div>

      <div
        className="nav-icon"
        onClick={() => setActive("product")}
        style={{ color: active === "product" ? colors.black : colors.white }}
      >
        <MdShoppingCart size={30} />
      </div>

      <div
        className="nav-icon"
        onClick={() => setActive("team")}
        style={{ color: active === "team" ? colors.black : colors.white }}
      >
        <MdGroup size={30} />
      </div>

      <div
        className="nav-icon"
        onClick={() => setActive("profile")}
        style={{ color: active === "profile" ? colors.black : colors.white }}
      >
        <MdAccountCircle size={30} />
      </div>

    </div>
  );
}
