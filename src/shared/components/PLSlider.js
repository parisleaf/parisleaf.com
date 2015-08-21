'use strict';

import React from 'react';
import Slider from './Slider';
import Dots from './SliderDots';

// Just a wrapper for the normal Slider but add click, swipe, etc

let firstTouch = false;
let lastTouch = false;

let PLSlider = React.createClass({

  nextSlide() {
    let slider = this.refs.slider;
    slider.next();
  },

  onTouchStart(event) {

  },

  onTouchMove(event) {
    if(!firstTouch)
      firstTouch = event.touches[0];

    lastTouch = event.touches[0];
  },

  onTouchEnd(event) {
    let slider = this.refs.slider;

    if(lastTouch.pageX - firstTouch.pageX > 0) {
      slider.previous();
    } else if(lastTouch.pageX - firstTouch.pageX < 0) {
      slider.next();
    }

    lastTouch = false;
    firstTouch = false;
  },

  render() {
    return(
      <div onClick={this.nextSlide} className="PLSlider" style={{height:'100%'}} onTouchStart ={this.onTouchStart} onTouchMove={this.onTouchMove}  onTouchEnd={this.onTouchEnd} >
        <Slider ref="slider" className="Slider">
          {this.props.children}
        </Slider>
      </div>
    );
  }
});

export default PLSlider;
