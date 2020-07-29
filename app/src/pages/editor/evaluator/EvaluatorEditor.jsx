import React, { useCallback, useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import isEqual from 'lodash/isEqual';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { EvaluatorAction } from '../../../modules/evaluators';
import { PropTypes, Children } from '../../../propTypes';

export const EvaluatorEditorContext = React.createContext();

function EvaluatorEditor({ evaluator, children }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [editableEvaluator, setEditableEvaluator] = useState(evaluator);
  const [hasChanges, setHasChanges] = useState(false);

  const submit = useCallback(
    (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      dispatch(EvaluatorAction.putEvaluator(editableEvaluator));
    },
    [editableEvaluator, dispatch]
  );

  const reset = useCallback(() => {
    setEditableEvaluator(evaluator);
  }, [evaluator, setEditableEvaluator]);

  const onEvaluatorChange = useCallback(
    (newEvaluator) => {
      console.log(newEvaluator);
      setEditableEvaluator(newEvaluator);
    },
    [setEditableEvaluator]
  );

  useEffect(() => {
    console.log('Origin', evaluator);
    setEditableEvaluator({ ...evaluator });
  }, [evaluator, setEditableEvaluator]);

  useEffect(() => {
    console.log('Equals', evaluator, editableEvaluator);
    setHasChanges(!isEqual(evaluator, editableEvaluator));
  }, [evaluator, editableEvaluator]);

  return (
    <div>
      <Form onReset={reset} onSubmit={submit}>
        <Form.Group controlId="evaluatorId">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('Enter evaluator ID')}
            value={editableEvaluator.id}
            disabled
          />
          <Form.Text className="text-muted">{t('Not editable')}</Form.Text>
        </Form.Group>
        <EvaluatorEditorContext.Provider
          value={{
            originEvaluator: evaluator,
            editableEvaluator,
            hasChanges,
            onEvaluatorChange,
          }}
        >
          {children}
        </EvaluatorEditorContext.Provider>
        <Button
          variant="primary"
          type="submit"
          disabled={!hasChanges}
          className="mr-3"
        >
          Submit
        </Button>
        <Button variant="primary" type="reset" disabled={!hasChanges}>
          Reset
        </Button>
      </Form>
    </div>
  );
}
EvaluatorEditor.defaultProps = {
  evaluator: undefined,
};
EvaluatorEditor.propTypes = {
  evaluator: PropTypes.object,
  children: Children,
};

export default EvaluatorEditor;
