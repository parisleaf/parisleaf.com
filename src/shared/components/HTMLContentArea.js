'use strict';

import React from 'react';
import chroma from 'chroma-js';
import { color } from '../theme';
import PLSlider from './PLSlider';
import Video from './Video';

let HTMLContentArea = React.createClass({

  renderSliders() {
    // query selector
    let slidersObject = document.querySelectorAll('.Slider'); // Scoped correctly?

    // scope it within this dom node only // TODO
    let sliders = Array.from(slidersObject);
    // loop thru sliders
    sliders.map(function(slider) {
      let images = Array.from(slider.querySelectorAll(':scope > img'));
      
      images = images.map(function(image) {
        return (<div><img style={{maxWidth: '100%'}} src={image.src} /></div>);
      });
      
      React.render(
        <PLSlider>
          { images }
        </PLSlider>
      , slider);
     
    });
  },

  renderVideos() {
    let videos = Array.from(document.querySelectorAll('div.video-shortcode'));
    // for each
    videos.map(function(video) {
      React.render(
        <Video src={video.dataset.src} content={video.dataset.content} />,
        video      
      );
    });
    
  },

  componentDidMount() {
    this.renderSliders();
    this.renderVideos();
  },

  render() {
    let { html, primaryColor } = this.props;

    let primaryTextColor = chroma(primaryColor).luminance() < 0.5
      ? color('lightGray')
      : color('text');

    return (
      <div>
        <style>{`
          .CopyContainer--primary {
            background-color: ${primaryColor || 'none'};
            color: ${primaryTextColor}
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

});

export default HTMLContentArea;
