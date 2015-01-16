'use strict';

import React from 'react';
import theme from '../theme';

let style = {
  fontFamily: theme.fontFamily('vollkorn'),
  fontStyle: 'italic',
  color: theme.color('gray'),
  fontSize: theme.fontSize('h3')
}

let Metadata = React.createClass({
  render() {
    return (
      <span className="Metadata" style={style} >{ this.props.children }</span>
    );
  }
});

export default Metadata;
