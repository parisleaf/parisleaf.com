'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import AppHandler from './components/AppHandler';
import PostHandler from './components/PostHandler';

let Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <Route name="post" path="/blog/:slug" handler={PostHandler} />
  </Route>
);

export default Routes;
