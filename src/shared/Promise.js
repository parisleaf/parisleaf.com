'use strict';

/**
 * Export global Promise. This module is used so we can override when's promise
 * shim when bundling react-router.
 * https://github.com/rackt/react-router/issues/461
 */
export default Promise;
