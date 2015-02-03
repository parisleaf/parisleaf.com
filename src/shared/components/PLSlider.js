'use strict';

import React from 'react';
import Slider from './Slider';

// Just a wrapper for the normal Slider but add click, swipe, etc
let PLSlider = React.createClass({

  nextSlide() {
    let slider = this.refs.slider;
    slider.next();
  },
 
  render() {
    return(
      <div className="PLSlider" onClick={this.nextSlide}>
        <Slider ref="slider" >
            {this.props.children}
        </Slider>
      </div>
    );
  }
});

export default PLSlider;
