import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PlusSquare, Trash2Fill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { PropTypes, Children, NOP } from '../propTypes';

const ListEditorContext = React.createContext();

function ListEditor({ list, children, onAdd, onRemove }) {
  // const { t } = useTranslation();

  const names = useRef([]);
  const view = useRef();

  const [values, setValues] = useState({});
  const [rowNames, setRowNames] = useState([]);
  const [itemView, setItemView] = useState();

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
      if (names.current.indexOf(name) < 0) {
        names.current.push(name);
      }
    },
    [names]
  );

  const setView = useCallback(
    (newView) => {
      view.current = newView;
    },
    [view]
  );

  useEffect(() => {
    setRowNames(names.current);
  }, [names]);

  useEffect(() => {
    setItemView(view.current);
  }, [view]);

  return (
    <ListEditorContext.Provider value={{ values, onChange, addName, setView }}>
      {list &&
        list.map((item, index) => (
          <div key={`item_${index}`} className="d-flex">
            {itemView &&
              itemView({
                item,
                rowNames,
                index,
                isFirst: index === 0,
                isLast: index >= list.length - 1,
              })}
            <div>
              <Button
                variant="outline-danger"
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
          <Button variant="outline-primary" type="button" onClick={add}>
            <PlusSquare />
          </Button>
        </div>
      </div>
    </ListEditorContext.Provider>
  );
}
ListEditor.defaultProps = {
  onAdd: NOP,
  onRemove: NOP,
};
ListEditor.propTypes = {
  children: Children,
  list: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

ListEditor.Input = function ListEditorInput({ name, className, style }) {
  // const { t } = useTranslation();

  return (
    <ListEditorContext.Consumer>
      {({ values, onChange, addName }) => {
        addName(name);
        return (
          <Form.Group
            controlId={`${name}Id`}
            className={className}
            style={style}
          >
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
ListEditor.Input.defaultProps = {
  className: null,
  style: null,
};
ListEditor.Input.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

ListEditor.Select = function ListEditorSelect({
  name,
  list,
  className,
  hasEmptyEntry,
  style,
}) {
  // const { t } = useTranslation();

  return (
    <ListEditorContext.Consumer>
      {({ values, onChange, addName }) => {
        addName(name);
        return (
          <Form.Group
            controlId={`${name}Id`}
            className={className}
            style={style}
          >
            <Form.Control
              as="select"
              value={values[name] || ''}
              onChange={({ target }) => onChange(name, target.value)}
            >
              {hasEmptyEntry && <option>-</option>}
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
ListEditor.Select.defaultProps = {
  className: null,
  style: null,
};
ListEditor.Select.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

ListEditor.View = function ListEditorView({ children }) {
  // const { t } = useTranslation();
  const renderView = useCallback(() => {
    return (props) => {
      return React.Children.map(children, (child) =>
        React.cloneElement(child, props)
      );
    };
  }, []);
  return (
    <ListEditorContext.Consumer>
      {({ setView }) => {
        setView(renderView);
        return null;
      }}
    </ListEditorContext.Consumer>
  );
};
ListEditor.View.defaultProps = { className: null };
ListEditor.View.propTypes = {
  children: PropTypes.any,
};

ListEditor.ViewItem = function ListEditorViewItem({
  name,
  item,
  index,
  isFirst,
  isLast,
  children,
}) {
  return (
    <ListEditorContext.Consumer>
      {() => {
        return (
          children &&
          children({ name, value: item[name], index, isFirst, isLast })
        );
      }}
    </ListEditorContext.Consumer>
  );
};
ListEditor.ViewItem.defaultProps = { className: null };
ListEditor.ViewItem.propTypes = {
  name: PropTypes.string,
  children: PropTypes.func,
  item: PropTypes.any,
  value: PropTypes.any,
  index: PropTypes.number,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default ListEditor;
