import React, { useCallback, useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { PropTypes, NOP } from '../../propTypes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SubmittableControl from '../../components/SubmittableControl';

const parsers = {
  integer: (input) => parseInt(input, 10),
  float: (input) => parseFloat(input),
  date: (input) => new Date(input).toISOString().replace('Z', ''),
};

function toValue(input, type, defaultValue) {
  if (!parsers[type]) {
    throw new Error(
      `"${type}" is not a valid base type for use with the range editor.`
    );
  }
  const value = parsers[type](input);
  if (value != null && (type === 'date' || !isNaN(value))) {
    return value.toString();
  }
  return defaultValue;
}

function RangeEditor({ originModelClass, modelClass, onClassChange }) {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const minChange = useCallback(
    (value) => {
      const newClass = {
        ...modelClass,
        range: {
          ...modelClass.range,
          min: { id: toValue(value, modelClass.type, min) },
        },
      };
      onClassChange(newClass);
    },
    [min, modelClass, onClassChange]
  );
  const maxChange = useCallback(
    (value) => {
      const newClass = {
        ...modelClass,
        range: {
          ...modelClass.range,
          max: { id: toValue(value, modelClass.type, max) },
        },
      };
      onClassChange(newClass);
    },
    [max, modelClass, onClassChange]
  );

  useEffect(() => {
    return () => {
      setMin('');
      setMax('');
    };
  }, []);

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
    console.log('Class is new set', modelClass);
  }, [modelClass, setMin, setMax]);

  return (
    <>
      <Form.Group as={Row} controlId="rangeMinId" className="">
        <Form.Label column xs={2}>
          Minimum
        </Form.Label>
        <Col xs={10}>
          <SubmittableControl
            type={modelClass.type === 'date' ? 'datetime-local' : 'number'}
            origin={toValue(
              originModelClass.range &&
                originModelClass.range.min &&
                originModelClass.range.min.id,
              originModelClass.type,
              undefined
            )}
            value={min}
            onChange={minChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="rangeMaxId" className="">
        <Form.Label column xs={2}>
          Maximum
        </Form.Label>
        <Col xs={10}>
          <SubmittableControl
            type={modelClass.type === 'date' ? 'datetime-local' : 'number'}
            origin={toValue(
              originModelClass.range &&
                originModelClass.range.max &&
                originModelClass.range.max.id,
              originModelClass.type,
              undefined
            )}
            value={max}
            onChange={maxChange}
          />
        </Col>
      </Form.Group>
    </>
  );
}
RangeEditor.defaultProps = {
  originModelClass: undefined,
  modelClass: undefined,
  onClassChange: NOP,
};
RangeEditor.propTypes = {
  originModelClass: PropTypes.object,
  modelClass: PropTypes.object,
  onClassChange: PropTypes.func,
};

export default RangeEditor;
