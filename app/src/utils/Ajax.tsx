import React, { useCallback, useContext, useEffect } from "react";
import globals from "../globals";
import { useAuth0 } from "@auth0/auth0-react";

export const AjaxContext = React.createContext<any>({
  get: () => Promise.reject(new Error("Unauthorized")),
});
export const useAjax = () => useContext(AjaxContext);

function Ajax({ children, context }: any) {
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

  return <AjaxContext.Provider value={{}}>{children};</AjaxContext.Provider>;
}

export default Ajax;
