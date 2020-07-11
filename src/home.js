import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import usePageTitle from "./hooks/use-page-title";
import calculatorList from "./calculator-list";

export default function Home() {
  usePageTitle();

  return (
    <div className="home">
      <h1 className="home_title">
        <img
          src="/moolah-calculators.png"
          className="home_logo"
          alt="Moolah Calculators"
        />
      </h1>
      <div className="home_subtitle">
        A collection of personal finance calculators.
      </div>
      <div>
        <a href="https://ficalc.app" className="home_calculatorLink">
          FI Calc
        </a>
        {calculatorList.map((calculator) => (
          <Link
            className="home_calculatorLink"
            key={calculator.url}
            to={calculator.url}
          >
            {calculator.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
