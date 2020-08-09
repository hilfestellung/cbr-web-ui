import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react';

import Button from 'react-bootstrap/Button';

import globals from '../../../globals';
import { ObjectSelector, ObjectAction } from '../../../modules/objects';
import SimplePage from '../../../components/layout/SimplePage';

function ProjectEditor() {
  const dispatch = useDispatch();
  const { getIdTokenClaims } = useAuth0();

  const isSending = useSelector(ObjectSelector.isSending);

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

  const deleteAllObjects = useCallback(() => {
    dispatch(ObjectAction.removeAllObjects());
  }, [dispatch]);

  return (
    <SimplePage>
      <div className="mb-3">
        In order to load the changes of the classes and the evaluators just{' '}
        <Button variant="warning" onClick={reloadProject}>
          Reload project
        </Button>
      </div>
      <div>
        Delete all objects of the project{' '}
        <Button variant="danger" onClick={deleteAllObjects}>
          Delete objects
        </Button>
      </div>
    </SimplePage>
  );
}

export default ProjectEditor;
