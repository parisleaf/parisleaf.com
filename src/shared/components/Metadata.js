'use strict';

import React from 'react';
import theme from '../theme';

let Metadata = React.createClass({
  render() {
    return (
      <span
        {...this.props}
        className="Metadata"
      />
    );
  }
});

export default Metadata;
