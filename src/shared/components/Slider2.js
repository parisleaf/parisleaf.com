'use strict';

import React from 'react';

let Slider = React.createClass({

  componentDidMount() {
    let Swiper = require('swiper');

    let { children, ...props } = this.props;

    this.swiper = new Swiper(this.getDOMNode(), props);
  },

  componentDidUpdate() {
    this.swiper.update();
  },

  componentWillUnmount() {
    this.swiper.destroy();
  },

  render() {
    let { children, ...props } = this.props;

    let slides = React.Children.map(this.props.children, child => {
      return <div className="swiper-slide">{child}</div>;
    });

    return (
      <div {...props} className="swiper-container">
        <div className="swiper-wrapper">
          {slides}
        </div>
      </div>
    );
  }

});

export default Slider;
