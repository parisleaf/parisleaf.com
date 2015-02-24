'use strict';

import React from 'react';
import Swiper from './Swiper';
import Button from './Button';
import SvgIcon from './SvgIcon';
import { color, rhythm } from '../theme';

let { assign } = Object;

let style = {
  wrapper: {
    transition: `height 150ms ease-in-out`,
  },
};

let Slider = React.createClass({

  getDefaultProps() {
    return {
      loop: true,
    };
  },

  getInitialState() {
    return {
      hasNext: false,
      hasPrevious: false,
      currentSlideHeight: null,
    };
  },

  componentDidMount() {
    this.swiper = this.refs.swiper.swiper;

    window.addEventListener('resize', this.updateSlideHeight);

    this.onSlideChangeStart();
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSlideHeight);
  },

  nextSlide(e) {
    e.preventDefault(e);
    this.swiper.slideNext();
  },

  previousSlide(e) {
    e.preventDefault();
    this.swiper.slidePrev();
  },

  onSlideChangeStart() {
    this.setState({
      hasNext: !this.swiper.isEnd,
      hasPrevious: !this.swiper.isBeginning,
    });
  },

  currentSlide() {
    return this.swiper.slides[this.swiper.activeIndex];
  },

  onSlideChangeEnd() {
    this.updateSlideHeight();
  },

  updateSlideHeight() {
    this.setState({
      currentSlideHeight: this.currentSlide().offsetHeight,
    });
  },

  render() {
    let { style: wrapperStyle,  ...props } = this.props;

    wrapperStyle = assign({
      height: this.state.currentSlideHeight,
    }, style.wrapper, wrapperStyle);

    return (
      <div style={wrapperStyle} onClick={this.handleSlidePositionChange}>
        <Swiper
          {...props}
          style={style.swiper}
          ref="swiper"
          onSlideChangeStart={this.onSlideChangeStart}
          onSlideChangeEnd={this.onSlideChangeEnd}
        />
      </div>
    );
  }

});

function noop() {}

export default Slider;
