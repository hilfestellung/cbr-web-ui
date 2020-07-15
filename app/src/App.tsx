import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import Home from "./pages/home/Home";
import Privacy from "./pages/privacy/Privacy";
import Impressum from "./pages/privacy/Impressum";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/privacy-statement">
          <Privacy />
        </Route>
        <Route path="/impressum">
          <Impressum />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
