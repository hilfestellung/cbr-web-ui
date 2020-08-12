import React, { useState, useEffect, useCallback } from 'react';

import debounce from 'lodash/debounce';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Symbol, { symbolToString } from '../../../components/Symbol';
import { PropTypes } from '../../../propTypes';
import { useSelector, useDispatch } from 'react-redux';
import { ClassesSelector } from '../../../modules/classes';
import { RANGE5 } from '../../../utils/generators';
import { ObjectAction } from '../../../modules/objects/actions';

import globals from '../../../globals';
import Form from '../../../components/Form';
import { useTranslation } from 'react-i18next';
import { createValidationRules } from './utils';
import { useAuth0 } from '@auth0/auth0-react';

function createSample(aggregateClass) {
  if (aggregateClass && Array.isArray(aggregateClass.attributes)) {
    return {
      attributes: aggregateClass.attributes.map((attr) => ({
        id: attr.id,
        value: undefined,
      })),
    };
  }
  return { attributes: [] };
}

function retrieve(queryObject, facets) {
  // eslint-disable-next-line no-undef
  return fetch(`${globals.apiBaseUrl}/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: queryObject, options: { facets } }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return { count: 0, cases: [] };
    });
}

const COL_WIDTH = 100 / 7;

function ObjectExplorer({ aggregateClass }) {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const { isAuthenticated } = useAuth0();

  const classes = useSelector(ClassesSelector.getItems);

  const dispatch = useDispatch();

  const [aggregateObject, setAggregateObject] = useState(
    createSample(aggregateClass)
  );

  const [retrievalResult, setRetrievalResult] = useState();

  const addCase = useCallback(() => {
    dispatch(ObjectAction.addObject(aggregateObject.attributes));
  }, [aggregateObject]);

  const executeRetrieve = useCallback(
    debounce((queryObject) => {
      (async () => {
        setRetrievalResult(
          await retrieve(
            queryObject,
            aggregateClass.attributes.map((attribute) => ({ id: attribute.id }))
          )
        );
      })();
    }, 300),
    [aggregateClass, setRetrievalResult]
  );

  const [validationRules, setValidationRules] = useState({});

  useEffect(() => {
    const rules = createValidationRules(aggregateClass, classes);
    setAggregateObject(createSample(aggregateClass));

    setValidationRules(rules);
  }, [aggregateClass, classes]);

  return (
    <Form
      data={aggregateObject}
      onSubmit={(event) => {
        const { attributes } = event;
        executeRetrieve(attributes.filter((entry) => !!entry.value));
        setAggregateObject({ ...aggregateObject, attributes });
      }}
      instantSubmit
      validationRules={validationRules}
    >
      <Table bordered>
        <thead>
          <tr>
            <td style={{ width: COL_WIDTH * 2 + '%' }} className="text-right">
              {retrievalResult && retrievalResult.count > 0 ? (
                <div>
                  <strong>{retrievalResult.count}</strong> similar cases.
                </div>
              ) : null}
            </td>
            {RANGE5.map((num) => (
              <th
                key={`case_header_${num}`}
                style={{ width: COL_WIDTH + '%', maxWidth: COL_WIDTH + '%' }}
              >{`Case ${num + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Similarity</td>
            {RANGE5.map((num) => {
              const caze =
                retrievalResult &&
                retrievalResult.cases &&
                retrievalResult.cases[num];
              return (
                <td key={`case_similarity_${num}`}>
                  {caze && (caze.similarity * 100).toFixed(2) + '%'}
                </td>
              );
            })}
          </tr>
          {aggregateClass &&
            Array.isArray(aggregateClass.attributes) &&
            aggregateClass.attributes.map((attribute, index) => {
              let definition = classes.find(
                (entry) => entry.id === attribute.type
              );
              const isSet = definition.type === 'set';
              if (isSet) {
                definition = classes.find(
                  (entry) => entry.id === definition.elementType
                );
              }
              return (
                <tr key={'attribute' + index}>
                  {/* First column - contains query fields */}
                  <td>
                    {definition && definition.enumeration ? (
                      <Form.Select
                        path={`attributes.${index}.value`}
                        label={attribute.id}
                        hasEmpty={!isSet}
                        multiple={isSet}
                        options={definition.enumeration}
                        getValue={(opt) => opt.id}
                        getLabel={(opt) => symbolToString(opt, language)}
                      />
                    ) : (
                      <Form.Input
                        path={`attributes.${index}.value`}
                        label={attribute.id}
                        autoComplete="off"
                        type={
                          definition.type === 'integer' ||
                          definition.type === 'float'
                            ? 'number'
                            : 'string'
                        }
                      />
                    )}
                  </td>
                  {RANGE5.map((num) => {
                    const caze =
                      retrievalResult &&
                      retrievalResult.cases &&
                      retrievalResult.cases[num];
                    const attributeObject =
                      caze && caze.aggregate && caze.aggregate.attributes
                        ? caze.aggregate.attributes.find(
                            (entry) => entry.id === attribute.id
                          )
                        : null;
                    return (
                      <td key={`case_${num}`}>
                        {attributeObject ? (
                          <Symbol data={attributeObject.value} />
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          {isAuthenticated && (
            <tr>
              <td className="text-right">
                <Button onClick={addCase}>Add as case</Button>
              </td>
              <td colSpan="5"></td>
            </tr>
          )}
        </tbody>
      </Table>
    </Form>
  );
}
ObjectExplorer.defaultProps = {};
ObjectExplorer.propTypes = {
  aggregateClass: PropTypes.object,
};

export default ObjectExplorer;
