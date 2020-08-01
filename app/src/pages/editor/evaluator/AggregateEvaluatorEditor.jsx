import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { PropTypes, NOP } from '../../../propTypes';
import { EvaluatorsSelector } from '../../../modules/evaluators';

function AggregateEvaluatorEditor({
  modelClass,
  evaluator,
  onEvaluatorChange,
}) {
  const evaluators = useSelector(EvaluatorsSelector.getItems);
  const [evaluatorMap, setEvaluatorMap] = useState({});

  const changeMode = useCallback(
    ({ target }) => {
      onEvaluatorChange({ ...evaluator, mode: target.value });
    },
    [evaluator, onEvaluatorChange]
  );

  const changeEvaluator = useCallback(
    (id) => {
      return ({ target }) => {
        onEvaluatorChange({
          ...evaluator,
          attributes: evaluator.attributes.map((attribute) =>
            attribute.id === id
              ? {
                  ...attribute,
                  evaluator: target.value,
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
              ? { ...attribute, weight: target.value }
              : attribute
          ),
        });
        return true;
      };
    },
    [evaluator, onEvaluatorChange]
  );

  useEffect(() => {
    if (modelClass && evaluators && Array.isArray(modelClass.attributes)) {
      const newMap = {};
      modelClass.attributes.forEach((attribute) => {
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
  }, [evaluator, modelClass, onEvaluatorChange]);

  return (
    <>
      <div className="d-flex flex-row">
        <div className="flex-grow-1 mr-2"></div>
        <Form.Group className="mr-2" style={{ width: '20%' }}>
          <Form.Label>Similarity mode</Form.Label>
          <Form.Control
            as="select"
            value={evaluator.mode}
            onChange={changeMode}
          >
            <option value="Average">Average</option>
            <option value="Min">Minimum</option>
            <option value="Max">Maximum</option>
            <option value="Euclidean">Euclidean</option>
          </Form.Control>
        </Form.Group>
        <div className="mr-2" style={{ width: '10%' }}></div>
      </div>
      {evaluator &&
        Array.isArray(evaluator.attributes) &&
        evaluator.attributes.map((attribute, index) => {
          return (
            <div key={attribute.id} className="d-flex flex-row">
              <Form.Group
                controlId={attribute.id + 'Id'}
                className="flex-grow-1 mr-2"
              >
                {index === 0 && <Form.Label>Attribute</Form.Label>}
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
                style={{ width: '10%' }}
              >
                {index === 0 && <Form.Label>Weight</Form.Label>}
                <Form.Control
                  type="number"
                  name="weight"
                  value={attribute.weight != null ? attribute.weight : 0}
                  onChange={changeWeight(attribute.id)}
                  disabled={evaluator.mode !== 'Average'}
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
