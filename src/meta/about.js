import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="heading1">About</h1>
      <p>
        Moolah Calculators are a collection of calculators related to personal
        finance.
      </p>
      <p>
        All of these calculators were created by me, James. It's nice to meet
        you!
      </p>
      <h2 className="heading2">Historical Data Source</h2>
      <p>
        Some of the calculators on this website use historical data. All
        historical data is from Nobel Prize-winning economist{" "}
        <a href="https://en.wikipedia.org/wiki/Robert_J._Shiller">
          Robert Shiller
        </a>
        . You can access this historical data on{" "}
        <a href="http://www.econ.yale.edu/~shiller/data.htm">his website</a>.
      </p>
    </div>
  );
}
