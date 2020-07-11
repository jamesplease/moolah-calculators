import ReactGA from "react-ga";

const trackingId = "UA-172462937-1";

export default function registerGoogleAnalytics() {
  ReactGA.initialize(trackingId);
}
