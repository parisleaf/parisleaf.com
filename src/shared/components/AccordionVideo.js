'use strict';

import React from 'react';
import MediaMixin from 'react-media-mixin';
import tweenState from 'react-tween-state';

import Button from './Button';
import SvgIcon from './SvgIcon';

import { rhythm, zIndex } from '../theme';

let AccordionVideo = React.createClass({

  mixins: [MediaMixin, tweenState.Mixin],

  propTypes: {
    poster: React.PropTypes.string,
    onClick: React.PropTypes.func,
  },

  getInitialState() {
    return {
      playing: false,
      videoVisibility: 0,
      closeButtonVisibility: 0,
    };
  },

  componentDidMount() {
    this.player = this.refs.video.getDOMNode();
    this.player.addEventListener('ended', this.onPlayerEnd);

    this.updateVideoVisibility();
  },

  componentWillUnmount() {
    this.player.removeEventListener('ended', this.onPlayerEnd);
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.playing !== prevState.playing) {
      this.updateVideoVisibility();

      if (this.state.playing) {
        this.player.play();

        if (typeof this.props.onPlayStart === 'function') {
          this.props.onPlayStart();
        }
      }
      else {
        this.player.pause();

        if (typeof this.props.onPlayEnd === 'function') {
          this.props.onPlayEnd();
        }
      }
    }
  },

  updateVideoVisibility() {
    this.tweenState('videoVisibility', {
      endValue: this.state.playing ? 1 : 0,
    });
  },

  onMouseMove() {
    this.lastMouseMove = Date.now();

    if (this.state.playing) {
      this.tweenState('closeButtonVisibility', {
        endValue: 1,
      });

      let delayBeforeHiding = 1000;

      setTimeout(() => {
        if
        (
          (Date.now() - this.lastMouseMove) > delayBeforeHiding
          && this.state.closeButtonVisibility !== 0
        ) {
          this.tweenState('closeButtonVisibility', {
            endValue: 0,
          })
        }
      }, delayBeforeHiding);
    }
  },

  play() {
    this.setState({playing: true});
  },

  pause() {
    this.setState({playing: false});
  },

  onCloseButtonClick() {
    this.setState({ playing: !this.state.playing });
  },

  render() {
    let videoProps = Object.assign({}, this.props);
    delete videoProps.className;
    delete videoProps.poster;

    let videoVisibility = this.getTweeningValue('videoVisibility');

    let className = React.addons.classSet({
      'AccordionVideo': true,
      [this.props.className]: !!this.props.className,
    });

    let style = Object.assign({}, this.props.style, {
      position: this.props.style.position || 'relative',
      backgroundImage: this.props.poster ? `url(${this.props.poster})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    });

    let videoContainerStyle = {
      opacity: videoVisibility,
      display: videoVisibility > 0 ? 'block' : 'none',
    };

    let videoStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: zIndex('AppOverlay'),
    };

    let closeButtonVisibility = this.state.media.m
      ? this.getTweeningValue('closeButtonVisibility')
      : 1;

    let closeButtonStyle = {
      position: 'absolute',
      top: rhythm(1),
      right: rhythm(1),
      opacity: closeButtonVisibility,
      zIndex: zIndex('AppOverlay', 1),
    };

    let closeIconStyle = {
      fill: '#fff',
      width: rhythm(1.5),
      height: rhythm(1.5),
    };

    return (
      <div
        className={className}
        style={style}
        onMouseMove={this.onMouseMove}
      >
        <div
          ref="videoContainer"
          className="AccordionVideo-videoContainer"
          style={videoContainerStyle}
        >
          <video {...videoProps}
            className="AccordionVideo-video"
            style={videoStyle}
            ref="video"
            controls
          >
            {this.props.children}
          </video>
          <Button
            style={closeButtonStyle}
            onClick={this.onCloseButtonClick}
          >
            <SvgIcon name="close" style={closeIconStyle} />
          </Button>
        </div>
      </div>
    );
  }

});

export default AccordionVideo;
