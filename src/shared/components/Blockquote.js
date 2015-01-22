'use strict';

import React from 'react';
import theme from '../theme';

let style = {
  quote : {
    fontFamily: theme.fontFamily('vollkorn'),
    fontSize: theme.fontSize('h2'),
    fontWeight: 'bold',
    fontStyle: 'oblique',
  },
  
  speaker: {
    fontFamily: theme.fontFamily('vollkorn'),
    fontSize: theme.fontSize('h4'),
    fontStyle: 'oblique',
    color: theme.color('gray'),
    
  }
}

let Blockquote = React.createClass({ 
  render() {
    return(
      <div className="Blockquote">
        <div className="Blockquote-mark">&#8220;</div>
        <div className="Blockquote-content">
          <div className="Blockquote-content-quote" style={style.quote}>{ this.props.quote }</div>
          <div className="Blockquote-content-speaker" style={style.speaker}>&mdash; { this.props.speaker } </div>
        </div>
      </div>
    );
  }
});

export default Blockquote;
