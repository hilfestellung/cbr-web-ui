import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Diagram3 } from 'react-bootstrap-icons';

import Button from 'react-bootstrap/Button';

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
          <Route path="/editor/class/:id">
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
                <Button variant="primary">Submit</Button>
                <Button variant="secondary">Submit</Button>
                <Button variant="success">Submit</Button>
                <Button variant="warning">Submit</Button>
                <Button variant="danger">Submit</Button>
                <Button variant="info">Submit</Button>
                <Button variant="light">Submit</Button>
                <Button variant="dark">Submit</Button>
                <Button variant="link">Submit</Button>
              </div>
            </InformationWhatsNext>
          </Route>
        </Switch>
      }
    ></Workspace>
  );
}

export default Classes;
