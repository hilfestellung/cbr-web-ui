import React, { useState, useEffect, useCallback } from 'react';

import debounce from 'lodash/debounce';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Symbol from '../../../components/Symbol';
import { PropTypes } from '../../../propTypes';
import { useSelector, useDispatch } from 'react-redux';
import { ClassesSelector } from '../../../modules/classes';
import { RANGE5 } from '../../../utils/generators';
import { ObjectAction } from '../../../modules/objects/actions';
import globals from '../../../globals';

function transform(aggregateObject) {
  const result = {};
  aggregateObject.attributes.forEach((attribute) => {
    if (attribute.value)
      result[attribute.id] = attribute.value.id || attribute.value;
  });
  return result;
}

function toAggregateObject(source) {
  return Object.keys(source).map((id) => {
    return {
      id,
      value: source[id],
    };
  });
}

function retrieve(queryObject) {
  // eslint-disable-next-line no-undef
  return fetch(`${globals.apiBaseUrl}/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: toAggregateObject(queryObject) }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return { count: 0, cases: [] };
    });
}

const COL_WIDTH = 100 / 7;

function ObjectEditor({ aggregateClass, aggregateObject }) {
  const dispatch = useDispatch();
  const classes = useSelector(ClassesSelector.getItems);

  // const retrievalResult = useRef({ count: 0, cases: [] });

  const [editableObject, setEditableObject] = useState();
  const [retrievalResult, setRetrievalResult] = useState();

  const addCase = useCallback(() => {
    dispatch(ObjectAction.addObject(toAggregateObject(editableObject)));
  }, [editableObject]);

  const executeRetrieve = useCallback(
    debounce((queryObject) => {
      (async () => {
        setRetrievalResult(await retrieve(queryObject));
      })();
    }, 300),
    [setRetrievalResult]
  );

  useEffect(() => {
    if (aggregateObject) {
      setEditableObject(transform(aggregateObject));
    } else {
      setEditableObject({});
    }
  }, [aggregateObject, setEditableObject]);

  useEffect(() => {
    if (editableObject != null) {
      executeRetrieve(editableObject);
    }
  }, [editableObject]);

  return (
    <Table bordered>
      <thead>
        <tr>
          <th style={{ width: COL_WIDTH * 2 + '%' }}></th>
          {RANGE5.map((num) => (
            <th key={`case_${num}`} style={{ width: COL_WIDTH }}>
              Case {num + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Similarity</td>
          {RANGE5.map((num) => {
            const currentCase =
              retrievalResult &&
              retrievalResult.cases &&
              retrievalResult.cases[num];
            return (
              <td key={`case_${num}`} className="text-right">
                {currentCase
                  ? (currentCase.similarity * 100).toFixed(2) + '%'
                  : null}
              </td>
            );
          })}
        </tr>
        {aggregateClass &&
          Array.isArray(aggregateClass.attributes) &&
          aggregateClass.attributes.map((attribute) => {
            const modelClass = classes.find(
              (clazz) => clazz.id === attribute.type
            );
            const elementClass = modelClass.elementType
              ? classes.find((clazz) => clazz.id === modelClass.elementType)
              : null;
            return (
              <tr key={attribute.id}>
                <td>
                  <Form.Group as={Row} controlId={`${attribute.id}AttributeId`}>
                    <Form.Label column xs={4}>
                      <Symbol data={attribute} />
                    </Form.Label>
                    <Col xs={8}>
                      {modelClass.type === 'string' && (
                        <Form.Control
                          as="select"
                          value={editableObject[attribute.id] || ''}
                          onChange={({ target }) =>
                            setEditableObject({
                              ...editableObject,
                              [attribute.id]: target.value,
                            })
                          }
                        >
                          <option>-</option>
                          {modelClass &&
                            Array.isArray(modelClass.enumeration) &&
                            modelClass.enumeration.map((entry) => (
                              <option
                                key={entry.id}
                                value={entry.id}
                                title={entry.id}
                              >
                                {entry.id}
                              </option>
                            ))}
                        </Form.Control>
                      )}
                      {modelClass.type === 'set' && (
                        <Form.Control
                          as="select"
                          value={editableObject[attribute.id] || ''}
                          onChange={({ target }) => {
                            console.log(
                              Array.from(target.selectedOptions).map(
                                (opt) => opt.value
                              )
                            );
                            return setEditableObject({
                              ...editableObject,
                              [attribute.id]: Array.from(
                                target.selectedOptions
                              ).map((opt) => opt.value),
                            });
                          }}
                          multiple
                        >
                          {elementClass &&
                            Array.isArray(elementClass.enumeration) &&
                            elementClass.enumeration.map((entry) => (
                              <option
                                key={entry.id}
                                value={entry.id}
                                title={entry.id}
                              >
                                {entry.id}
                              </option>
                            ))}
                        </Form.Control>
                      )}
                      {modelClass.type !== 'string' &&
                        modelClass.type !== 'set' && (
                          <Form.Control
                            type={
                              modelClass.type === 'integer' ||
                              modelClass.type === 'float'
                                ? 'number'
                                : 'text'
                            }
                            value={editableObject[attribute.id] || ''}
                            onChange={({ target }) =>
                              setEditableObject({
                                ...editableObject,
                                [attribute.id]: target.value,
                              })
                            }
                          />
                        )}
                    </Col>
                  </Form.Group>
                </td>
                {RANGE5.map((num) => {
                  const currentCase =
                    retrievalResult &&
                    retrievalResult.cases &&
                    retrievalResult.cases[num]
                      ? transform(retrievalResult.cases[num].aggregate)
                      : null;
                  return (
                    <td key={`case_${num}`} className="text-right">
                      {currentCase ? (
                        <Symbol data={currentCase[attribute.id]} />
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        <tr>
          <td className="d-flex justify-content-end">
            <Button onClick={addCase}>Add as case</Button>
          </td>
          {RANGE5.map((num) => (
            <td key={'last_' + num}></td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}
ObjectEditor.propTypes = {
  aggregateClass: PropTypes.object,
  aggregateObject: PropTypes.object,
};

export default ObjectEditor;
