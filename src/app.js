import React from "react";
import { Switch, Route } from "react-router-dom";
import "./app.css";
import Home from "./home";
import Header from "./common/header";
import Footer from "./common/footer";
import About from "./meta/about";
import Contact from "./meta/contact";
import NotFound from "./meta/not-found";
import calculatorList from "./calculator-list";
import useSetAppHeight from "./hooks/use-set-app-height";
import useScrollToTop from "./hooks/use-scroll-to-top";

function App() {
  useSetAppHeight();
  useScrollToTop();

  return (
    <div className="app">
      <div className="app_contents">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/about" exact component={About} />
            {calculatorList.map((calculator) => (
              <Route
                key={calculator.url}
                path={calculator.url}
                exact
                component={calculator.Component}
              />
            ))}
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
