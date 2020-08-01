import React, { useState, useEffect, useCallback, useRef } from 'react';

import debounce from 'lodash/debounce';
import uniqueId from 'lodash/uniqueId';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { range } from '../utils/generators';
import { PropTypes, NOP } from '../propTypes';

function Slider({
  value,
  min,
  split,
  max,
  resolution,
  reverse,
  onChange,
  ...props
}) {
  const [idLower] = useState(uniqueId('RangeInputLower_'));
  const [idHigher] = useState(uniqueId('RangeInputHigher_'));
  const [ticksLower, setTicksLower] = useState(range(10, min, max));
  const [ticksHigher, setTicksHigher] = useState(range(10, min, max));
  const [lower, setLower] = useState(value);
  const [higher, setHigher] = useState(value);

  const [scaleFactorLower, setScaleFactorLower] = useState(1);
  const [scaleFactorHigher, setScaleFactorHigher] = useState(1);

  const throttledOnChange = useRef();

  const changeValueLower = useCallback(
    ({ target }) => {
      const lower = parseFloat(target.value);
      if (lower != null) {
        if (Math.abs(lower) < 1) {
          throttledOnChange.current(lower.toFixed(3));
        } else {
          throttledOnChange.current(lower);
        }
      }
      if (split != null) {
        if (lower <= split) {
          setLower(lower);
        }
      } else {
        setLower(lower);
      }
    },
    [split, throttledOnChange]
  );

  const changeValueHigher = useCallback(
    ({ target }) => {
      const higher = parseFloat(target.value);
      if (higher != null) {
        if (Math.abs(higher) < 1) {
          throttledOnChange.current(higher.toFixed(3));
        } else {
          throttledOnChange.current(higher);
        }
      }
      if (split != null) {
        if (higher >= split) {
          setHigher(higher);
        }
      } else {
        setLower(higher);
      }
    },
    [split, throttledOnChange]
  );

  useEffect(() => {
    if (split != null) {
      setScaleFactorLower((split - min) / resolution);
      setScaleFactorHigher((max - split) / resolution);
      setTicksLower(range(10, min, split));
      setTicksHigher(range(10, split, max));
    } else {
      setScaleFactorLower((max - min) / resolution);
      setTicksLower(range(10, min, max));
    }
  }, [
    min,
    max,
    resolution,
    split,
    setScaleFactorLower,
    setScaleFactorHigher,
    setTicksLower,
    setTicksHigher,
  ]);

  useEffect(() => {
    if (split != null) {
      if (value <= split) {
        setLower(value);
        setHigher(split);
      }
      if (value >= split) {
        setLower(split);
        setHigher(value);
      }
    } else {
      setLower(value);
    }
  }, [value, split, setLower, setHigher]);

  useEffect(() => {
    throttledOnChange.current = debounce(onChange, 300);
  }, [onChange, throttledOnChange]);

  return (
    <>
      <datalist id={idLower}>
        {ticksLower.map((tick) => (
          <option key={tick.toString()} value={tick} label={tick}></option>
        ))}
      </datalist>
      <datalist id={idHigher}>
        {ticksHigher.map((tick) => (
          <option key={tick.toString()} value={tick} label={tick}></option>
        ))}
      </datalist>
      <Row>
        <Col xs={split != null ? 6 : 12}>
          <Form.Control
            {...props}
            style={
              reverse
                ? {
                    transform: 'rotateY(180deg)',
                  }
                : null
            }
            type="range"
            list={idLower}
            min={min}
            max={split != null ? split : max}
            value={lower}
            step={scaleFactorLower}
            onChange={changeValueLower}
          />
        </Col>
        {split != null ? (
          <Col xs={6}>
            <Form.Control
              style={
                reverse
                  ? {
                      transform: 'rotateY(180deg)',
                    }
                  : null
              }
              type="range"
              list={idHigher}
              min={split}
              max={max}
              value={higher}
              step={scaleFactorHigher}
              onChange={changeValueHigher}
            />
          </Col>
        ) : null}
      </Row>
    </>
  );
}
Slider.defaultProps = {
  resolution: 1,
  split: undefined,
  value: 0,
  min: 0,
  max: 100,
  reverse: false,
  onChange: NOP,
};
Slider.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  split: PropTypes.number,
  max: PropTypes.number,
  resolution: PropTypes.number,
  reverse: PropTypes.bool,
  onChange: PropTypes.func,
};
export default Slider;
