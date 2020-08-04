import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { ClassesSelector } from '../../../modules/classes';
import { EvaluatorsSelector } from '../../../modules/evaluators';
import SimplePage from '../../../components/layout/SimplePage';

import ClassEditor, { ClassEditorContext } from './ClassEditor';
import AggregateEditor from './AggregateEditor';
import EnumerationEditor from './EnumerationEditor';
import RangeEditor from './RangeEditor';

import NumberEvaluatorEditor from '../evaluator/NumberEvaluatorEditor';
import EvaluatorEditor, {
  EvaluatorEditorContext,
} from '../evaluator/EvaluatorEditor';
import NewEvaluator from '../evaluator/NewEvaluator';
import AggregateEvaluatorEditor from '../evaluator/AggregateEvaluatorEditor';
import LookupTableEditor from '../evaluator/LookupTableEditor';
import SetEditor from './SetEditor';
import SetEvaluatorEditor from '../evaluator/SetEvaluatorEditor';

function ClassEditorDispatcher() {
  const { id, evaluatorId = 'ClassDefinition' } = useParams();
  const history = useHistory();

  const classes = useSelector(ClassesSelector.getItems);
  const evaluators = useSelector(EvaluatorsSelector.getItems);

  const [modelClass, setModelClass] = useState();
  const [classEvaluators, setClassEvaluators] = useState([]);

  useEffect(() => {
    if (classes) {
      setModelClass(classes.find((entry) => entry.id === id));
    }
    if (evaluators) {
      setClassEvaluators(evaluators.filter((entry) => entry.type === id));
    }
  }, [id, classes, evaluators, modelClass, setModelClass, setClassEvaluators]);

  if (modelClass) {
    return (
      <SimplePage fluid>
        <Tabs
          className="mb-4"
          activeKey={evaluatorId}
          onSelect={(key) => history.push(`/editor/class/${id}/${key}`)}
        >
          <Tab eventKey="ClassDefinition" title="Class definition">
            <ClassEditor modelClass={modelClass}>
              <ClassEditorContext.Consumer>
                {({ originClass, editableClass, onClassChange }) => {
                  if (editableClass.id !== id) {
                    return null;
                  }
                  console.log('Editable class', id, editableClass, modelClass);
                  return editableClass.type === 'aggregate' ? (
                    <AggregateEditor
                      modelClass={editableClass}
                      onClassChange={onClassChange}
                    />
                  ) : editableClass.type === 'set' ? (
                    <SetEditor
                      modelClass={editableClass}
                      onClassChange={onClassChange}
                    />
                  ) : editableClass.type === 'string' ? (
                    <EnumerationEditor
                      modelClass={editableClass}
                      onClassChange={onClassChange}
                    />
                  ) : editableClass.type === 'integer' ||
                    editableClass.type === 'float' ||
                    editableClass.type === 'date' ? (
                    <RangeEditor
                      originModelClass={originClass}
                      modelClass={editableClass}
                      onClassChange={onClassChange}
                    />
                  ) : null;
                }}
              </ClassEditorContext.Consumer>
            </ClassEditor>
          </Tab>
          {classEvaluators.map((evaluator) => (
            <Tab
              key={evaluator.id}
              eventKey={evaluator.id}
              title={`Measure ${evaluator.id}`}
            >
              {evaluatorId === evaluator.id ? (
                <EvaluatorEditor evaluator={evaluator}>
                  <EvaluatorEditorContext.Consumer>
                    {({
                      originEvaluator,
                      editableEvaluator,
                      onEvaluatorChange,
                    }) => {
                      return evaluator.pattern === 'aggregate' ? (
                        <AggregateEvaluatorEditor
                          modelClass={modelClass}
                          evaluator={editableEvaluator}
                          originEvaluator={originEvaluator}
                          onEvaluatorChange={onEvaluatorChange}
                        />
                      ) : evaluator.pattern === 'set' ? (
                        <SetEvaluatorEditor
                          modelClass={modelClass}
                          evaluator={editableEvaluator}
                          originEvaluator={originEvaluator}
                          onEvaluatorChange={onEvaluatorChange}
                        />
                      ) : evaluator.pattern === 'number' ? (
                        <NumberEvaluatorEditor
                          modelClass={modelClass}
                          evaluator={editableEvaluator}
                          originEvaluator={originEvaluator}
                          onEvaluatorChange={onEvaluatorChange}
                        />
                      ) : evaluator.pattern === 'lookup' ? (
                        <LookupTableEditor
                          modelClass={modelClass}
                          evaluator={editableEvaluator}
                          originEvaluator={originEvaluator}
                          onEvaluatorChange={onEvaluatorChange}
                        />
                      ) : null;
                    }}
                  </EvaluatorEditorContext.Consumer>
                </EvaluatorEditor>
              ) : null}
            </Tab>
          ))}
          <Tab eventKey="newMeasure" title="+">
            <NewEvaluator modelClass={modelClass} />
          </Tab>
        </Tabs>
      </SimplePage>
    );
  }
  return null;
}

export default ClassEditorDispatcher;
