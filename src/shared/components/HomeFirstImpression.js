'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import ViewportContainer from 'react-viewport';
import Header from './Header'
import Button from './Button';
import AppLink from './AppLink';
import { color, rhythm, fontFamily, fontSize, navBarRhythmHeight } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';
import theme from '../theme';
import Slider from './Slider';
import ProjectSlide from './ProjectSlide';

let style = {
  _: {
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
    background: '#fff',
  },

  helloZoneContent: {
    width: '100%',
  },

  featuredZone: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    position: 'relative'
  },

  featuredZoneContent: {
    width: `100%`,
    color: '#fff',
    position: 'absolute',
    height: '100%'
  },

  helloZoneText: {
    // Yellow line
    borderLeft: `${rhythm(1/4)} solid ${color('yellow')}`,
    paddingLeft: `${rhythm(1)}`,
  },

};

let HomeFirstImpression = React.createClass({

  contextTypes: {
    media: React.PropTypes.object,
  },

  // Adjust slider to next position
  sliderClick() {
    let projectSlider = this.refs.projectSlider;
    projectSlider.next();
  },

  render() {
    let { page, project } = this.props;

    let title = nestedGet(page, 'meta', 'first_impression_title');
    let subtitle = nestedGet(page, 'meta', 'first_impression_subtitle');

    let projectTagline = nestedGet(project, 'meta', 'tagline');
    let projectFeaturedImage = nestedGet(project, 'featured_image', 'source');
    let projectUrl = nestedGet(project, 'link');

    let _style = Object.assign({}, style._);
    _style[this.context.media.m ? 'height': 'minHeight'] = '100vh';

    let featuredZoneStyle = style.featuredZone;

    // how to apply the featured background image to the featured zone
    /* if (projectFeaturedImage) {
       featuredZoneStyle = Object.assign({
       backgroundImage: `url(${projectFeaturedImage})`,
       }, featuredZoneStyle);
       } */
    
    return (
      <ViewportContainer className="Home-firstImpression" style={_style}>
        <section style={style.helloZone} className="Home-firstImpression-helloZone">
          <div style={style.helloZoneContent}>
            <SiteContainer>
              <div style={style.helloZoneText}>
                {title && <Header level={1}>{title}</Header>}
                {subtitle && <Header level={2}>{subtitle}</Header>}
              </div>
            </SiteContainer>
          </div>
        </section>
        <section style={featuredZoneStyle} className="Home-firstImpression-featuredZone">
          <div style={style.featuredZoneContent} onClick={this.sliderClick}>
            <Slider className="ProjectSlider" ref="projectSlider">
                <ProjectSlide project={project} />
                <ProjectSlide project={project} />
                <ProjectSlide project={project} />
            </Slider>
          </div>
        </section>
      </ViewportContainer>
    );
  }

});

export default HomeFirstImpression;
