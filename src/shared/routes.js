'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import App from './components/App';
import PostHandler from './components/PostHandler';

let Routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="post" path="/:slug" handler={PostHandler} />
  </Route>
);

export default Routes;
