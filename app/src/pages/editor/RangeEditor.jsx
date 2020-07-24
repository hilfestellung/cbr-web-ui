import React, { useCallback, useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { PropTypes, NOP } from '../../propTypes';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const parsers = {
  integer: (input) => parseInt(input, 10),
  float: (input) => parseFloat(input),
  date: (input) => new Date(input),
};

function toValue(input, type, defaultValue) {
  if (!parsers[type]) {
    throw new Error(
      `"${type}" is not a valid base type for use with the range editor.`
    );
  }
  const value = parsers[type](input, 10);
  if (value != null && !isNaN(value)) {
    return value.toString();
  }
  return defaultValue;
}

function RangeEditor({ modelClass, onClassChange }) {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const minChange = useCallback(
    ({ target }) => {
      onClassChange({
        ...modelClass,
        range: {
          ...modelClass.range,
          min: { id: toValue(target.value, modelClass.type, min) },
        },
      });
    },
    [min, onClassChange]
  );
  const maxChange = useCallback(
    ({ target }) => {
      onClassChange({
        ...modelClass,
        range: { ...modelClass.range, max: { id: toValue(target.value, max) } },
      });
    },
    [max, onClassChange]
  );

  useEffect(() => {
    if (
      modelClass.range &&
      modelClass.range.min &&
      modelClass.range.min.id != null
    ) {
      setMin(modelClass.range.min.id.toString());
    } else {
      setMin('');
    }
    if (
      modelClass.range &&
      modelClass.range.max &&
      modelClass.range.max.id != null
    ) {
      setMax(modelClass.range.max.id.toString());
    } else {
      setMax('');
    }
  }, [modelClass, setMin, setMax]);

  return (
    <>
      <Form.Group as={Row} controlId="rangeMinId" className="">
        <Form.Label column xs={2}>
          Minimum
        </Form.Label>
        <Col xs={10}>
          <Form.Control type="number" value={min} onChange={minChange} />
        </Col>{' '}
      </Form.Group>
      <Form.Group as={Row} controlId="rangeMaxId" className="">
        <Form.Label column xs={2}>
          Maximum
        </Form.Label>
        <Col xs={10}>
          <Form.Control type="number" value={max} onChange={maxChange} />
        </Col>
      </Form.Group>
    </>
  );
}
RangeEditor.defaultProps = {
  modelClass: undefined,
  onClassChange: NOP,
};
RangeEditor.propTypes = {
  modelClass: PropTypes.object,
  onClassChange: PropTypes.func,
};

export default RangeEditor;
