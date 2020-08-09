import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SagaContext } from './propTypes';
import Navigation from './components/Navigation';

import SagaContextMaintenance from './utils/SagaContextMaintenance';
import AppRoutes from './pages/AppRoutes';

function App({ sagaContext }) {
  return (
    <Router>
      <SagaContextMaintenance context={sagaContext} />
      <Navigation />
      <AppRoutes />
    </Router>
  );
}
App.propTypes = {
  sagaContext: SagaContext,
};

export default App;
