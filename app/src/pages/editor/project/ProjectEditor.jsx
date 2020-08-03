import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Button from 'react-bootstrap/Button';

import globals from '../../../globals';
import SimplePage from '../../../components/layout/SimplePage';

function ProjectEditor() {
  const { getIdTokenClaims } = useAuth0();

  const reloadProject = useCallback(async () => {
    const idToken = (await getIdTokenClaims()).__raw;
    // eslint-disable-next-line no-undef
    const response = await fetch(`${globals.apiBaseUrl}/reloadProject`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + idToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const result = await response.json();
    console.log(result);
  }, []);

  return (
    <SimplePage>
      In order to load the changes of the classes and the evaluators just{' '}
      <Button variant="danger" onClick={reloadProject}>
        Reload project
      </Button>
    </SimplePage>
  );
}

export default ProjectEditor;
