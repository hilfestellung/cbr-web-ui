import React, { useState, useCallback, useRef, useEffect } from 'react';

import BsForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import isEqual from 'lodash/isEqual';

import { PropTypes, Children } from '../propTypes';
import Symbol from './Symbol';
import { complexClassNameBuilder } from '../utils/layout';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const FormContext = React.createContext();

function Form({ data, instantSubmit, validationRules, children, onSubmit }) {
  const formRef = useRef();
  const editableData = useRef(cloneDeep(data) || {});
  const requirements = useRef({});
  const validation = useRef({});
  const [render, setRender] = useState(false);
  const validated = useRef(false);

  const submit = useCallback(
    (event) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      validated.current = true;
      setRender(!render);
      const form = formRef.current;
      if (form.checkValidity() === false) {
        return;
      }
      onSubmit(editableData.current);
    },
    [setRender, editableData, onSubmit]
  );

  const getProperty = (path) => {
    const result = get(editableData.current, path);
    return result;
  };

  const setProperty = (path, value, initial) => {
    const newEditableData = editableData.current;
    set(newEditableData, path, value ? value : undefined);
    const rule = get(validationRules, path);
    const ruleResult = rule && rule(value);
    if (ruleResult) {
      const newValidation = validation.current;
      const newRequirements = requirements.current;
      set(newValidation, path, ruleResult.valid);
      set(newRequirements, path, ruleResult.require);
      validation.current = newValidation;
      requirements.current = newRequirements;
    }
    setTimeout(() => {
      setRender(!render);
      validated.current = false;
      if (!initial && instantSubmit) {
        submit();
      }
    });
  };

  const isValid = useCallback(
    (path) => {
      const valid = get(validation.current, path);
      return valid != null ? valid : true;
    },
    [validation]
  );

  const isRequired = useCallback(
    (path) => {
      return get(requirements.current, path);
    },
    [requirements]
  );

  useEffect(() => {
    editableData.current = cloneDeep(data);
  }, [data]);

  return (
    <BsForm
      ref={formRef}
      noValidate
      validated={validated.current}
      onSubmit={submit}
    >
      <FormContext.Provider
        value={{
          getProperty,
          setProperty,
          isValid,
          isRequired,
        }}
      >
        {children}
      </FormContext.Provider>
      {!instantSubmit && <Button type="submit">Submit</Button>}
    </BsForm>
  );
}
Form.defaultProps = {
  children: undefined,
  data: undefined,
  validationRules: {},
};
Form.propTypes = {
  children: Children,
  data: PropTypes.object,
  instantSubmit: PropTypes.bool,
  validationRules: PropTypes.object,
  onSubmit: PropTypes.func,
};

export function FormInput({ path, label, row, className, ...props }) {
  const initialized = useRef(false);
  const origin = useRef();

  return (
    <FormContext.Consumer>
      {({ getProperty, setProperty, isValid, isRequired }) => {
        const value = getProperty(path);
        const pristine = !initialized.current || isEqual(value, origin.current);
        if (!initialized.current) {
          origin.current = value;
          setProperty(path, origin.current, true);
          initialized.current = true;
        }
        const valid = isValid(path);
        const require = isRequired(path);
        const additionalProps = {};
        if (require) {
          additionalProps.required = require.required;
          if (require.range) {
            additionalProps.min = require.min;
            additionalProps.max = require.max;
          }
        }
        return (
          <BsForm.Group as={Row} controlId={path}>
            {label && (
              <BsForm.Label column xs={3}>
                {label}
              </BsForm.Label>
            )}
            <Col xs={9}>
              <BsForm.Control
                {...props}
                className={complexClassNameBuilder({
                  valid: !!valid,
                  invalid: !valid,
                  pristine,
                  required: additionalProps.required,
                  [className]: !!className,
                })}
                value={value || ''}
                onChange={({ target }) => setProperty(path, target.value)}
                {...additionalProps}
              />
              {require && require.range && (
                <BsForm.Control.Feedback type="invalid">{`Value must be in the range of ${require.min} to ${require.max}`}</BsForm.Control.Feedback>
              )}
            </Col>
          </BsForm.Group>
        );
      }}
    </FormContext.Consumer>
  );
}
FormInput.defaultProps = {};
FormInput.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string,
  label: PropTypes.string,
};
Form.Input = FormInput;

export function FormSelect({
  className,
  hasEmpty,
  options,
  path,
  label,
  row,
  multiple,
  getValue,
  getLabel,
  ...props
}) {
  const initialized = useRef(false);
  const origin = useRef();

  return (
    <FormContext.Consumer>
      {({ getProperty, setProperty, isValid, isRequired }) => {
        const value = getProperty(path);
        const pristine = !initialized.current || isEqual(value, origin.current);
        if (!initialized.current) {
          origin.current = value;
          setProperty(path, origin.current, true);
          initialized.current = true;
        }
        const valid = isValid(path);
        const require = isRequired(path);
        const additionalProps = {};
        if (require) {
          additionalProps.required = require.required;
        }
        return (
          <BsForm.Group as={Row}>
            {label && (
              <BsForm.Label column xs={3}>
                {label}
              </BsForm.Label>
            )}
            <Col xs={9}>
              <BsForm.Control
                {...props}
                as="select"
                className={complexClassNameBuilder({
                  valid: !!valid,
                  invalid: !valid,
                  pristine,
                  required: additionalProps.required,
                  [className]: !!className,
                })}
                value={getProperty(path)}
                multiple={multiple}
                onChange={({ target }) => {
                  if (multiple) {
                    setProperty(
                      path,
                      Array.from(target.selectedOptions).map((opt) => opt.value)
                    );
                  } else {
                    setProperty(path, target.value);
                  }
                }}
                {...additionalProps}
              >
                {hasEmpty && <option value="">-</option>}
                {Array.isArray(options) &&
                  options.map((opt) => {
                    return (
                      <option key={getValue(opt)} value={getValue(opt)}>
                        {getLabel(opt)}
                      </option>
                    );
                  })}
              </BsForm.Control>
            </Col>
          </BsForm.Group>
        );
      }}
    </FormContext.Consumer>
  );
}
FormSelect.defaultProps = {
  options: [],
  getValue: (opt) => opt,
  // eslint-disable-next-line react/display-name
  getLabel: (opt) => <Symbol data={opt} />,
};
FormSelect.propTypes = {
  className: PropTypes.string,
  hasEmpty: PropTypes.bool,
  options: PropTypes.array,
  path: PropTypes.string,
  label: PropTypes.string,
  getValue: PropTypes.func,
  getLabel: PropTypes.func,
};
Form.Select = FormSelect;

export default Form;
