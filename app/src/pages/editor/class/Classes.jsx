import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Diagram3 } from 'react-bootstrap-icons';

import Workspace from '../../../components/layout/Workspace';
import InformationWhatsNext from '../../../components/InformationWhatsNext';
import ClassesList from './ClassesList';
import ClassEditorDispatcher from './ClassEditorDispatcher';

function Classes() {
  return (
    <Workspace
      left={<ClassesList />}
      content={
        <Switch>
          <Route path={['/editor/class/:id/:evaluatorId', '/editor/class/:id']}>
            <ClassEditorDispatcher />
          </Route>
          <Route path="/editor">
            <InformationWhatsNext
              icon={<Diagram3 />}
              title={
                <h1 className="d-flex justify-content-center mt-5">
                  Wissensmodell bearbeiten
                </h1>
              }
            >
              <div className="text-info">
                <h3>
                  Starten Sie hier mit der Bearbeitung Ihres Wissensmodells
                </h3>
                <ol>
                  <li>Legen Sie die Struktur der Fälle über Aggregate fest</li>
                  <li>Beschreiben Sie die Wertebereiche für Attribute</li>
                  <li>Definieren Sie Ähnlichkeitsmaße der Wertebereiche</li>
                </ol>
              </div>
            </InformationWhatsNext>
          </Route>
        </Switch>
      }
    ></Workspace>
  );
}

export default Classes;
