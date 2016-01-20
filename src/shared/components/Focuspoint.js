'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';

const DATA_ATTR_KEYS = [
  'focusX',
  'focusY',
  'imageW',
  'imageH',
];

let Focuspoint = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    focusX: React.PropTypes.number.isRequired,
    focusY: React.PropTypes.number.isRequired,
    imageW: React.PropTypes.number,
    imageH: React.PropTypes.number,
    reCalcOnWindowResize: React.PropTypes.bool,
    throttleDuration: React.PropTypes.number,
  },

  componentDidMount() {
    require('jquery-focuspoint');
    this.focusPoint = $(this.getDOMNode())
      .focusPoint(
        this.getConfigOptions()
      )
      .data('focusPoint');
  },

  componentDidUpdate() {
    this.focusPoint.adjustFocus();
  },

  getContainerProps() {
    return Object.keys(this.props).reduce((result, key) => {
      let value = this.props[key];

      if (contains(DATA_ATTR_KEYS, key)) {
        key = camelToDashed(key);
        result[`data-${key}`] = value;
        return result;
      }

      switch (key) {
        case 'src':
          return result;
        case 'style':
          result[key] = assign({
            position: 'relative',
            overflow: 'hidden',
          }, this.props.style);
        default:
          result[key] = value;
          return result;
      }
    }, {});
  },

  getConfigOptions() {
    let options = {};

    for (let key in ['reCalcOnWindowResize', 'throttleDuration']) {
      if (this.props[key]) {
        options[key] = this.props[key];
      }
    }

    return options;
  },

  render() {
    const imageStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      margin: 0,
      display: 'block',
      width: 'auto',
      height: 'auto',
      minWidth: '100%',
      minHeight: '100%',
      maxHeight: 'none',
      maxWidth: 'none',
    };

    return (
      <div {...this.getContainerProps()}>
        <img
          src={this.props.src}
          style={imageStyle}
        />
      </div>
    );
  }
});

function contains(array, value) {
  return array.indexOf(value) !== -1;
}

function camelToDashed(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export default Focuspoint;
