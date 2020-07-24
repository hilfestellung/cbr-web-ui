import React, { useCallback } from 'react';

import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

import { ClassesSelector } from '../../modules/classes';
import ListEditor from '../../components/ListEditor';
import { PropTypes, NOP } from '../../propTypes';

function AggregateEditor({ modelClass, onClassChange }) {
  const classes = useSelector(ClassesSelector.getItems);

  const addAttribute = useCallback(
    (attribute) => {
      onClassChange({
        ...modelClass,
        attributes: [...modelClass.attributes, attribute],
      });
    },
    [modelClass, onClassChange]
  );

  const removeAttribute = useCallback(
    (index) => {
      onClassChange({
        ...modelClass,
        attributes: modelClass.attributes.filter((_, i) => index !== i),
      });
    },
    [modelClass, onClassChange]
  );

  if (modelClass) {
    return (
      <>
        <ListEditor
          list={modelClass.attributes}
          classes={classes}
          onAdd={addAttribute}
          onRemove={removeAttribute}
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
            <ListEditor.ViewItem name="type">
              {({ value }) => {
                return (
                  <Form.Group
                    controlId="aggregateId"
                    className="mr-2"
                    style={{ width: '20%' }}
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
          <ListEditor.Select
            name="type"
            list={classes}
            className="mr-2"
            style={{ width: '20%' }}
            hasEmptyEntry
          />
        </ListEditor>
      </>
    );
  }
  return null;
}
AggregateEditor.defaultProps = {
  modelClass: undefined,
  onClassChange: NOP,
};
AggregateEditor.propTypes = {
  modelClass: PropTypes.object,
  onClassChange: PropTypes.func,
};

export default AggregateEditor;
