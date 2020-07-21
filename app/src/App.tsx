import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import PrivateRoute from "./utils/PrivateRoute";

// Public Routes
import Home from "./pages/home/Home";
import Privacy from "./pages/privacy/Privacy";
import Impressum from "./pages/privacy/Impressum";

// Private Routes
import Search from "./pages/search/Search";
import Classes from "./pages/editor/Classes";
import SagaContextMaintenance from "./utils/SagaContextMaintenance";

function App({ sagaContext }: any) {
  return (
    <Router>
      <SagaContextMaintenance context={sagaContext} />
      <Navigation />
      <Switch>
        {/* Private Routes
         */}
        <PrivateRoute path="/search">
          <Search />
        </PrivateRoute>
        <PrivateRoute path="/editor/class/:id">
          <Classes />
        </PrivateRoute>
        <PrivateRoute path="/editor">
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
