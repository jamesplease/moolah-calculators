import "@reach/dialog/styles.css";
import "focus-visible";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import ReactGA from "react-ga";
import createQueryHistory from "query-history";
import "./index.css";
import { WindowInnerHeightProvider } from "./hooks/use-window-inner-height";
import { UndoProvider } from "./hooks/use-config-form";
import App from "./app";
import registerGoogleAnalytics from "./utils/register-google-analytics";

const isProduction = process.env.NODE_ENV === "production";

const history = createQueryHistory();

if (isProduction && window.location.hostname === "calculators.moolah.app") {
  console.log("Registering Google Analytics");
  registerGoogleAnalytics();

  history.listen((location) => {
    ReactGA.pageview(location.pathname);
  });
} else {
  console.log("Not registering Google Analytics.");
}

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <WindowInnerHeightProvider>
        <UndoProvider>
          <App />
        </UndoProvider>
      </WindowInnerHeightProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
