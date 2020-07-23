import './errorhandler';
import './i18n';
import globals from './globals';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

import './styles/index.scss';

import configureStore from './configureStore';
import App from './App';

import * as serviceWorker from './serviceWorker';

const { apiBaseUrl } = globals;

const searchConfig = {
  location: {
    path: '/search',
  },
};

const sagaContext = {
  apiBaseUrl,
  authentication: {},
  router: {},
  searchConfig,
};

const store = configureStore(sagaContext);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading</div>}>
      <Provider store={store}>
        <Auth0Provider
          domain="cdein.eu.auth0.com"
          clientId="m4baaRyqUhaKqAos3T4W24ZGg0FJa4ox"
          redirectUri={window.location.origin}
        >
          <App sagaContext={sagaContext} />
        </Auth0Provider>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
