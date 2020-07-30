import React, { useEffect, useState, useCallback } from 'react';

import styles from '../../../styles/index.scss';

import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { evaluatorFactory, IntegerObject } from '@hilfestellung/cbr-kernel';

import { range } from '../../../utils/generators';
import Slider from '../../../components/Slider';
import { PropTypes, NOP } from '../../../propTypes';

function generateData(resolution, evaluator, query) {
  const values = range(resolution, evaluator.getMin(), evaluator.getMax());
  const defaultQuery = (evaluator.getMin() + evaluator.getMax()) / 2;
  const queryObject = new IntegerObject(query != null ? query : defaultQuery);
  values.push(evaluator.getMax());
  return new Promise((resolve, reject) => {
    try {
      resolve(
        values.map((value) => [
          value,
          parseFloat(
            evaluator
              .evaluate(queryObject, new IntegerObject(value))
              .value.toFixed(3)
          ),
        ])
      );
    } catch (err) {
      reject(err);
    }
  });
}

function NumberEvaluatorEditor({
  modelClass,
  evaluator,
  originEvaluator,
  onEvaluatorChange,
}) {
  const [evaluatorInstance, setEvaluatorInstance] = useState();

  const [chart, setChart] = useState();
  const [queryPlotline, setQueryPlotline] = useState();
  const [data, setData] = useState();
  const [query, setQuery] = useState();

  const [useOrigin, setUseOrigin] = useState(evaluator.useOrigin);
  const [cyclic, setCyclic] = useState(evaluator.cyclic);
  const [origin, setOrigin] = useState(evaluator.origin || 0);
  const [interpolationIfLess, setinterpolationIfLess] = useState(
    evaluator.interpolationIfLess
  );
  const [interpolationIfMore, setinterpolationIfMore] = useState(
    evaluator.interpolationIfMore
  );
  const [equalIfLess, setequalIfLess] = useState(evaluator.equalIfLess);
  const [equalIfMore, setequalIfMore] = useState(evaluator.equalIfMore);
  const [toleranceIfLess, settoleranceIfLess] = useState(
    evaluator.toleranceIfLess
  );
  const [toleranceIfMore, settoleranceIfMore] = useState(
    evaluator.toleranceIfMore
  );
  const [linearityIfLess, setlinearityIfLess] = useState(
    evaluator.linearityIfLess
  );
  const [linearityIfMore, setlinearityIfMore] = useState(
    evaluator.linearityIfMore
  );

  const changeequalIfLess = useCallback(
    (value) => {
      setequalIfLess(value);
    },
    [setequalIfLess]
  );
  const changeequalIfMore = useCallback((value) => setequalIfMore(value), [
    setequalIfMore,
  ]);
  const changetoleranceIfLess = useCallback(
    (value) => settoleranceIfLess(value),
    [settoleranceIfLess]
  );
  const changetoleranceIfMore = useCallback(
    (value) => settoleranceIfMore(value),
    [settoleranceIfMore]
  );
  const changelinearityIfLess = useCallback(
    (value) => setlinearityIfLess(value),
    [setlinearityIfLess]
  );
  const changelinearityIfMore = useCallback(
    (value) => setlinearityIfMore(value),
    [setlinearityIfMore]
  );

  const chartSetup = useCallback(
    (chart) => {
      setChart(chart);
    },
    [setChart]
  );

  useEffect(() => {
    (async () => {
      const newEvaluator = {
        ...originEvaluator,
        min: modelClass.range.min,
        max: modelClass.range.max,
        useOrigin,
        cyclic,
        origin,
        interpolationIfLess,
        interpolationIfMore,
        equalIfLess,
        equalIfMore,
        toleranceIfLess,
        toleranceIfMore,
        linearityIfLess,
        linearityIfMore,
      };
      const newInstance = evaluatorFactory(newEvaluator);
      newInstance.setRange(modelClass.range.min.id, modelClass.range.max.id);
      setEvaluatorInstance(newInstance);
      onEvaluatorChange(newEvaluator);
    })();
  }, [
    query,
    cyclic,
    useOrigin,
    origin,
    equalIfLess,
    equalIfMore,
    toleranceIfLess,
    toleranceIfMore,
    linearityIfLess,
    linearityIfMore,
    interpolationIfLess,
    interpolationIfMore,
    originEvaluator,
    modelClass,
    setEvaluatorInstance,
    onEvaluatorChange,
  ]);

  useEffect(() => {
    (async () => {
      if (evaluatorInstance != null) {
        setData(await generateData(1000, evaluatorInstance, query));
        if (query == null) {
          setQuery(
            (evaluatorInstance.getMax() - evaluatorInstance.getMin()) / 2
          );
        }
      }
    })();
  }, [evaluatorInstance, setData]);

  useEffect(() => {
    const newInstance = evaluatorFactory(evaluator);
    newInstance.setRange(modelClass.range.min.id, modelClass.range.max.id);
    setEvaluatorInstance(newInstance);
    if (query == null && evaluatorInstance) {
      setQuery((evaluatorInstance.getMax() - evaluatorInstance.getMin()) / 2);
    }
  }, [evaluator, modelClass, setEvaluatorInstance]);

  useEffect(() => {
    if (query > 0) {
      const xAxis = chart.xAxis[0];
      xAxis.removePlotLine('queryValue');

      xAxis.addPlotLine({
        id: 'queryValue',
        color: styles.danger, // Color value
        dashStyle: 'longdashdot', // Style of the plot line. Default to solid
        value: query, // Value of where the line will appear
        width: 2, // Width of the line
        label: {
          text: 'Query value',
          align: 'left',
          y: 60,
          x: 10,
        },
      });
    }
  }, [query, queryPlotline, chart, setQueryPlotline]);

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        allowChartUpdate={true}
        options={{
          chart: {
            // type: 'area',
            height: '350px',
          },
          title: {
            text: evaluator.id,
          },
          series: [
            {
              name: modelClass.id,
              color: styles.primary,
              data,
            },
          ],
          xAxis: {
            plotLines: [
              {
                id: 'queryValue',
                color: styles.danger, // Color value
                dashStyle: 'longdashdot', // Style of the plot line. Default to solid
                value: query, // Value of where the line will appear
                width: 2, // Width of the line
                label: {
                  text: 'Query value',
                  align: 'left',
                  y: 60,
                  x: 10,
                },
              },
            ],
          },
          yAxis: {
            title: { text: 'Similarity' },
            max: 1,
          },
        }}
        callback={chartSetup}
      />
      <Row>
        <Col xs={6}>
          <Row>
            <Col xs={4}>
              <Form.Group>
                <Form.Check
                  id="useOriginId"
                  type="switch"
                  label="Use origin"
                  checked={useOrigin}
                  onChange={() => {
                    setUseOrigin(!useOrigin);
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group>
                <Form.Control
                  type="number"
                  value={origin}
                  onChange={({ target }) => setOrigin(target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group>
                <Form.Control
                  as="select"
                  value={interpolationIfLess}
                  onChange={({ target }) =>
                    setinterpolationIfLess(target.value)
                  }
                >
                  <option value="Polynom">Polynom</option>
                  <option value="Sigmoid">Sigmoid</option>
                  <option value="Root">Root</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group as={Row} controlId="tol">
            <Form.Label column xs={4}>
              Equal if less
            </Form.Label>
            <Col xs={8}>
              <Slider
                min={0}
                max={1}
                resolution={1000}
                reverse
                value={equalIfLess}
                onChange={changeequalIfLess}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="tol">
            <Form.Label column xs={4}>
              Tolerance if less
            </Form.Label>
            <Col xs={8}>
              <Slider
                min={0}
                max={1}
                resolution={1000}
                reverse
                value={toleranceIfLess}
                onChange={changetoleranceIfLess}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="tol">
            <Form.Label column xs={4}>
              Linearity if less
            </Form.Label>
            <Col xs={8}>
              <Slider
                min={0}
                split={1}
                max={5}
                resolution={1000}
                reverese
                value={linearityIfLess}
                onChange={changelinearityIfLess}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Row>
            <Col xs={4}>
              <Form.Group>
                <Form.Control
                  as="select"
                  value={interpolationIfMore}
                  onChange={({ target }) =>
                    setinterpolationIfMore(target.value)
                  }
                >
                  <option value="Polynom">Polynom</option>
                  <option value="Sigmoid">Sigmoid</option>
                  <option value="Root">Root</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group>
                <Form.Check
                  id="cyclicId"
                  type="switch"
                  label="Cyclic"
                  checked={cyclic}
                  onChange={() => {
                    setCyclic(!cyclic);
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group>
                <Form.Control
                  type="number"
                  value={query}
                  onChange={({ target }) => setQuery(target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group as={Row} controlId="tol">
            <Form.Label column xs={4}>
              Equal if more
            </Form.Label>
            <Col xs={8}>
              <Slider
                min={0}
                max={1}
                resolution={1000}
                value={equalIfMore}
                onChange={changeequalIfMore}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="tol">
            <Form.Label column xs={4}>
              Tolerance if more
            </Form.Label>
            <Col xs={8}>
              <Slider
                min={0}
                max={1}
                resolution={1000}
                value={toleranceIfMore}
                onChange={changetoleranceIfMore}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="tol">
            <Form.Label column xs={4}>
              Linearity if more
            </Form.Label>
            <Col xs={8}>
              <Slider
                min={0}
                split={1}
                max={5}
                resolution={1000}
                value={linearityIfMore}
                onChange={changelinearityIfMore}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
NumberEvaluatorEditor.defaultProps = {
  modelClass: undefined,
  evaluator: undefined,
  originEvaluator: undefined,
  onEvaluatorChange: NOP,
};
NumberEvaluatorEditor.propTypes = {
  modelClass: PropTypes.object,
  evaluator: PropTypes.object,
  originEvaluator: PropTypes.object,
  onEvaluatorChange: PropTypes.func,
};

export default NumberEvaluatorEditor;
