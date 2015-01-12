'use strict';

// Initialization
require('../shared/init');
import './init';

import React from 'react';
import Router from 'react-router';
import routes from '../shared/routes';

import prepareForRun from '../shared/prepareForRun';

Router.run(routes, Router.HistoryLocation, async function(Handler, state) {
  await prepareForRun(state);
  React.render(<Handler />, document.body);
});
