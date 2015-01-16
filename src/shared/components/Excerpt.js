'use strict';

import React from 'react';
import theme from '../theme';

let style = {
  fontFamily: theme.fontFamily('Alright Sans'),
  fontStyle: 'italic',
  color: theme.color('darkGray'),
  fontSize: theme.fontSize('h3')
}

let Excerpt = React.createClass({
  render() {
    return (
      <span className="Excerpt" style={style} >{ this.props.children }</span>
    );
  }
});

export default Excerpt;
