'use strict';

import isNode from 'detect-node';

let _isInitialRender = true;

if (isNode) _isInitialRender = true;

export default function isInitialRender() {
  return _isInitialRender;
}

export function didInitialRender() {
  _isInitialRender = false;
}
