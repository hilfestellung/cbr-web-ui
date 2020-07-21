import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

export interface SagaContextMaintenanceOptions {
  context: any;
}

function SagaContextMaintenance({ context }: SagaContextMaintenanceOptions) {
  const auth = useAuth0();
  const history = useHistory();

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
    if (history) {
      const router = context.router;
      router.history = history;
      console.log("History", history, router, context);
    }
    console.log("Set history", history);
  }, [history, auth, context]);

  useEffect(() => {}, [context]);

  return null;
}

export default SagaContextMaintenance;
