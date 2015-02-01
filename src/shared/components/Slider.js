/**
 * Slider
 */

'use strict';

import React from 'react';

var Slider = React.createClass({
  getInitialState: function() {
    return {

      // Index of current slide, starting from 1
      currentSlide: 1,
    };
  },

  getDefaultProps: function() {
    return {
      overflow: 'hidden',
    };
  },

  render: function() {
    var style = {
      overflow: this.props.overflow,
      height: '100%',
    };

    var containerStyle = {
      width: `${this.getTotalSlides() * 100}%`,
      height: '100%'
    };

    return (
      <div className={this.props.className} style={style}>
        <div ref="slideContainer" style={containerStyle}>
          {this.slides()}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    this.slideContainerNode = this.refs.slideContainer.getDOMNode();
  },

  componentDidUpdate: function(prevProps, prevState) {
    var self = this;
    require('velocity-animate');
    var totalSlides = this.getTotalSlides();

    if (this.state.currentSlide !== prevState.currentSlide) {
      Velocity(self.slideContainerNode, {
        translateX: `${((self.state.currentSlide - 1) / totalSlides) * -100}%`,
      }, {
        queue: false,
      });
    }
  },

  next: function() {
    var totalPanels = this.getTotalSlides();
    var next;

    if (this.state.currentSlide === totalPanels) {
      next = 1;
    }
    else {
      next = this.state.currentSlide + 1;
    }

    this.setState({currentSlide: next});
  },

  previous: function() {
    var totalPanels = this.getTotalSlides();
    var previous;

    if (this.state.currentSlide === 1) {
      previous = totalPanels;
    }
    else {
      previous = this.state.currentSlide - 1;
    }

    this.setState({currentSlide: previous});
  },

  slides: function() {
    var totalSlides = this.getTotalSlides();
    var width = `${100 / totalSlides}%`;

    return React.Children.map(this.props.children, function(child) {
      var key = child.props.key;

      return (
        <Slide key={key} width={width}>{child}</Slide>
      );
    });
  },

  getTotalSlides: function() {
    return React.Children.count(this.props.children);
  }

});

var Slide = React.createClass({

  render: function() {
    var style = {
      display: 'inline-block',
      width: this.props.width,
      height: '100%'
    };

    return (
      <div style={style}>{this.props.children}</div>
    );
  }

});

module.exports = Slider;
