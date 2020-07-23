import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
// import Col from "react-bootstrap/Spinner";
// import Row from "react-bootstrap/Spinner";
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import {
  Diagram3,
  Fonts,
  Hash,
  CalendarDate,
  Braces,
} from 'react-bootstrap-icons';

import { ClassesSelector, ClassesAction } from '../../modules/classes';
import SimplePage from '../../components/layout/SimplePage';
import Icon from '../../components/Icon';

function ClassesList() {
  const dispatch = useDispatch();
  const { id: classid } = useParams();

  const isLoading = useSelector(ClassesSelector.isLoading);
  const items = useSelector(ClassesSelector.getItems);
  const error = useSelector(ClassesSelector.getError);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(ClassesAction.fetchClasses());
    }
  }, [items, dispatch]);

  return (
    <SimplePage footer={false}>
      {isLoading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">
          <Alert.Heading>Loading classes error</Alert.Heading>
          <pre>{error.stack && error.stack.toString()}</pre>
        </Alert>
      ) : (
        <ListGroup>
          {items.map((item, index) => {
            const isActive = item.id === classid || (!classid && index === 0);
            return (
              <ListGroup.Item
                key={item.id}
                className={`${
                  isActive ? 'active ' : ''
                }list-group-item-action -${classid}- -${item.id}- ${
                  item.id.toString() === classid
                }`}
                as={Link}
                to={`/editor/class/${item.id}`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="pull-left">
                    <Icon size={32} style={{ marginRight: '8px' }}>
                      {item.type === 'aggregate' ? (
                        <Diagram3 />
                      ) : item.type === 'string' ? (
                        <Fonts />
                      ) : item.type === 'integer' || item.type === 'float' ? (
                        <Hash />
                      ) : item.type === 'date' ? (
                        <CalendarDate />
                      ) : item.type === 'set' ? (
                        <Braces />
                      ) : null}
                    </Icon>
                  </div>
                  <div className="pull-left">
                    <div>{item.id}</div>
                    <div>
                      <small>
                        Type: <strong>{item.type}</strong>
                      </small>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </SimplePage>
  );
}

export default ClassesList;
