'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import App from './components/App';

let Routes = (
  <Route name="app" path="/" handler={App}>
  </Route>
);

export default Routes;
