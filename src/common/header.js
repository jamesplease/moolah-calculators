import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img
          src="/moolah-calculators.png"
          className="header_logo"
          alt="Moolah Calculators"
        />
      </Link>
    </header>
  );
}
