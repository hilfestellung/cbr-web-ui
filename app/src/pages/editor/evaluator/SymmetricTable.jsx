import React, { useEffect, useState, useCallback } from 'react';
import { PropTypes } from '../../../propTypes';

import Table from 'react-bootstrap/Table';

import { StringClass, lookupEvaluatorFactory } from '@hilfestellung/cbr-kernel';

import Symbol, { symbolToString } from '../../../components/Symbol';
import QuietFormControl from '../../../components/QuietFormControl';
import { useTranslation } from 'react-i18next';

const stringClass = new StringClass('builder');

function SymmetricTable({ data, evaluator, symmetric, onChange }) {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const [evaluatorInstance, setEvaluatorInstance] = useState();
  const width = 100 / 12;
  const tableWidth = Array.isArray(data) ? (data.length + 1) * width : 100;
  const handleSize = data && data.length > 11;

  const setValue = useCallback(
    (source, destination, value) => {
      const localEvaluator = evaluatorInstance.toJSON();
      if (localEvaluator.lookup[source] == null) {
        localEvaluator.lookup[source] = {};
      }
      const float = parseFloat(value);
      if (float > 0) {
        localEvaluator.lookup[source][destination] =
          float >= 0 && float <= 1 ? float : 0;
      } else {
        delete localEvaluator.lookup[source][destination];
      }
      localEvaluator.mode = symmetric ? 'Symmetric' : 'Asymmetric';
      onChange(lookupEvaluatorFactory(localEvaluator).toJSON());
    },
    [evaluatorInstance, symmetric]
  );

  useEffect(() => {
    if (evaluator) {
      setEvaluatorInstance(lookupEvaluatorFactory(evaluator));
    }
  }, [evaluator]);

  return evaluatorInstance ? (
    <div
      style={
        handleSize ? { width: '100%', height: '36rem', overflow: 'auto' } : null
      }
    >
      <Table bordered style={handleSize ? { width: tableWidth + '%' } : null}>
        <thead>
          <tr style={{ lineHeight: '1rem' }}>
            <th style={{ maxWidth: width + 'px' }}></th>
            {Array.isArray(data) &&
              data.map((entry, index) => (
                <th
                  key={`header_${index}`}
                  style={{ maxWidth: width + 'px' }}
                  className=" text-truncate"
                  title={symbolToString(entry, language)}
                >
                  <Symbol data={entry} />
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((rowEntry, index) => {
              let leftSide = symmetric;
              return (
                <tr key={`body_${index}`} style={{ lineHeight: '1rem' }}>
                  <th
                    style={{ maxWidth: width + 'px' }}
                    className=" text-truncate"
                    title={symbolToString(rowEntry, language)}
                  >
                    <Symbol data={rowEntry} />
                  </th>
                  {data.map((entry, index) => {
                    const identic = rowEntry.id === entry.id;
                    if (identic) {
                      leftSide = false;
                    }
                    return (
                      <td
                        key={`value_${index}`}
                        style={{ maxWidth: width + 'px' }}
                        className={
                          identic
                            ? 'bg-info text-light'
                            : leftSide
                            ? 'bg-light'
                            : undefined
                        }
                        title={`${symbolToString(
                          rowEntry,
                          language
                        )} -> ${symbolToString(entry, language)}`}
                      >
                        {identic ? (
                          <QuietFormControl value={1} disabled />
                        ) : (
                          <QuietFormControl
                            type="number"
                            value={
                              evaluatorInstance.evaluate(
                                stringClass.createObject(rowEntry),
                                stringClass.createObject(entry)
                              ).value
                            }
                            onChange={(value) =>
                              setValue(rowEntry.id, entry.id, value)
                            }
                            disabled={leftSide}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  ) : null;
}
SymmetricTable.defaultProps = {
  symmetric: true,
  onChange: () => undefined,
};
SymmetricTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  evaluator: PropTypes.object,
  symmetric: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SymmetricTable;
