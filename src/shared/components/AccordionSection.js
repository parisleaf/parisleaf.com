'use strict';

import React from 'react';
import MediaMixin from 'react-media-mixin';
import tweenState from 'react-tween-state';

import AccordionVideo from './AccordionVideo';
import Button from './Button';
import Header from './Header';
import Focuspoint from './Focuspoint';

import { zIndex, rhythm } from '../theme';
import isiOS7 from '../isiOS7';

let AccordionSection = React.createClass({
  mixins: [MediaMixin, tweenState.Mixin],

  getInitialState() {
    return {
      hover: false,
      playing: false,
      videoVisibility: 0,
      drawerVisibility: 0,
    };
  },

  componentDidMount() {
    require('velocity-animate');
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.playing !== prevState.playing) {

      if (this.state.playing && !this.state.media.m) {
        Velocity(this.getDOMNode(), 'scroll');
      }

      this.tweenState('videoVisibility', {
        duration: 350,
        endValue: this.state.playing ? 1 : 0,
        onEnd: () => this.refs.video[this.state.playing ? 'play' : 'pause'](),
      })
    }

    if (this.drawerIsVisible() !== this.drawerIsVisible(prevState)) {
      this.tweenState('drawerVisibility', {
        duration: 350,
        endValue: this.drawerIsVisible() ? 1 : 0,
      })
    }
  },

  onMouseEnter() {
    this.setState({hover: true});
  },

  onMouseLeave() {
    this.setState({hover: false});
  },

  play() {
    this.setState({playing: true});
  },

  pause() {
    this.setState({playing: false});
  },

  onButtonClick() {
    this.play();
  },

  onVideoPlayEnd() {
    this.pause();
  },

  drawerIsVisible(state = this.state) {
    return !this.state.media.l || state.hover;
  },

  render() {
    const {sectionData, totalSections, ...props} = this.props;

    let videoVisibility = this.getTweeningValue('videoVisibility');
    let drawerVisibility = this.getTweeningValue('drawerVisibility');

    let style = {
      position: 'relative',
      overflow: 'hidden',
    };

    if (this.state.media.l) {
      style.minWidth = `${videoVisibility * 100}vw`;
    } else {
      style.minHeight = !isiOS7()
        ? `${videoVisibility * 100}vh`
        : rhythm(16);
    }

    let videoStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: zIndex('AppOverlay', -3),
    };

    let imageStyle = {
      position: 'absolute',
      opacity: 1 - videoVisibility,
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: zIndex('AppOverlay', -2),
    }

    let contentStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      opacity: 1 - videoVisibility,
      zIndex: videoVisibility === 1
        ? zIndex('AppOverlay', -4)
        : zIndex('AppOverlay', 0),
    };

    let textStyle = {
      zIndex: zIndex('AppOverlay', 1),
      position: 'absolute',
      bottom: 0,
      width: this.state.media.l
        ? `${100 / totalSections}vw`
        : '100%',
    };

    let drawerStyle = {
      opacity: this.state.media.l
        ? drawerVisibility
        : 1,
      height: this.state.media.l
        ? rhythm(8 * drawerVisibility)
        : 'auto',
      overflow: 'hidden',
    };

    return (
      <section
        className="Accordion-section"
        style={style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div
          style={contentStyle}
          ref="content"
          className="Accordion-section-content"
        >
          <div className="Accordion-section-content-background" />
          <div ref="imageContainer">
            <Focuspoint
              className="Accordion-section-content-image"
              style={imageStyle}
              src={sectionData.accordionImageSrc}
              imageW={parseFloat(sectionData.accordionImageWidth)}
              imageH={parseFloat(sectionData.accordionImageHeight)}
              focusX={parseFloat(sectionData.accordionImageFocusX)}
              focusY={parseFloat(sectionData.accordionImageFocusY)}
            />
          </div>
          <div className="Accordion-section-content-text" style={textStyle}>
            <Header level={3} className="Accordion-section-content-title" bold>{sectionData.accordionTitle}</Header>
            <div className="Accordion-section-content-text-drawerContainer">
              <div
                className="Accordion-section-content-text-drawer"
                ref="drawer"
                style={drawerStyle}
              >
                <p className="Accordion-section-content-description">{sectionData.accordionDescription}</p>
                <Button
                  className="Accordion-section-content-button"
                  secondaryLight
                  block={this.state.media.l}
                  onClick={this.onButtonClick}>
                  Watch
                </Button>
              </div>
            </div>
          </div>
        </div>
        <AccordionVideo
          ref="video"
          style={videoStyle}
          onPlayEnd={this.onVideoPlayEnd}
        >
          {this.props.children}
        </AccordionVideo>
      </section>
    );
  },

});

export default AccordionSection;
