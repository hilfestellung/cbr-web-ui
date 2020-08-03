import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import SimplePage from '../../components/layout/SimplePage';

import { BasicSelector } from '../../modules/basic/selectors';
import { ClassesSelector } from '../../modules/classes';
import ObjectEditor from '../editor/object/ObjectEditor';

function Explore(props) {
  const project = useSelector(BasicSelector.getProject);
  const classes = useSelector(ClassesSelector.getItems);

  const [queryClass, setQueryClass] = useState();

  useEffect(() => {
    if (project && project.queryClass) {
      const queryClass = classes.find(
        (modelClass) => modelClass.id === project.queryClass
      );
      setQueryClass(queryClass);
    }
  }, [classes, project, setQueryClass]);

  return (
    <SimplePage fluid>
      <Row>
        <Col xs={12}>
          <ObjectEditor aggregateClass={queryClass} />
        </Col>
      </Row>
    </SimplePage>
  );
}

export default Explore;
