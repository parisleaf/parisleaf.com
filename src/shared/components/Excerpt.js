'use strict';

import React from 'react';
import theme from '../theme';
import assign from 'react/lib/Object.assign';

let style = {
  fontFamily: theme.fontFamily('Alright Sans'),
  fontStyle: 'italic',
  color: theme.color('darkGray'),
  fontSize: theme.fontSize('h4')
}

let Excerpt = React.createClass({
  render() {

    let combinedStyle = assign({}, this.props.style, style);

    return (
      <span 
        className="Excerpt" 
        style={combinedStyle} 
      >
        { this.props.children }
      </span>
    );
  }
});

export default Excerpt;
