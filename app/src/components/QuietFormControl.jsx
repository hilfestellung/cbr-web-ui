import React, { useCallback, useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { PropTypes } from '../propTypes';

function QuietFormControl({ value, disabled, className, onChange, ...props }) {
  const [quiet, setQuiet] = useState(true);
  const [editableValue, setEditableValue] = useState(value || '');

  const toggleQuiet = useCallback(
    (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      setQuiet(!quiet);
    },
    [quiet, setQuiet]
  );

  const checkEnter = useCallback(
    (event) => {
      const { keyCode, type } = event;
      if (keyCode === 13 || type === 'blur') {
        if (event && event.preventDefault) {
          event.preventDefault();
        }
        if (event && event.stopPropagation) {
          event.stopPropagation();
        }
        if (typeof onChange === 'function') {
          onChange(editableValue);
        }
        toggleQuiet(event);
      }
    },
    [editableValue, onChange, toggleQuiet]
  );

  const changeValue = useCallback(
    ({ target }) => {
      setEditableValue(target.value);
    },
    [setEditableValue]
  );

  useEffect(() => {
    setEditableValue(value);
  }, [value, setEditableValue]);

  return disabled ? (
    <a
      style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
      className={className}
      {...props}
    >
      {value}
    </a>
  ) : quiet ? (
    <a
      href=""
      onFocus={toggleQuiet}
      style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
      className={className}
      {...props}
    >
      {value}
    </a>
  ) : (
    <Form.Control
      autoFocus
      value={editableValue}
      onKeyDown={checkEnter}
      onBlur={checkEnter}
      onChange={changeValue}
      className={className}
      {...props}
    />
  );
}
QuietFormControl.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default QuietFormControl;
