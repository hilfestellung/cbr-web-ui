import React, { useState, useEffect, useCallback } from 'react';

import isEqual from 'lodash/isEqual';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { ClassesSelector, ClassesAction } from '../../modules/classes';
import ListEditor from '../../components/ListEditor';
import { PropTypes } from '../../propTypes';

function AggregateEditor({ aggregate }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const classes = useSelector(ClassesSelector.getItems);

  const [editableAggregate, setEditableAggregate] = useState(aggregate);
  const [hasChanges, setHasChanges] = useState(false);

  const addAttribute = useCallback(
    (attribute) => {
      setEditableAggregate({
        ...editableAggregate,
        attributes: [...editableAggregate.attributes, attribute],
      });
    },
    [editableAggregate, setEditableAggregate]
  );

  const removeAttribute = useCallback(
    (index) => {
      setEditableAggregate({
        ...editableAggregate,
        attributes: editableAggregate.attributes.filter(
          (attribute, i) => index !== i
        ),
      });
    },
    [editableAggregate, setEditableAggregate]
  );

  const submitAggregate = useCallback(
    (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      dispatch(ClassesAction.putClass(editableAggregate));
    },
    [editableAggregate, setEditableAggregate]
  );

  const resetAggregate = useCallback(() => {
    setEditableAggregate(aggregate);
  }, [aggregate, setEditableAggregate]);

  useEffect(() => {
    setEditableAggregate(aggregate);
  }, [aggregate]);

  useEffect(() => {
    setHasChanges(!isEqual(aggregate, editableAggregate));
  }, [aggregate, editableAggregate]);

  if (editableAggregate) {
    return (
      <div>
        <Form onReset={resetAggregate} onSubmit={submitAggregate}>
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

          <ListEditor
            list={editableAggregate.attributes}
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
          <Button variant="primary" type="submit" disabled={!hasChanges}>
            Submit
          </Button>
          <Button variant="primary" type="reset" disabled={!hasChanges}>
            Reset
          </Button>
        </Form>
      </div>
    );
  }
  return null;
}
AggregateEditor.defaultProps = {
  aggregate: undefined,
};
AggregateEditor.propTypes = {
  aggregate: PropTypes.object,
};

export default AggregateEditor;
