'use strict';

import React from 'react';

var getDotCount = function(spec) {
  var dots;
  dots = Math.ceil(spec.slideCount);
  return dots;
};

var Dots = React.createClass({

  clickHandler: function (options, e) {
    // In Autoplay the focus stays on clicked button even after transition
    // to next slide. That only goes away by click somewhere outside
    e.preventDefault();
    this.props.clickHandler(options);
  },

  render: function () {

    var dotCount = getDotCount({
      slideCount: this.props.slideCount
    });

    var dots = Array.apply(null, {length: dotCount}).map((x, i) => {

      var className = classnames({
        'slick-active': (this.props.currentSlide === i)
      });

      var dotOptions = {
        message: 'dots',
        index: i,
        slidesToScroll: this.props.slidesToScroll,
        currentSlide: this.props.currentSlide
      };

      return (
        <button key={i} className={className}>
          <button onClick={this.clickHandler.bind(this, dotOptions)}>{i}</button>
        </button>
      );
    });

    return (
      <div className={this.props.dotsClass}>
        {dots}
      </div>
    );

  }
});

module.exports = Dots;

// <div className="PLSlider-dots">
//   <button className="PLSlider-dot" onClick={this.goToSlide}></button>
//   <button className="PLSlider-dot" onClick={this.goToSlide}></button>
//   <button className="PLSlider-dot" onClick={this.goToSlide}></button>
// </div>
