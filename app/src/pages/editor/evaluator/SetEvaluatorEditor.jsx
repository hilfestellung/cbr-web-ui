import React, { useState, useCallback, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

import { PropTypes, NOP } from '../../../propTypes';
import { EvaluatorsSelector } from '../../../modules/evaluators';
import { symbolToString } from '../../../components/Symbol';
import { useTranslation } from 'react-i18next';

function SetEvaluatorEditor({ modelClass, evaluator, onEvaluatorChange }) {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const [comparisonType, setComparisonType] = useState(
    evaluator.comparisonType
  );
  const [elementEvaluator, setElementEvaluator] = useState(
    evaluator.elementEvaluator
  );

  const evaluators = useSelector(EvaluatorsSelector.getItems);

  const changeComparisonType = useCallback(
    ({ target }) => {
      setComparisonType(target.value);
    },
    [setComparisonType]
  );

  const changeEvaluator = useCallback(
    ({ target }) => {
      setElementEvaluator(target.value);
    },
    [setElementEvaluator]
  );

  useEffect(() => {
    onEvaluatorChange({ ...evaluator, comparisonType, elementEvaluator });
  }, [comparisonType, elementEvaluator, onEvaluatorChange]);

  return (
    <div>
      <Form.Group controlId="comparisonTypeId">
        <Form.Label>Comparision type</Form.Label>
        <Form.Control
          as="select"
          value={comparisonType}
          onChange={changeComparisonType}
        >
          <option>-</option>
          <option value="QueryInclusion">Query inclusion</option>
          <option value="CaseInclusion">Case inclusion</option>
          <option value="Intermediate">Intermediate</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="elementEvaluator">
        <Form.Label>Element evaluator</Form.Label>
        <Form.Control
          as="select"
          value={elementEvaluator}
          onChange={changeEvaluator}
        >
          <option>-</option>
          {Array.isArray(evaluators) &&
            evaluators.map((elementEvaluator) =>
              elementEvaluator.type === modelClass.elementType ? (
                <option key={elementEvaluator.id} value={elementEvaluator.id}>
                  {symbolToString(elementEvaluator, language)}
                </option>
              ) : null
            )}
        </Form.Control>
      </Form.Group>
    </div>
  );
}

SetEvaluatorEditor.defaultProps = {
  modelClass: undefined,
  evaluator: undefined,
  originEvaluator: undefined,
  onEvaluatorChange: NOP,
};
SetEvaluatorEditor.propTypes = {
  modelClass: PropTypes.object,
  evaluator: PropTypes.object,
  originEvaluator: PropTypes.object,
  onEvaluatorChange: PropTypes.func,
};
export default SetEvaluatorEditor;
