import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { PropTypes, NOP } from '../../../propTypes';
import { ClassesSelector } from '../../../modules/classes';

import { symbolToString } from '../../../components/Symbol';
import { useTranslation } from 'react-i18next';

function SetEditor({ modelClass, onClassChange }) {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const [elementType, setElementType] = useState(modelClass.elementType);

  const classes = useSelector(ClassesSelector.getItems);

  const changeElementType = useCallback(
    ({ target }) => {
      onClassChange({ ...modelClass, elementType: target.value });
    },
    [onClassChange]
  );

  useEffect(() => {
    setElementType(modelClass.elementType);
  }, [modelClass, setElementType]);

  return (
    <>
      <Form.Group controlId={`${modelClass.id}Id`}>
        <Form.Label>Element class</Form.Label>
        <Form.Control
          as="select"
          value={elementType}
          onChange={changeElementType}
        >
          <option>-</option>
          {Array.isArray(classes) &&
            classes.map((clazz) =>
              modelClass.id !== clazz.id ? (
                <option key={clazz.id} value={clazz.id}>
                  {symbolToString(clazz, language)}
                </option>
              ) : null
            )}
        </Form.Control>
      </Form.Group>
    </>
  );
}
SetEditor.defaultProps = {
  originModelClass: undefined,
  modelClass: undefined,
  onClassChange: NOP,
};
SetEditor.propTypes = {
  originModelClass: PropTypes.object,
  modelClass: PropTypes.object,
  onClassChange: PropTypes.func,
};

export default SetEditor;
