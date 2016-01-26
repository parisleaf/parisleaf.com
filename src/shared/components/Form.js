import React, { Component } from 'react';
import Rx, { Observable } from 'rx';
import request from 'superagent';
import serialize from 'form-serialize';

import Alert from './Alert';
import Button from './Button';
import Metadata from './Metadata';

import { ensureIsomorphicUrl } from '../utils/LinkUtils';
import { rhythm } from '../theme';

const fieldRegex = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,256}$/i
};

const Form = React.createClass({
  componentDidMount() {
    
  },

  render() {
    return (
      <div>form</div>
    )
  }
});

export default Form;
