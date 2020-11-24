import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Tasks from '../../Container/Tasks';

const Router = () => (
  <div>
    <Switch>
      <Route path="/" component={Tasks} />
    </Switch>
  </div>
);
export default Router;
