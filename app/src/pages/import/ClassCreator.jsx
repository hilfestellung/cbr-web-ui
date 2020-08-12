import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import uniqBy from 'lodash/uniqBy';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { classFactory } from '@hilfestellung/cbr-kernel';

import {
  createStringComparator,
  createNumberComparator,
} from '../../utils/sort';
import { ClassesSelector, ClassesAction } from '../../modules/classes';
import { determineMinMax } from './utils';

const stringComparator = createStringComparator();

ClassCreator.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.array,
};
function ClassCreator({ names, values }) {
  const dispatch = useDispatch();
  const classes = useSelector(ClassesSelector.getItems);

  const [columnIndex, setNameIndex] = useState('0');
  const [name, setName] = useState('');
  const [range, setRange] = useState({
    min: '',
    max: '',
  });
  const [type, setType] = useState('string');
  const [possibleValues, setPossibleValues] = useState([]);

  const selectName = useCallback(
    (index) => {
      setNameIndex(index);
      setName(names[index]);
    },
    [names, setName, setNameIndex, setPossibleValues]
  );

  const submit = useCallback(
    (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      const newClass = { id: name, type };
      if (type === 'string') {
        newClass.enumeration = possibleValues.map((value) => ({
          id: value,
        }));
      } else {
        newClass.range = { min: { id: range.min }, max: { id: range.max } };
      }
      const found = classes.find((modelClass) => modelClass.id === name);
      if (found) {
        dispatch(ClassesAction.putClass(classFactory(newClass).toJSON()));
      } else {
        dispatch(ClassesAction.addClass(classFactory(newClass).toJSON()));
      }
    },
    [name, type, possibleValues, range, classes]
  );

  useEffect(() => {
    setName(names[columnIndex]);
    setPossibleValues(
      uniqBy(values, (row) => row[columnIndex])
        .map((row) => row[columnIndex])
        .sort(stringComparator)
    );
  }, [columnIndex, values, setPossibleValues]);

  useEffect(() => {
    if (type === 'integer' || type === 'float') {
      setRange(determineMinMax(possibleValues));
    }
  }, [type, possibleValues, setRange]);

  return (
    <Form onSubmit={submit}>
      {Array.isArray(names) && names.length > 0 && (
        <>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Properties</Form.Label>
                <Form.Control
                  as="select"
                  value={columnIndex}
                  onChange={({ target }) => selectName(target.value)}
                >
                  {names.map((name, index) => (
                    <option key={name} value={index}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name || ''}
                  onChange={({ target }) => setName(target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={({ target }) => setType(target.value)}
                >
                  <option value="string">string</option>
                  <option value="integer">integer</option>
                  <option value="float">float</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </>
      )}
      {Array.isArray(possibleValues) &&
      possibleValues.length > 0 &&
      type === 'string' ? (
        <Form.Group>
          <Form.Label>Possible values</Form.Label>
          <Form.Control
            as="select"
            value={name}
            onChange={({ target }) => setNameIndex(target.value)}
          >
            {possibleValues.map((value, index) => (
              <option key={`value_${index}`} value={value}>
                {value}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      ) : type === 'integer' || type === 'float' ? (
        <>
          <Form.Group>
            <Form.Label>Minimum</Form.Label>
            <Form.Control
              type="number"
              value={range.min}
              onChange={({ target }) =>
                setRange({ ...range, min: target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Maximum</Form.Label>
            <Form.Control
              type="number"
              value={range.max}
              onChange={({ target }) =>
                setRange({ ...range, max: target.value })
              }
            />
          </Form.Group>
        </>
      ) : null}
      <Button type="submit">Create class</Button>
    </Form>
  );
}

export default ClassCreator;
