'use strict';

import React from 'react';

let Video = React.createClass({ 

  render() {
    return(
      <video style={style._} src={this.props.src} controls>
        {this.props.content}
      </video>
    );
  }

});

export default Video;
