'use strict';

import co from 'co';

/**
 * Prepare matched routes for `Router.run`, allowing them to fetch data as
 * necessary. Based on async-data example.
 * (https://github.com/rackt/react-router/blob/master/examples/async-data/app.js)
 * @param {Object} state - Router state with `routes` and `params` properties
 * @returns {Promise}
 */
function prepareForRun(state) {
  let { routes } = state;

  return co(function *() {
    yield routes
      .filter(route => typeof route.handler.prepareForRun === 'function')
      .map(route => route.handler.prepareForRun(state));
  });
}

export default prepareForRun;
