'use strict';

async function performRouteHandlerLifecyleMethod(routes, methodName, ...args) {
  return Promise.all(routes
    .map(route => route.handler[methodName])
    .filter(method => typeof method === 'function')
    .map(method => method(...args))
  );
}

export default performRouteHandlerLifecyleMethod;
