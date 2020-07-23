import React, { useState, useEffect, useCallback } from 'react';

import isEqual from 'lodash/isEqual';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { PlusSquare, Trash2Fill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

import { ClassesSelector } from '../../modules/classes';

function AggregateEditor({ aggregate }) {
  const { t } = useTranslation();

  const classes = useSelector(ClassesSelector.getItems);

  const [editableAggregate, setEditableAggregate] = useState(aggregate);
  const [newAttributeId, setNewAttributeId] = useState('');
  const [newAttributeType, setNewAttributeType] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const addNewAttribute = useCallback(
    ({ target }) => {
      setEditableAggregate({
        ...editableAggregate,
        attributes: [
          ...editableAggregate.attributes,
          { id: newAttributeId, type: newAttributeType },
        ],
      });
      setNewAttributeId('');
      setNewAttributeType('');
    },
    [
      newAttributeId,
      newAttributeType,
      editableAggregate,
      setNewAttributeId,
      setNewAttributeType,
      setEditableAggregate,
    ]
  );

  const removeAttribute = useCallback(
    (attributeId) => {
      setEditableAggregate({
        ...editableAggregate,
        attributes: editableAggregate.attributes.filter(
          (attribute) => attribute.id !== attributeId
        ),
      });
    },
    [editableAggregate, setEditableAggregate]
  );

  useEffect(() => {
    setEditableAggregate(aggregate);
  }, [aggregate]);

  useEffect(() => {
    setHasChanges(!isEqual(aggregate, editableAggregate));
  }, [aggregate, editableAggregate]);

  if (editableAggregate) {
    return (
      <div>
        <Form>
          <Form.Group controlId="aggregateId">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('Enter aggregate ID')}
              value={editableAggregate.id}
              disabled
            />
            <Form.Text className="text-muted">{t('Not editable')}</Form.Text>
          </Form.Group>
          {editableAggregate.attributes &&
            editableAggregate.attributes.map((attribute) => (
              <div key={attribute.id} className="d-flex">
                <Form.Group
                  controlId={attribute.id}
                  className="flex-grow-1 mr-2"
                >
                  <Form.Control type="text" value={attribute.id} disabled />
                </Form.Group>
                <Form.Group controlId={attribute.type} className="mr-2">
                  <Form.Control type="text" value={attribute.type} disabled />
                </Form.Group>
                <div>
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => removeAttribute(attribute.id)}
                  >
                    <Trash2Fill />
                  </Button>
                </div>
              </div>
            ))}
          <div className="d-flex">
            <Form.Group controlId="attributeId" className="flex-grow-1 mr-2">
              <Form.Control
                type="text"
                placeholder={t('Enter new attribute ID')}
                value={newAttributeId}
                onChange={({ target }) => setNewAttributeId(target.value)}
              />
            </Form.Group>
            <Form.Group controlId="selectedClass" className="mr-2">
              <Form.Control
                as="select"
                onChange={({ target }) => setNewAttributeType(target.value)}
              >
                {classes.map((modelClass) => (
                  <option key={modelClass.id} value={modelClass.id}>
                    {modelClass.id}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div>
              <Button variant="link" type="button" onClick={addNewAttribute}>
                <PlusSquare />
              </Button>
            </div>
          </div>
          <Button variant="primary" type="submit" disabled={!hasChanges}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
  return null;
}

export default AggregateEditor;
