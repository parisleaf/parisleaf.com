'use strict';

async function performRouteHandlerLifecyleMethod(routes, methodName, ...args) {
  let responses = routes
    .map(route => route.handler[methodName])
    .filter(method => typeof method === 'function')
    .map(method => method(...args));

  await Promise.all(responses);
}

export default performRouteHandlerLifecyleMethod;
