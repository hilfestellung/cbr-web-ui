import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import PrivateRoute from "./utils/PrivateRoute";

// Public Routes
import Home from "./pages/home/Home";
import Privacy from "./pages/privacy/Privacy";
import Impressum from "./pages/privacy/Impressum";

// Private Routes
import Search from "./pages/search/Search";

function App({ history }: any) {
  return (
    <Router history={history}>
      <Navigation />
      <Switch>
        {/* Private Routes
         */}
        <PrivateRoute path="/search">
          <Search />
        </PrivateRoute>
        {/* Public Routes
         */}
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
