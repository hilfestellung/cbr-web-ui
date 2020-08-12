import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react';

import Button from 'react-bootstrap/Button';

import globals from '../../../globals';
import { ObjectSelector, ObjectAction } from '../../../modules/objects';
import SimplePage from '../../../components/layout/SimplePage';
import { ClassesSelector, ClassesAction } from '../../../modules/classes';
import {
  EvaluatorAction,
  EvaluatorsSelector,
} from '../../../modules/evaluators';

function ProjectEditor() {
  const dispatch = useDispatch();
  const { getIdTokenClaims } = useAuth0();

  const classes = useSelector(ClassesSelector.getItems);
  const evaluators = useSelector(EvaluatorsSelector.getItems);
  const isClassSending = useSelector(ClassesSelector.isSending);
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

  const deleteAllClasses = useCallback(() => {
    if (classes.length > 0) {
      evaluators.forEach((evaluator) =>
        dispatch(EvaluatorAction.removeEvaluator(evaluator.id))
      );
      classes.forEach((modelClass) =>
        dispatch(ClassesAction.removeClass(modelClass.id))
      );
    }
  }, [classes, isClassSending]);

  return (
    <SimplePage>
      <div className="mb-3">
        In order to load the changes of the classes and the evaluators just{' '}
        <Button variant="warning" onClick={reloadProject}>
          Reload project
        </Button>
      </div>
      <div className="mb-3">
        Delete all objects of the project{' '}
        <Button variant="danger" onClick={deleteAllObjects}>
          Delete objects
        </Button>
      </div>
      <div>
        Delete all classes of the project{' '}
        <Button variant="danger" onClick={deleteAllClasses}>
          Delete classes
        </Button>
      </div>
    </SimplePage>
  );
}

export default ProjectEditor;
