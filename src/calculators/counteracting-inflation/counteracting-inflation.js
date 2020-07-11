import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import IconChevronLeft from "materialish/icon-chevron-left";
import { formatForDisplay, inflationFromCpi } from "../../vendor/@moolah/lib";
import Input from "../../common/input";
import usePageTitle from "../../hooks/use-page-title";
import useConfigForm from "../../hooks/use-config-form";
import useCalculatorState from "../../hooks/use-calculator-state/index";
import marketDataByYear from "../../utils/market-data-by-year";

const formConfig = {
  startValue: {
    type: "number",
    initialValue: 10000,
  },
  startYear: {
    type: "number",
    initialValue: 2010,
  },
  endYear: {
    type: "number",
    initialValue: 2020,
  },
};

function computeResult(inputs) {
  const { startValue, startYear, endYear } = inputs;

  const marketData = marketDataByYear();
  const startCpi = marketData[startYear].cpi;
  const endCpi = marketData[endYear].cpi;

  const inflation = inflationFromCpi({ startCpi, endCpi });

  const rawNumber = Number(startValue) * inflation;
  return rawNumber;
}

function useThisState() {
  return useCalculatorState(formConfig);
}

export default function CounteractingInflation() {
  usePageTitle("Purchasing Power Over Time");

  const { state, getProps } = useConfigForm({
    formConfig,
    useSourceOfTruth: useThisState,
  });

  const result = useMemo(() => computeResult(state), [state]);

  return (
    <div className="calculatorPage">
      <Link to="/" className="calculatorPage_backLink">
        <IconChevronLeft
          className="calculatorPage_backLinkIcon"
          size="1.125rem"
        />
        View other calculators
      </Link>
      <h1 className="calculatorPage_title">Counteracting Inflation</h1>
      <div className="calculatorPage_subtitle">Calculator</div>
      <div className="calculatorPage_description">
        <p>
          Over time, the purchasing power of the dollar tends to decrease: this
          phenomenon is called inflation. Maintaining a constant purchasing
          power ("counteracting" inflation) typically requires possessing a
          larger amount of dollars in future years.
        </p>
        <p>
          This calculator shows you how many dollars you would need in a
          particular year to maintain the same purchasing power as you started
          with.
        </p>
        {/* <button type="button" className="calculatorPage_learnMoreBtn">
          Learn more.
        </button> */}
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
                {...getProps("startValue", {
                  id: "valueInStartYear",
                  className: "calculator_largeInput",
                  type: "number",
                  prefix: "$",
                  style: {
                    fontSize: "1.25rem",
                  },
                })}
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
                {...getProps("startYear", {
                  id: "startYear",
                  className: "calculator_largeInput",
                  type: "number",
                  style: {
                    fontSize: "1.25rem",
                  },
                })}
              />
            </div>

            <div className="calculator_rowItem">
              <div className="inputLabel_container">
                <label htmlFor="endYear" className="inputLabel">
                  End Year
                </label>
              </div>
              <Input
                {...getProps("endYear", {
                  id: "endYear",
                  className: "calculator_largeInput",
                  type: "number",
                  style: {
                    fontSize: "1.25rem",
                  },
                })}
              />
            </div>
          </div>
        </form>
        <div className="calculator_results">
          <h2 className="calculator_resultsTitle">Result</h2>
          <div className="calculator_resultsLargeNumber">
            {formatForDisplay(result)}
          </div>
          <div className="calculator_resultsDescription">
            <b>{formatForDisplay(result)}</b> in the year {state.endYear} has
            the same purchasing power that{" "}
            <b>{formatForDisplay(state.startValue)}</b> had in the year{" "}
            {state.startYear}.
          </div>
          {/* <div className="calculator_shareBtnContainer">
            <button type="button" className="calculator_shareBtn">
              Share this result
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
