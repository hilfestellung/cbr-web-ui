import React, { useEffect, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import { ClassesSelector, ClassesAction } from '../../../modules/classes';
import SimplePage from '../../../components/layout/SimplePage';
import Icon from '../../../components/Icon';
import { classFactory } from '@hilfestellung/cbr-kernel';

function ClassesList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id: classid } = useParams();

  const isLoading = useSelector(ClassesSelector.isLoading);
  const items = useSelector(ClassesSelector.getItems);
  const error = useSelector(ClassesSelector.getError);

  const [newClassId, setNewClassId] = useState('');
  const [newClassType, setNewClassType] = useState('aggregate');
  const [newClassValid, setNewClassValid] = useState(false);

  const addNewClass = useCallback(() => {
    dispatch(
      ClassesAction.addClass(
        classFactory({ id: newClassId, type: newClassType }).toJSON()
      )
    );
    setNewClassId('');
    setNewClassType('');
  }, [newClassId, newClassType, setNewClassId, setNewClassType, dispatch]);

  const removeClass = useCallback(
    (id) => {
      dispatch(ClassesAction.removeClass(id));
    },
    [dispatch]
  );

  const changeNewClassId = useCallback(
    ({ target }) => {
      setNewClassId(target.value);
    },
    [setNewClassId]
  );

  const changeNewClassType = useCallback(
    ({ target }) => {
      setNewClassType(target.value);
    },
    [setNewClassType]
  );

  useEffect(() => {
    setNewClassValid(!!newClassId && !!newClassType);
  }, [newClassId, newClassType]);

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
        <>
          <Form className="d-flex flex-column">
            <Form.Group as={Row} controlId="newClassId">
              <Form.Label column xs={2}>
                {t('Id')}
              </Form.Label>
              <Col xs={10}>
                <Form.Control
                  type="text"
                  value={newClassId}
                  onChange={changeNewClassId}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="newClassType">
              <Form.Label column xs={2}>
                {t('Type')}
              </Form.Label>
              <Col xs={10}>
                <Form.Control
                  as={'select'}
                  type="text"
                  value={newClassType}
                  onChange={changeNewClassType}
                >
                  <optgroup label={t('Composite')}>
                    <option value="aggrgate">{t('Aggregate')}</option>
                    <option value="set">{t('Set')}</option>
                  </optgroup>
                  <optgroup label={t('Atomic')}>
                    <option value="date">{t('Date')}</option>
                    <option value="integer">{t('Integer')}</option>
                    <option value="float">{t('Float')}</option>
                    <option value="string">{t('String')}</option>
                  </optgroup>
                </Form.Control>
              </Col>
            </Form.Group>
            <Button
              variant="outline-secondary"
              className="d-flex align-items-center justify-content-center mb-3"
              disabled={!newClassValid}
              onClick={addNewClass}
            >
              <Icon name="plus-square" />
              &nbsp;{t('Add')}
            </Button>
          </Form>
          <ListGroup>
            {items.map((item) => {
              const isActive = item.id === classid;
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
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-1 mr-3">
                      {item.type === 'aggregate' ? (
                        <Icon name="list" size={32} />
                      ) : item.type === 'string' ? (
                        <Icon name="font" size={32} />
                      ) : item.type === 'integer' || item.type === 'float' ? (
                        <Icon name="hashtag" size={32} />
                      ) : item.type === 'date' ? (
                        <Icon name="calendar-alt" size={32} />
                      ) : item.type === 'set' ? (
                        <Icon name="folder" size={32} />
                      ) : null}
                    </div>
                    <div className="flex-grow-1">
                      <div>{item.id}</div>
                      <div>
                        <small>
                          {t('Type')} <strong>{item.type}</strong>
                        </small>
                      </div>
                    </div>
                    <div className="flex-shrink-1">
                      <Button
                        variant="link"
                        className={isActive ? 'text-light' : 'text-secondary'}
                        onClick={(e) => {
                          e.preventDefault();
                          removeClass(item.id);
                        }}
                      >
                        <Icon name="trash-alt" />
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </>
      )}
    </SimplePage>
  );
}

export default ClassesList;
