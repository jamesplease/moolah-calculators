import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1 className="heading1">Not Found</h1>
      <p>This page could not be found.</p>
      <p>
        Please <Link to="/contact">contact me</Link> if you believe you've found
        a broken page.
      </p>
    </div>
  );
}
