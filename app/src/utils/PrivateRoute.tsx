import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { RouteProps, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...props }: RouteProps) => (
  <Route {...props}>{children}</Route>
);

export default withAuthenticationRequired<RouteProps>(
  PrivateRoute as React.ComponentType,
  {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
  }
);
