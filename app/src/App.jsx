import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SagaContext } from './propTypes';
import Navigation from './components/Navigation';

import PrivateRoute from './utils/PrivateRoute';
import SagaContextMaintenance from './utils/SagaContextMaintenance';

// Public Routes
import Home from './pages/home/Home';
import Impressum from './pages/privacy/Impressum';
import Privacy from './pages/privacy/Privacy';

// Private Routes
import Classes from './pages/editor/class/Classes';
import Evaluators from './pages/editor/evaluator/NumberEvaluatorEditor';
import Search from './pages/search/Search';
import Explore from './pages/explore/Explore';
import ProjectEditor from './pages/editor/project/ProjectEditor';

function App({ sagaContext }) {
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
        <PrivateRoute path="/editor/evaluator/:id">
          <Evaluators />
        </PrivateRoute>
        <PrivateRoute path="/editor">
          <Classes />
        </PrivateRoute>
        <PrivateRoute path="/project">
          <ProjectEditor />
        </PrivateRoute>
        <PrivateRoute path="/explore">
          <Explore />
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
App.propTypes = {
  sagaContext: SagaContext,
};

export default App;
