'use strict';

import React from 'react';
import chroma from 'chroma-js';
import { color } from '../theme';
import PLSlider from './PLSlider';

let HTMLContentArea = React.createClass({
  componentDidMount() {
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

    //React.render(<Slider />, slider);
    //sliders.map(function(slider) {
      // create react component
      // render to element
    //  React.render(<Slider />, slider);
    //});
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
            background-color: ${primaryColor || none};
            color: ${primaryTextColor}
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

});

export default HTMLContentArea;
