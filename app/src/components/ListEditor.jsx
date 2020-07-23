import React, { useState, useCallback, useEffect, useRef } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PlusSquare, Trash2Fill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

const ListEditorContext = React.createContext();

function ListEditor({ list, children, onAdd, onRemove }) {
  const { t } = useTranslation();

  const names = useRef([]);

  const [values, setValues] = useState({});
  const [rowNames, setRowNames] = useState([]);

  const add = useCallback(() => {
    if (typeof onAdd === 'function') {
      onAdd(values);
    }
  }, [values, onAdd]);

  const remove = useCallback(
    (index) => {
      if (typeof onRemove === 'function') {
        onRemove(index);
      }
    },
    [onRemove]
  );

  const onChange = useCallback(
    (name, value) => {
      setValues({ ...values, [name]: value });
    },
    [values, setValues]
  );

  const addName = useCallback(
    (name) => {
      console.log('Input names', names);
      if (names.current.indexOf(name) < 0) {
        names.current.push(name);
        console.log('Input names', names);
      }
    },
    [names]
  );

  useEffect(() => {
    setRowNames(names.current);
  }, [names]);

  return (
    <ListEditorContext.Provider value={{ values, onChange, addName }}>
      {list &&
        list.map((item, index) => (
          <div key={`item_${index}`} className="d-flex">
            {rowNames.map((name) => (
              <Form.Group
                key={name + ' ' + index}
                controlId={`display${name}Id`}
              >
                <Form.Control type="text" value={item[name]} disabled />
              </Form.Group>
            ))}
            <div>
              <Button
                variant="link"
                type="button"
                onClick={() => remove(index)}
              >
                <Trash2Fill />
              </Button>
            </div>
          </div>
        ))}
      <div className="d-flex">
        {children}
        <div>
          <Button variant="link" type="button" onClick={add}>
            <PlusSquare />
          </Button>
        </div>
      </div>
    </ListEditorContext.Provider>
  );
}

ListEditor.Input = function ListEditorInput({ name, className }) {
  const { t } = useTranslation();

  return (
    <ListEditorContext.Consumer>
      {({ values, onChange, addName }) => {
        addName(name);
        return (
          <Form.Group controlId={`${name}Id`} className={className}>
            <Form.Control
              type="text"
              value={values[name] || ''}
              onChange={({ target }) => onChange(name, target.value)}
            />
          </Form.Group>
        );
      }}
    </ListEditorContext.Consumer>
  );
};

ListEditor.Select = function ListEditorSelect({ name, list }) {
  const { t } = useTranslation();

  return (
    <ListEditorContext.Consumer>
      {({ values, onChange, addName }) => {
        addName(name);
        return (
          <Form.Group controlId={`${name}Id`} className="mr-2">
            <Form.Control
              as="select"
              value={values[name] || ''}
              onChange={({ target }) => onChange(name, target.value)}
            >
              {Array.isArray(list) &&
                list.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        );
      }}
    </ListEditorContext.Consumer>
  );
};

export default ListEditor;
