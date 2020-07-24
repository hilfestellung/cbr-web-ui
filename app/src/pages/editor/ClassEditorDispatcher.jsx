import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ClassesSelector } from '../../modules/classes';
import SimplePage from '../../components/layout/SimplePage';

import ClassEditor, { ClassEditorContext } from './ClassEditor';
import AggregateEditor from './AggregateEditor';
import EnumerationEditor from './EnumerationEditor';
import RangeEditor from './RangeEditor';

function ClassEditorDispatcher() {
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
        <ClassEditor modelClass={modelClass}>
          <ClassEditorContext.Consumer>
            {({ editableClass, onClassChange }) => {
              return modelClass.type === 'aggregate' ? (
                <AggregateEditor
                  modelClass={editableClass}
                  onClassChange={onClassChange}
                />
              ) : modelClass.type === 'string' ? (
                <EnumerationEditor
                  modelClass={editableClass}
                  onClassChange={onClassChange}
                />
              ) : modelClass.type === 'integer' ||
                modelClass.type === 'float' ||
                modelClass.type === 'date' ? (
                <RangeEditor
                  modelClass={editableClass}
                  onClassChange={onClassChange}
                />
              ) : null;
            }}
          </ClassEditorContext.Consumer>
        </ClassEditor>
      </SimplePage>
    );
  }
  return null;
}

export default ClassEditorDispatcher;
