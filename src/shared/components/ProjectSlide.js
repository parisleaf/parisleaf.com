'use strict';

import React from 'react';
import Header from './Header';
import Button from './Button';
import AppLink from './AppLink';
import SiteContainer from './SiteContainer';
import { nestedGet } from '../utils/ImmutableUtils';
import VerticalCenter from './VerticalCenter';
import { rhythm } from '../theme';

let style = {
  slider: {
    color: '#fff',
  }
};

let ProjectSlide = React.createClass({
  render() {

    let tagline = nestedGet(this.props.project, 'meta', 'tagline');
    let backgroundImage = nestedGet(this.props.project, 'featured_image', 'source');
    let url = nestedGet(this.props.project, 'link');

    let sliderStyle = Object.assign({
      backgroundImage: `url(${backgroundImage})`,
    }, style.slider, this.props.style);

    return(
      <VerticalCenter style={sliderStyle}>
        <SiteContainer>
          <Header level={1} style={{ marginBottom: rhythm(2) }}>{tagline}</Header>
          <Button component={AppLink} to={url} primaryLight>
            Read the case study
          </Button>
        </SiteContainer>
      </VerticalCenter>
    );
  }
});

export default ProjectSlide;
