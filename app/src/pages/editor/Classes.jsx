import React from 'react';

import Workspace from '../../components/layout/Workspace';

import ClassesList from './ClassesList';
import { Route, Switch } from 'react-router-dom';
import ClassEditor from './ClassEditor';

function Classes() {
  return (
    <Workspace
      left={<ClassesList />}
      right={<div>Content Hallo</div>}
      content={
        <Switch>
          <Route path="/editor/class/:id">
            <ClassEditor />
          </Route>
        </Switch>
      }
    ></Workspace>
  );
}

export default Classes;
