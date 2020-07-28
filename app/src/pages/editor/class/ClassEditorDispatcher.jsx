import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
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

function ClassEditorDispatcher() {
  const { id } = useParams();

  const classes = useSelector(ClassesSelector.getItems);
  const evaluators = useSelector(EvaluatorsSelector.getItems);

  const [activeKey, setActiveKey] = useState();
  const [modelClass, setModelClass] = useState();
  const [classEvaluators, setClassEvaluators] = useState([]);

  useEffect(() => {
    if (modelClass != null && modelClass.id !== id) {
      setActiveKey('ClassDefinition');
    }
    if (classes) {
      setModelClass(classes.find((entry) => entry.id === id));
    }
    if (evaluators) {
      setClassEvaluators(evaluators.filter((entry) => entry.type === id));
    }
  }, [
    id,
    classes,
    evaluators,
    modelClass,
    setActiveKey,
    setModelClass,
    setClassEvaluators,
  ]);

  if (modelClass) {
    return (
      <SimplePage>
        <Tabs
          className="mb-4"
          activeKey={activeKey}
          onSelect={(key) => setActiveKey(key)}
        >
          <Tab eventKey="ClassDefinition" title="Class definition">
            <ClassEditor modelClass={modelClass}>
              <ClassEditorContext.Consumer>
                {({ originClass, editableClass, onClassChange }) => {
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
              eventKey={`SimilarityMeasure_${evaluator.id}`}
              title={`Measure ${evaluator.id}`}
            >
              {activeKey === `SimilarityMeasure_${evaluator.id}` ? (
                <EvaluatorEditor evaluator={evaluator}>
                  <EvaluatorEditorContext.Consumer>
                    {({
                      originEvaluator,
                      editableEvaluator,
                      onEvaluatorChange,
                    }) => {
                      return evaluator.pattern === 'number' ? (
                        <NumberEvaluatorEditor
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
