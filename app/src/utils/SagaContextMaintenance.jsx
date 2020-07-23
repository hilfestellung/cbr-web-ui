// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { SagaContext } from '../propTypes';

function SagaContextMaintenance({ context }) {
  const auth = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (auth) {
      const source = auth;
      const target = context.authentication;
      [
        'isAuthenticated',
        'isLoading',
        'user',
        'getAccessTokenSilently',
        'getIdTokenClaims',
        'logout',
      ].forEach((key) => {
        target[key] = source[key];
      });
    }
    if (history) {
      const router = context.router;
      router.history = history;
      console.log('History', history, router, context);
    }
    console.log('Set history', history);
  }, [history, auth, context]);

  useEffect(() => {}, [context]);

  return null;
}
SagaContextMaintenance.defaultProps = {
  context: null,
};
SagaContextMaintenance.propTypes = {
  context: SagaContext,
};

export default SagaContextMaintenance;
