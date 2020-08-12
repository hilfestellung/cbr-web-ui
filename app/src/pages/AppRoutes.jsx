import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../utils/PrivateRoute';

// Public Routes
import Home from './home/Home';
import Impressum from './privacy/Impressum';
import Privacy from './privacy/Privacy';

// Private Routes
import Classes from './editor/class/Classes';
import Evaluators from './editor/evaluator/NumberEvaluatorEditor';
import Search from './search/Search';
import Explore from './explore/Explore';
import ProjectEditor from './editor/project/ProjectEditor';
import FileImport from './import/FileImport';

function AppRoutes() {
  return (
    <Switch>
      {/* Private Routes
       */}
      <PrivateRoute path="/search">
        <Search />
      </PrivateRoute>
      <PrivateRoute path="/import">
        <FileImport />
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
      {/* Public Routes
       */}
      <Route path="/explore">
        <Explore />
      </Route>
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
  );
}

export default AppRoutes;
