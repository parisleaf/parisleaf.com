'use strict';

import React from 'react';
import Swiper from './Swiper';
import Button from './Button';
import SvgIcon from './SvgIcon';
import { color, rhythm } from '../theme';

let { assign } = Object;

let style = {
  swiper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },

  arrowButton: {
    position: 'absolute',
    bottom: rhythm(1),
    zIndex: 9999999999, // FIXME: move to theme
  },

  leftArrowButton: {
    left: rhythm(1),
  },

  rightArrowButton: {
    right: rhythm(1),
  },

  arrow: {
    fill: '#fff',
    width: rhythm(2),
    height: rhythm(2),
  }
};

let Slider = React.createClass({

  componentDidMount() {
    this.swiper = this.refs.swiper.swiper;
  },

  nextSlide(e) {
    e.preventDefault(e);
    this.swiper.slideNext();
  },

  previousSlide(e) {
    e.preventDefault();
    this.swiper.slidePrev();
  },

  render() {
    let { style: wrapperStyle, ...props } = this.props;

    wrapperStyle = assign({}, style.wrapper, wrapperStyle);

    let leftArrowStyle = assign({}, style.arrow);
    let rightArrowStyle = assign({}, style.arrow);

    return (
      <div style={wrapperStyle} onClick={this.handleSlidePositionChange}>
        <Swiper {...props} style={style.swiper} ref="swiper" />
        <Button
          style={assign({}, style.arrowButton, style.leftArrowButton)}
          onClick={this.previousSlide}
        >
          <SvgIcon name="left-arrow" style={leftArrowStyle} />
        </Button>
        <Button
          style={assign({}, style.arrowButton, style.rightArrowButton)}
          onClick={this.nextSlide}
        >
          <SvgIcon name="right-arrow" style={rightArrowStyle} />
        </Button>
      </div>
    );
  }

});

function noop() {}

export default Slider;
