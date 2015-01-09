'use strict';

// Initialization
import '../shared/init';
import './init';

import React from 'react';
import Router from 'react-router';
import routes from '../shared/routes';

import prepareForRun from '../shared/prepareForRun';

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  prepareForRun(state)
    .then(() => React.render(<Handler />, document.body));
});
