import "./errorhandler";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

import * as serviceWorker from "./serviceWorker";

import Ajax from "./utils/Ajax";

import configureStore from "./configureStore";
import App from "./App";
import { SearchConfig } from "./modules/search";

const searchConfig: SearchConfig = {
  location: {
    path: "/search",
  },
};

const history = createBrowserHistory();
const sagaContext = { authentication: {}, history, searchConfig };

const store = configureStore(sagaContext);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="cdein.eu.auth0.com"
        clientId="m4baaRyqUhaKqAos3T4W24ZGg0FJa4ox"
        redirectUri={window.location.origin}
      >
        <Ajax context={sagaContext}>
          <App history={history} />
        </Ajax>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
