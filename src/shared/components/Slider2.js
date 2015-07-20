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
    if (!this.swiper) return;

    e.preventDefault(e);
    this.swiper.slideNext();
  },

  previousSlide(e) {
    if (!this.swiper) return;

    e.preventDefault();
    this.swiper.slidePrev();
  },

  onSlideChangeStart() {
    if (!this.swiper) return;

    this.setState({
      hasNext: !this.swiper.isEnd,
      hasPrevious: !this.swiper.isBeginning,
    });
  },

  currentSlide() {
    if (!this.swiper) return;

    return this.swiper.slides[this.swiper.activeIndex];
  },

  onSlideChangeEnd() {
    this.updateSlideHeight();
  },

  updateSlideHeight() {
    if (!this.swiper) return;

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

export default Slider;
