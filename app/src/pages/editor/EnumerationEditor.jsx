import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import ListEditor from '../../components/ListEditor';
import { NOP } from '../../propTypes';

EnumerationEditor.propTypes = {};

function EnumerationEditor({ modelClass, onClassChange }) {
  const addSymbol = useCallback(
    (symbol) => {
      onClassChange({
        ...modelClass,
        enumeration: [...modelClass.enumeration, symbol],
      });
    },
    [modelClass, onClassChange]
  );

  const removeSymbol = useCallback(
    (index) => {
      onClassChange({
        ...modelClass,
        enumeration: modelClass.enumeration.filter((_, i) => index !== i),
      });
    },
    [modelClass, onClassChange]
  );

  return (
    <>
      <ListEditor
        list={modelClass.enumeration}
        onAdd={addSymbol}
        onRemove={removeSymbol}
      >
        <ListEditor.View>
          <ListEditor.ViewItem name="id">
            {({ value }) => {
              return (
                <Form.Group
                  controlId="aggregateId"
                  className="flex-grow-1 mr-2"
                >
                  <Form.Control type="text" value={value} readOnly />
                </Form.Group>
              );
            }}
          </ListEditor.ViewItem>
        </ListEditor.View>
        <ListEditor.Input
          name="id"
          className="flex-grow-1 mr-2"
          placeholder="Attribute ID eingeben"
        />
      </ListEditor>
    </>
  );
}
EnumerationEditor.defaultProps = {
  modelClass: undefined,
  onClassChange: NOP,
};
EnumerationEditor.propTypes = {
  modelClass: PropTypes.object,
  onClassChange: PropTypes.func,
};

export default EnumerationEditor;
