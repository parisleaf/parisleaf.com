'use strict';

function performRouteHandlerLifecyleMethod(routes, methodName, ...args) {
  for (let route of routes) {
    let method = route.handler[methodName];

    if (typeof method === 'function') method(...args);
  }
}

export default performRouteHandlerLifecyleMethod;
