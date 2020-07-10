import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconChevronLeft from "materialish/icon-chevron-left";
import Input from "../../common/input";
import usePageTitle from "../../hooks/use-page-title";

export default function EffectOfInflation() {
  const [startValue, setStartValue] = useState("10000");
  const [startYear, setStartYear] = useState("2010");
  const [endYear, setEndYear] = useState("2020");

  usePageTitle("Effect of Inflation");

  return (
    <div className="calculatorPage">
      <Link to="/" className="calculatorPage_backLink">
        <IconChevronLeft
          className="calculatorPage_backLinkIcon"
          size="1.125rem"
        />
        View other calculators
      </Link>
      <h1 className="calculatorPage_title">Effect of Inflation</h1>
      <div className="calculatorPage_subtitle">Calculator</div>
      <div className="calculatorPage_description">
        Over time, inflation decreases the purchasing power of the dollar. What
        this means is that if you receive $1 and choose to hold onto it, that
        dollar will progressively become less valuable as years pass.{" "}
        <button type="button" className="calculatorPage_learnMoreBtn">
          Learn more.
        </button>
      </div>

      <div className="calculator">
        <form className="calculator_form">
          <div className="calculator_row">
            <div className="calculator_rowItem">
              <div className="inputLabel_container">
                <label htmlFor="valueInStartYear" className="inputLabel">
                  Value In Start Year
                </label>
              </div>
              <Input
                id="valueInStartYear"
                className="calculator_largeInput"
                prefix="$"
                value={startValue}
                onChange={(e) => setStartValue(e.target.value)}
              />
            </div>
          </div>

          <div className="calculator_row">
            <div className="calculator_rowItem">
              <div className="inputLabel_container">
                <label htmlFor="startYear" className="inputLabel">
                  Start Year
                </label>
              </div>
              <Input
                id="startYear"
                className="calculator_largeInput"
                style={{
                  fontSize: "1.25rem",
                }}
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              />
            </div>

            <div className="calculator_rowItem">
              <div className="inputLabel_container">
                <label htmlFor="endYear" className="inputLabel">
                  End Year
                </label>
              </div>
              <Input
                id="endYear"
                className="calculator_largeInput"
                style={{
                  fontSize: "1.25rem",
                }}
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className="calculator_results">
          <h2 className="calculator_resultsTitle">Result</h2>
          <div className="calculator_resultsLargeNumber">$8,532.89</div>
          <div className="calculator_resultsDescription">
            <b>$10,000.00</b> in the year {startYear} will only have the
            purchasing power of <b>$8,335.40</b> in the year {endYear}.
          </div>
          <div className="calculator_shareBtnContainer">
            <button type="button" className="calculator_shareBtn">
              Share this result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
