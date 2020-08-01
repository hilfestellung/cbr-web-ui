import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

import { PropTypes, NOP } from '../../../propTypes';
import SymmetricTable from './SymmetricTable';

function LookupTableEditor({ modelClass, evaluator, onEvaluatorChange }) {
  const [mode, setMode] = useState();

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
          onChange={({ target }) =>
            onEvaluatorChange({ ...evaluator, mode: target.value })
          }
        >
          <option value="Symmetric">Symmetric</option>
          <option value="Asymmetric">Asymmetric</option>
        </Form.Control>
      </Form.Group>
      <SymmetricTable
        data={modelClass.enumeration}
        symmetric={mode === 'Symmetric'}
        evaluator={evaluator}
        onChange={onEvaluatorChange}
      />
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
