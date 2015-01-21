'use strict';

import React from 'react';
import theme from '../theme';
import assign from 'react/lib/Object.assign';

let style = {
  fontFamily: theme.fontFamily('vollkorn'),
  fontStyle: 'italic',
  color: theme.color('gray'),
  fontSize: theme.fontSize('h4')
}

let Metadata = React.createClass({
  render() {

    let combinedStyle = assign({}, this.props.style, style);
    return (
      <span 
        {...this.props}
        className="Metadata" 
        style={combinedStyle} 
      >
        { this.props.children }
      </span>
    );
  }
});

export default Metadata;
