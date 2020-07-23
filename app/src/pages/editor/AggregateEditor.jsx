import React, { useState, useEffect } from 'react';

import isEqual from 'lodash/isEqual';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ClassesSelector } from '../../modules/classes';
import ListEditor from '../../components/ListEditor';

function AggregateEditor({ aggregate }) {
  const { t } = useTranslation();

  const classes = useSelector(ClassesSelector.getItems);

  const [editableAggregate, setEditableAggregate] = useState(aggregate);
  const [hasChanges, setHasChanges] = useState(false);

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

          <ListEditor list={aggregate.attributes} classes={classes}>
            <ListEditor.Input name="id" className="flex-grow-1 mr-2" />
            <ListEditor.Select name="type" list={classes} className="mr-2" />
          </ListEditor>
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
