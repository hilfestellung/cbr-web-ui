import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

import { PropTypes, NOP } from '../../../propTypes';

function LookupTableEditor({
  modelClass,
  evaluator,
  originEvaluator,
  onEvaluatorChange,
}) {
  const [mode, setMode] = useState();
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [similarity, setSimilarity] = useState();

  useEffect(() => {
    if (evaluator) {
      setMode(evaluator.mode || 'symmetric');
    }
  }, [evaluator, setMode]);

  return (
    <div>
      <Form.Group controlId="modeId">
        <Form.Label>Lookup mode</Form.Label>
        <Form.Control
          as="select"
          value={mode}
          onChange={({ target }) => setMode(target.value)}
        >
          <option value="symmetric">Symmetric</option>
          <option value="asymmetric">Asymmetric</option>
        </Form.Control>
      </Form.Group>
      <div className="d-flex">
        <Form.Group controlId="sourceId" className="flex-grow-1 mr-2">
          <Form.Label>Source</Form.Label>
          <Form.Control as="select">
            {modelClass &&
              Array.isArray(modelClass.enumeration) &&
              modelClass.enumeration.map((symbol) => {
                return <option key={symbol.id}>{symbol.id}</option>;
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="destinationId" className="flex-grow-1 mr-2">
          <Form.Label>Source</Form.Label>
          <Form.Control as="select">
            {modelClass &&
              Array.isArray(modelClass.enumeration) &&
              modelClass.enumeration.map((symbol) => {
                return <option key={symbol.id}>{symbol.id}</option>;
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="similarity" className="flex-shrink-1">
          <Form.Label>Similarity</Form.Label>
          <Form.Control
            type="number"
            min={0}
            max={1}
            value={similarity}
            onChnage={({ target }) => setSimilarity(target.value)}
          />
        </Form.Group>
      </div>
    </div>
  );
}
LookupTableEditor.defaultProps = {
  modelClass: undefined,
  evaluator: undefined,
  originEvaluator: undefined,
  onEvaluatorChange: NOP,
};
LookupTableEditor.propTypes = {
  modelClass: PropTypes.object,
  evaluator: PropTypes.object,
  originEvaluator: PropTypes.object,
  onEvaluatorChange: PropTypes.func,
};

export default LookupTableEditor;
