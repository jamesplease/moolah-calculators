import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { usePopper } from "react-popper";
import IconChevronLeft from "materialish/icon-chevron-left";
import { useConstant } from "core-hooks";
import { formatForDisplay, inflationFromCpi } from "../../vendor/@moolah/lib";
import Popover from "../../common/popover";
import Input from "../../common/input";
import usePageTitle from "../../hooks/use-page-title";
import useConfigForm from "../../hooks/use-config-form";
import useCalculatorState from "../../hooks/use-calculator-state/index";
import marketDataByYear from "../../utils/market-data-by-year";
import {
  withinYearLimit,
  lessThanValue,
  greaterThanValue,
} from "../../utils/validators";
import { years, dollars } from "../../utils/common-validators";
import ShareLinkModal from "../share-link-modal";
import CalculatorDetailsModal from "../calculator-details-modal";
import useCalculationUrl from "../../hooks/use-calculation-url";
import morph from "../../utils/animations/morph";
import expand from "../../utils/animations/expand";

const ANIMATION_DURATION = 150;

function computeResult(inputs) {
  const { startValue, startYear, endYear } = inputs;

  const marketData = marketDataByYear();
  const startCpi = marketData[startYear].cpi;
  const endCpi = marketData[endYear].cpi;

  const inflation = inflationFromCpi({ startCpi, endCpi });

  const rawNumber = Number(startValue) / inflation;
  return rawNumber;
}

export default function PurchasingPowerOverTime() {
  usePageTitle("Purchasing Power Over Time");
  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const formConfig = useConstant(() => {
    return {
      startValue: {
        type: "number",
        initialValue: 10000,
        validators: [...dollars],
      },
      startYear: {
        type: "number",
        initialValue: 2010,
        validators: [...years, withinYearLimit, lessThanValue("endYear")],
      },
      endYear: {
        type: "number",
        initialValue: 2020,
        validators: [...years, withinYearLimit, greaterThanValue("startYear")],
      },
    };
  });

  const configForm = useConfigForm({
    formConfig,
    useSourceOfTruth: () => useCalculatorState(formConfig),
  });

  const { state, getProps } = configForm;

  const result = useMemo(() => computeResult(state), [state]);
  const calculationUrl = useCalculationUrl(state);

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  const popperOptions = {
    placement: "bottom",
  };

  const isSmallScreen = false;

  const duration = ANIMATION_DURATION;

  // TODO: remove REDUCE_MOTION from morph, and conditionally choose an animation
  // instead.
  const animation = useMemo(() => {
    if (isSmallScreen) {
      return expand(duration);
    } else {
      return morph(duration);
    }
  }, [isSmallScreen, duration]);

  return (
    <>
      <div className="calculatorPage">
        <Link to="/" className="calculatorPage_backLink">
          <IconChevronLeft
            className="calculatorPage_backLinkIcon"
            size="1.125rem"
          />
          View other calculators
        </Link>
        <h1 className="calculatorPage_title">Purchasing Power Over Time</h1>
        <div className="calculatorPage_subtitle">Calculator</div>
        <div className="calculatorPage_description">
          <p>
            Over time, the purchasing power of the dollar tends to decrease:
            this phenomenon is called inflation. What this means is that if you
            receive $1 and choose to hold onto it, that dollar will
            progressively become less valuable as years pass.
          </p>
          <p>
            This calculator uses historical data to show you the impact that
            inflation has had on the U.S. dollar.{" "}
            <button
              type="button"
              className="calculatorPage_learnMoreBtn"
              onClick={() => setIsDetailsModalOpen(true)}
            >
              Learn more.
            </button>
          </p>
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
              <b>{formatForDisplay(state.startValue)}</b> in the year{" "}
              {state.startYear} will only have the purchasing power of{" "}
              <b>{formatForDisplay(result)}</b> in the year {state.endYear}.
            </div>
            <div className="calculator_shareBtnContainer">
              <button
                type="button"
                className="calculator_shareBtn"
                ref={setReferenceElement}
                onClick={() => setIsShareLinkOpen(true)}
              >
                Share this result
              </button>
            </div>
          </div>
        </div>
      </div>
      <Popover
        className="sheet getShareableLink_popover"
        aria-label="Share or bookmark calculation"
        overlayClassName="getShareableLink_overlay"
        active={isShareLinkOpen}
        referenceElement={referenceElement}
        animation={animation}
        animationDuration={120}
        popperOptions={popperOptions}
        // disablePopper={isSmallScreen}
        onDismiss={() => setIsShareLinkOpen(false)}
        // onLeave={() => setShowSuccessMsg(null)}
      >
        hello
      </Popover>
      {/* {ReactDOM.createPortal(
        <>
          {isShareLinkOpen && (
            <>
              <div
                ref={setPopperElement}
                className="sheet sheet-clearBg"
                style={{
                  ...styles.popper,
                  zIndex: 1000,
                }}
                {...attributes.popper}
              >
                Popper
              </div>
              <div
                className="overlay overlay-active overlay-clear"
                onClick={() => setIsShareLinkOpen(false)}
              />
            </>
          )}
        </>,
        document.querySelector("#popper-root")
      )} */}
      {/* <ShareLinkModal
        calculationUrl={calculationUrl}
        active={isShareLinkOpen}
        onClose={() => setIsShareLinkOpen(false)}
      /> */}
      <CalculatorDetailsModal
        title="Purchasing Power Over Time"
        active={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      >
        <p>These are the details of this calculator.</p>
      </CalculatorDetailsModal>
    </>
  );
}
