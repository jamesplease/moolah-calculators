import React from "react";
import { Link } from "react-router-dom";
import VisuallyHidden from "@reach/visually-hidden";
import "./footer.css";
import { ReactComponent as GitHubLogo } from "../assets/github.svg";

export default function Footer() {
  return (
    <footer>
      <div>© 2020 Moolah.</div>
      <div className="footer_links">
        <Link className="footer_link" to="/contact">
          Contact
        </Link>
        <Link className="footer_link" to="/about">
          About
        </Link>
        <a
          href="https://github.com/jamesplease/moolah-calculators"
          className="footer_link"
          to="/about"
        >
          <VisuallyHidden>View Project on GitHub</VisuallyHidden>
          <GitHubLogo className="footer_linkLogo" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
