import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { PropTypes, NOP } from '../../../propTypes';
import { EvaluatorsSelector } from '../../../modules/evaluators';

function AggregateEvaluatorEditor({
  modelClass,
  evaluator,
  originEvaluator,
  onEvaluatorChange,
}) {
  const evaluators = useSelector(EvaluatorsSelector.getItems);
  const [evaluatorMap, setEvaluatorMap] = useState({});

  const changeEvaluator = useCallback(
    (id) => {
      return ({ target }) => {
        onEvaluatorChange({
          ...evaluator,
          attributes: evaluator.attributes.map((attribute) =>
            attribute.id === id
              ? {
                  ...attribute,
                  evaluator: evaluators.find(
                    (evaluator) => evaluator.id === target.value
                  ),
                }
              : attribute
          ),
        });
      };
    },
    [evaluator, onEvaluatorChange]
  );

  const changeWeight = useCallback(
    (id) => {
      return ({ target }) => {
        onEvaluatorChange({
          ...evaluator,
          attributes: evaluator.attributes.map((attribute) =>
            attribute.id === id
              ? { ...attribute, weight: parseFloat(target.value).toFixed(3) }
              : attribute
          ),
        });
      };
    },
    [evaluator, onEvaluatorChange]
  );

  useEffect(() => {
    if (modelClass && evaluators && Array.isArray(modelClass.attributes)) {
      const newMap = {};
      modelClass.attributes.map((attribute) => {
        newMap[attribute.id] = evaluators.filter(
          (evaluator) => evaluator.type === attribute.type
        );
      });
      setEvaluatorMap(newMap);
    }
  }, [modelClass, evaluators, setEvaluatorMap]);

  useEffect(() => {
    if (!evaluator.attributes || evaluator.attributes.length === 0) {
      onEvaluatorChange({
        ...evaluator,
        attributes: modelClass.attributes.map((attribute) => ({
          id: attribute.id,
          weight: 0,
        })),
      });
    }
  }, [evaluator, modelClass]);

  return (
    <>
      {evaluator &&
        Array.isArray(evaluator.attributes) &&
        evaluator.attributes.map((attribute, index) => {
          return (
            <div key={attribute.id} className="d-flex flex-row">
              <Form.Group
                controlId={attribute.id + 'Id'}
                className="flex-grow-1 mr-2"
              >
                {index === 0 && <Form.Label>Id</Form.Label>}
                <Form.Control name="id" value={attribute.id} readOnly />
              </Form.Group>
              <Form.Group
                controlId={attribute.id + 'EvaluatorId'}
                className="mr-2"
                style={{ width: '20%' }}
              >
                {index === 0 && <Form.Label>Evaluator</Form.Label>}
                <Form.Control
                  as="select"
                  name="evaluator"
                  value={attribute.evaluator}
                  onChange={changeEvaluator(attribute.id)}
                >
                  <option>Equality</option>
                  {evaluatorMap[attribute.id] &&
                    evaluatorMap[attribute.id].map((evaluator) => (
                      <option key={evaluator.id} value={evaluator.id}>
                        {evaluator.id}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId={attribute.id + 'WeightId'}
                className="mr-2"
                style={{ width: '20%' }}
              >
                {index === 0 && <Form.Label>Weight</Form.Label>}
                <Form.Control
                  type="number"
                  name="weight"
                  value={attribute.weight != null ? attribute.weight : 0}
                  onChange={changeWeight(attribute.id)}
                />
              </Form.Group>
            </div>
          );
        })}
    </>
  );
}

AggregateEvaluatorEditor.defaultProps = {
  modelClass: undefined,
  evaluator: undefined,
  originEvaluator: undefined,
  onEvaluatorChange: NOP,
};
AggregateEvaluatorEditor.propTypes = {
  modelClass: PropTypes.object,
  evaluator: PropTypes.object,
  originEvaluator: PropTypes.object,
  onEvaluatorChange: PropTypes.func,
};

export default AggregateEvaluatorEditor;
