import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { RANGE5 } from '../../utils/generators';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import { ObjectAction, ObjectSelector } from '../../modules/objects';
import { getLocalItem, setLocalItem } from '../../utils/storage';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

AggregateMapping.propTypes = {};

function AggregateMapping({ aggregateClass, names, rows }) {
  const dispatch = useDispatch();

  const addCount = useSelector(ObjectSelector.getAddCount);
  const added = useSelector(ObjectSelector.getAdded);

  const [mapping, setMapping] = useState(getLocalItem('mapping', []));

  const loadData = useCallback(() => {
    dispatch(
      ObjectAction.addObjects(
        rows.map((row) =>
          aggregateClass.attributes.map((attribute, index) => ({
            id: attribute.id,
            value: row[mapping[index]],
          }))
        )
      )
    );
  }, [aggregateClass, mapping, rows]);

  return aggregateClass ? (
    <>
      <Row className="mb-3 mt-3">
        <Col xs={6}></Col>
        <Col xs={6} className="text-right">
          <Button onClick={loadData}>Load data</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProgressBar striped variant="info" now={added} max={addCount} />
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            {Array.isArray(aggregateClass.attributes) &&
              aggregateClass.attributes.map((attribute) => (
                <th key={attribute.id}>{attribute.id}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.isArray(aggregateClass.attributes) &&
              aggregateClass.attributes.map((attribute, index) => (
                <td key={attribute.id}>
                  <Form.Control
                    as="select"
                    value={mapping[index] || ''}
                    onChange={({ target }) => {
                      const newMapping = [...mapping];
                      newMapping[index] = target.value;
                      setMapping(newMapping);
                      setLocalItem('mapping', newMapping);
                    }}
                  >
                    <option value="">-</option>
                    {names.map((name, index) => (
                      <option key={name} value={index}>
                        {name}
                      </option>
                    ))}
                  </Form.Control>
                </td>
              ))}
          </tr>
          {RANGE5.map((num) => (
            <tr key={`case_${num}`}>
              {aggregateClass &&
                rows &&
                Array.isArray(aggregateClass.attributes) &&
                aggregateClass.attributes.map((attribute, index) => (
                  <td key={attribute.id}>
                    {mapping[index] ? rows[num][mapping[index]] : '-'}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  ) : null;
}

export default AggregateMapping;
