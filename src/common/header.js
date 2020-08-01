import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "./header.css";

export default function Header() {
  const match = useRouteMatch({
    path: "/",
    exact: true,
  });

  if (match) {
    return null;
  }

  return (
    <header>
      <div className="header_contents">
        <Link to="/" className="header_link">
          <img
            src="/moolah-calculators-horizontal.png"
            className="header_logo"
            alt="Moolah Calculators"
          />
        </Link>
      </div>
    </header>
  );
}
