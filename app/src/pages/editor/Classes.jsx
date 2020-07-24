import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Diagram3 } from 'react-bootstrap-icons';

import Workspace from '../../components/layout/Workspace';
import InformationWhatsNext from '../../components/InformationWhatsNext';
import ClassesList from './ClassesList';
import ClassEditorDispatcher from './ClassEditorDispatcher';

function Classes() {
  return (
    <Workspace
      left={<ClassesList />}
      right={<div>Content Hallo</div>}
      content={
        <Switch>
          <Route path="/editor/class/:id">
            <ClassEditorDispatcher />
          </Route>
          <Route path="/editor">
            <InformationWhatsNext icon={<Diagram3 />}>
              <h1>Wissensmodell bearbeiten</h1>
              <p>Starten Sie hier mit der Bearbeitung Ihres Wissensmodells</p>
              <ol>
                <li>
                  Legen Sie die Struktur Ihrer Fälle mit Hilfe eines Aggregats
                  fest
                </li>
                <li>
                  Beschreiben Sie die Wertebereiche der Attribute Ihrer Fälle
                </li>
                <li>Definieren Sie Ähnlichkeitsmaße für Ihre Wertebereiche</li>
              </ol>
            </InformationWhatsNext>
          </Route>
        </Switch>
      }
    ></Workspace>
  );
}

export default Classes;
