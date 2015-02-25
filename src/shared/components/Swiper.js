'use strict';

import React from 'react';

let Swiper = React.createClass({

  componentDidMount() {
    let _Swiper = require('swiper');

    let { children, ...props } = this.props;

    this.swiper = new _Swiper(this.getDOMNode(), props);
  },

  componentDidUpdate() {
    if (!this.swiper) return;

    this.swiper.update();
  },

  componentWillUnmount() {
    if (!this.swiper) return;

    this.swiper.destroy();
  },

  render() {
    let { children, className, ...props } = this.props;

    let slides = React.Children.map(this.props.children, child => {
      return <div className="swiper-slide">{child}</div>;
    });

    let classes = ['swiper-container'];

    if (className) classes.push(className);

    return (
      <div {...props} className={classes.join(' ')}>
        <div className="swiper-wrapper">
          {slides}
        </div>
      </div>
    );
  }

});

export default Swiper;
