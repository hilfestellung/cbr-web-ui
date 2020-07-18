import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export interface SagaContextMaintenanceOptions {
  context: any;
}

function SagaContextMaintenance({ context }: SagaContextMaintenanceOptions) {
  const auth = useAuth0();

  useEffect(() => {
    if (auth) {
      const source: any = auth;
      const target: any = context.authentication;
      [
        "isAuthenticated",
        "isLoading",
        "user",
        "getAccessTokenSilently",
        "getIdTokenClaims",
        "logout",
      ].forEach((key) => {
        target[key] = source[key];
      });
    }
  }, [auth, context]);

  return null;
}

export default SagaContextMaintenance;
