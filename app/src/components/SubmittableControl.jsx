import React, { useRef, useEffect, useCallback, useState } from 'react';

import isEqual from 'lodash/isEqual';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { PropTypes, NOP } from '../propTypes';
import Icon from './Icon';

function SubmittableControl({
  origin,
  value,
  onChange,
  className,
  controlClassName,
  buttonClassName,
  ...props
}) {
  const controlRef = useRef();

  const [editableValue, setEditableValue] = useState(value || '');
  const [isChanging, setIsChanging] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const changeValue = useCallback(
    ({ target }) => {
      setEditableValue(target.value);
      controlRef.current.checkValidity();
    },
    [controlRef, setEditableValue]
  );

  const acceptValue = useCallback(() => {
    if (typeof onChange === 'function') {
      onChange(editableValue);
    }
  }, [editableValue, onChange]);

  useEffect(() => {
    controlRef.current.checkValidity();
  }, [controlRef]);

  useEffect(() => {
    setEditableValue(value);
  }, [value]);

  useEffect(() => {
    setIsChanging(!isEqual(value, editableValue));
  }, [value, editableValue, setIsChanging]);

  useEffect(() => {
    const newHasChanges = !isEqual(origin, value);
    setHasChanges(newHasChanges);
  }, [origin, value, setHasChanges]);

  let buttonVariant = 'outline-secondary';
  if (hasChanges || isChanging) {
    if (isChanging) {
      buttonVariant = 'warning';
    }
    if (hasChanges) {
      buttonVariant = 'success';
    }
  }

  return (
    <InputGroup className={className}>
      <FormControl
        ref={controlRef}
        className={controlClassName}
        value={editableValue}
        onChange={changeValue}
        {...props}
      />
      <InputGroup.Append>
        <Button
          variant={buttonVariant}
          className={buttonClassName}
          disabled={!isChanging}
          onClick={acceptValue}
        >
          {isChanging ? (
            <Icon name="minus" />
          ) : hasChanges ? (
            <Icon name="check" />
          ) : (
            <Icon name="dot-circle" />
          )}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
SubmittableControl.defaultProps = {
  origin: undefined,
  value: undefined,
  className: undefined,
  controlClassName: undefined,
  buttonClassName: undefined,
  onChange: NOP,
};
SubmittableControl.propTypes = {
  origin: PropTypes.any,
  value: PropTypes.any,
  className: PropTypes.string,
  controlClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  onChange: PropTypes.func,
};

export default SubmittableControl;
