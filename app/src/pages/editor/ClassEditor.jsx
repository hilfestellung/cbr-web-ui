import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import isEqual from 'lodash/isEqual';

import { ClassesAction } from '../../modules/classes';
import { PropTypes, Children } from '../../propTypes';

export const ClassEditorContext = React.createContext();

function ClassEditor({ modelClass, children }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [editableModelClass, setEditableModelClass] = useState(modelClass);
  const [hasChanges, setHasChanges] = useState(false);

  const submit = useCallback(
    (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      dispatch(ClassesAction.putClass(editableModelClass));
    },
    [editableModelClass, dispatch]
  );

  const reset = useCallback(() => {
    setEditableModelClass(modelClass);
  }, [modelClass, setEditableModelClass]);

  const onClassChange = useCallback(
    (newModelClass) => {
      console.log('New model class', newModelClass);
      setEditableModelClass(newModelClass);
    },
    [setEditableModelClass]
  );

  useEffect(() => {
    setEditableModelClass(modelClass);
  }, [modelClass]);

  useEffect(() => {
    setHasChanges(!isEqual(modelClass, editableModelClass));
  }, [modelClass, editableModelClass]);

  return (
    <div>
      <Form onReset={reset} onSubmit={submit}>
        <Form.Group controlId="aggregateId">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('Enter aggregate ID')}
            value={editableModelClass.id}
            disabled
          />
          <Form.Text className="text-muted">{t('Not editable')}</Form.Text>
        </Form.Group>
        <ClassEditorContext.Provider
          value={{
            originClass: modelClass,
            editableClass: editableModelClass,
            hasChanges,
            onClassChange,
          }}
        >
          {children}
        </ClassEditorContext.Provider>
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
ClassEditor.defaultProps = {
  modelClass: undefined,
};
ClassEditor.propTypes = {
  modelClass: PropTypes.object,
  children: Children,
};

export default ClassEditor;
