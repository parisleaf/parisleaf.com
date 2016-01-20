'use strict';

module.exports = () => {
  if (typeof navigator !== 'undefined') {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i);
  }
  else {
    return true;
  }
}
