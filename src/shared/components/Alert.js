import React, { Component } from 'react';
import SuitCSS from 'react-suitcss';

export default class Alert extends Component {
  render() {
    return (
      <SuitCSS
        componentName="Alert"
        modifiers={['success', 'failure']}
        {...this.props}
      />
    );
  }
}
