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
        <div className="home_calculatorContainer">
          <h2 className="home_calculatorTitle">FI Calc</h2>
          <div className="home_calculatorTags">
            <div className="home_calculatorTag">Uses Historical Data</div>
            <div className="home_calculatorTag">Retirement</div>
          </div>
          <p className="home_calculatorDescription">
            Determine the success rates of different retirement strategies using
            historical data.
          </p>
          <div className="home_launchLinkContainer">
            <a className="home_launchCalculatorLink" href="https://ficalc.app">
              Launch Calculator
            </a>
          </div>
        </div>
        {calculatorList.map((calculator) => (
          <div className="home_calculatorContainer" key={calculator.url}>
            <h2 className="home_calculatorTitle">{calculator.name}</h2>
            <div className="home_calculatorTags">
              {calculator.tags.map((tag) => {
                return (
                  <div key={tag} className="home_calculatorTag">
                    {tag}
                  </div>
                );
              })}
            </div>
            {calculator.shortDescription && (
              <p className="home_calculatorDescription">
                {calculator.shortDescription}
              </p>
            )}
            <div className="home_launchLinkContainer">
              <Link className="home_launchCalculatorLink" to={calculator.url}>
                Launch Calculator
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
