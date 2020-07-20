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
import Classes from "./pages/editor/Classes";

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
        <PrivateRoute path="/editor">
          <Classes />
        </PrivateRoute>
        <PrivateRoute path="/editor/class/:classId">
          <Classes />
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
