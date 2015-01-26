'use strict';

import React from 'react';

let style = {
  parent: {
    display: 'table',
    width: '100%',
  },

  child: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
};

let VerticalCenter = React.createClass({

  render() {
    let { children, ...props } = this.props;

    let parentStyle = Object.assign(this.props.style, style.parent);

    let childStyle = Object.assign({
      display: 'table-cell',
      verticalAlign: 'middle',
    }, style.child);
    
    return (
      <div {...props} style={parentStyle}>
        <div style={childStyle}>
          {children}
        </div>
      </div>
    );
  }

});

export default VerticalCenter;
