import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Tasks from '../../Container/Tasks';
import DetailTask from '../DetailTask/DetailTask';

const Router = () => (
  <div>
    <Switch>
      <Route path="/tasks/:id" exact component={DetailTask} />
      <Route path="/" component={Tasks} />
    </Switch>
  </div>
);
export default Router;
