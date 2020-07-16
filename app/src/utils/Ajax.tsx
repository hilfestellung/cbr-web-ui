import React, { useCallback, useContext } from "react";
import globals from "../globals";
import { useAuth0 } from "@auth0/auth0-react";

export const AjaxContext = React.createContext<any>({
  get: () => Promise.reject(new Error("Unauthorized")),
});
export const useAjax = () => useContext(AjaxContext);

const { clientId } = globals;

function Ajax({ children }: any) {
  const { getIdTokenClaims } = useAuth0();

  const get = useCallback(
    (url: string, init?: RequestInit) => {
      return getIdTokenClaims().then((claims) => {
        const { __raw: token } = claims;
        const options = init || {};
        options.headers = new Headers(options.headers);
        const { headers } = options;
        headers.append("Authorization", "Bearer " + token);
        headers.append("X-Trace-Id", clientId);
        return fetch(url, options);
      });
    },
    [getIdTokenClaims]
  );

  return (
    <AjaxContext.Provider value={{ get }}>{children};</AjaxContext.Provider>
  );
}

export default Ajax;
