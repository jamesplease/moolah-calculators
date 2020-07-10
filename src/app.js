import React from "react";
import { Switch, Route } from "react-router-dom";
import "./app.css";
import Home from "./home";
import calculatorList from "./calculator-list";

function App() {
  return (
    <div className="app">
      <div className="app_contents">
        <Switch>
          <Route path="/" exact component={Home} />
          {calculatorList.map((calculator) => (
            <Route
              key={calculator.url}
              path={calculator.url}
              exact
              component={calculator.Component}
            />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default App;
