'use strict';

import React from 'react';

import '../constants/PostConstants';
import '../actions/PostActions';
import '../stores/PostStore';

let App = React.createClass({
  render() {
    return (
      <div className="App">Hello, Parisleaf!</div>
    );
  }
});

export default App;
