import React, { useState, useCallback } from 'react';

import Form from 'react-bootstrap/Form';
import { PropTypes } from '../../../propTypes';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { EvaluatorAction } from '../../../modules/evaluators';
import {
  NumberEvaluator,
  AggregateEvaluator,
  AggregateSimilarityMode,
  SetEvaluator,
  SetComparisonType,
  LookupEvaluator,
  LookupMode,
} from '@hilfestellung/cbr-kernel';

function NewEvaluator({ modelClass }) {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [pattern, setPattern] = useState('');

  const submit = useCallback(
    (event) => {
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      let evaluator;
      if (pattern === 'number') {
        evaluator = new NumberEvaluator(id, modelClass.id);
      } else if (pattern === 'aggregate') {
        evaluator = new AggregateEvaluator(
          id,
          modelClass.id,
          AggregateSimilarityMode.average
        );
        evaluator.attributes = modelClass.attributes.map((attribute) => ({
          id: attribute.id,
          weight: 1,
        }));
      } else if (pattern === 'set') {
        evaluator = new SetEvaluator(
          id,
          modelClass.id,
          SetComparisonType.Intermediate
        );
      } else if (pattern === 'lookup') {
        evaluator = new LookupEvaluator(
          id,
          modelClass.id,
          LookupMode.Symmetric
        );
      }
      dispatch(EvaluatorAction.addEvaluator(evaluator.toJSON()));
      setId('');
      setPattern('');
    },
    [id, pattern, modelClass, dispatch, setId, setPattern]
  );
  return (
    <Form onSubmit={submit}>
      <Form.Group>
        <Form.Label>Id</Form.Label>
        <Form.Control
          type="text"
          value={id}
          onChange={({ target }) => setId(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Pattern</Form.Label>
        <Form.Control
          as="select"
          value={pattern}
          onChange={({ target }) => setPattern(target.value)}
        >
          <option>-</option>
          <option value="aggregate" disabled={modelClass.type !== 'aggregate'}>
            Aggregate
          </option>
          <option value="set" disabled={modelClass.type !== 'set'}>
            Set
          </option>
          <option value="lookup" disabled={modelClass.type !== 'string'}>
            Lookup
          </option>
          <option
            value="number"
            disabled={!['integer', 'float'].includes(modelClass.type)}
          >
            Number
          </option>
          <option value="number" disabled={!['date'].includes(modelClass.type)}>
            Date
          </option>
        </Form.Control>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
NewEvaluator.propTypes = {
  modelClass: PropTypes.object,
};

export default NewEvaluator;
