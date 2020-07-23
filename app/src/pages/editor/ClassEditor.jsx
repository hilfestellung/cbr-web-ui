import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ClassesSelector } from '../../modules/classes';
import SimplePage from '../../components/layout/SimplePage';
import AggregateEditor from './AggregateEditor';

function ClassEditor() {
  const { id } = useParams();

  const classes = useSelector(ClassesSelector.getItems);

  const [modelClass, setModelClass] = useState();

  useEffect(() => {
    if (classes) {
      setModelClass(classes.find((entry) => entry.id === id));
    }
  }, [id, classes]);

  if (modelClass) {
    return (
      <SimplePage>
        {modelClass.type === 'aggregate' ? (
          <AggregateEditor aggregate={modelClass} />
        ) : null}
      </SimplePage>
    );
  }
  return null;
}

export default ClassEditor;
