'use strict';

import React from 'react';
import Swiper from './Swiper';

let Slider = React.createClass({

  getInitialState() {
    return {
      hasNext: false,
      hasPrevious: false,
    };
  },

  componentDidMount() {
    this.swiper = this.refs.swiper.swiper;
    this.onSlideChangeStart();
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

  onMouseEnter() {
    if (!this.props.autoplay) return;
    this.swiper.stopAutoplay();
  },

  onMouseLeave() {
    if (!this.props.autoplay) return;
    this.swiper.startAutoplay();
  },

  render() {
    let { style: wrapperStyle, ...props } = this.props;

    return (
      <Swiper
        {...props}
        ref="swiper"
        onClick={this.handleSlideClick}
        onSlideChangeStart={this.onSlideChangeStart}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />
    );
  }

});

export default Slider;
