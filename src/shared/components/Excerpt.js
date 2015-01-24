'use strict';

import React from 'react';
import theme from '../theme';

let Excerpt = React.createClass({
  render() {
    return (
      <span
        {...this.props}
        className="Excerpt"
      />
    );
  }
});

export default Excerpt;
