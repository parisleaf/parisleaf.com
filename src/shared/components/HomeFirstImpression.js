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
import PLSlider from './PLSlider';
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
    height: '100%',
    cursor: 'pointer'
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
  sliderClick(event) {
    let clickedClass = event.target.getAttribute("class").split(" ")[0];
    if(clickedClass !== 'Button') {
      let projectSlider = this.refs.projectSlider;
      projectSlider.next();
    }
  },

  projectSlides() {
    if(typeof this.props.projects !== 'undefined' && this.props.projects.length > 0) {
      return this.props.projects.map(function(project) {
        return (<ProjectSlide ref="projectSlide" project={project} />);
      });
    }
  },

  featuredZone() {
    let featuredZoneStyle = style.featuredZone;
    if(typeof this.props.projects !== 'undefined' && this.props.projects.length > 0) {
      return(
        <section style={featuredZoneStyle} className="Home-firstImpression-featuredZone">
          <div style={style.featuredZoneContent} ref="projectSliderContainer">
            <PLSlider className="ProjectSlider" ref="projectSlider">
              {this.projectSlides()}
            </PLSlider>
          </div>
        </section>
      );
    }
  },

  render() {
    let { page } = this.props;
    let title = nestedGet(page, 'meta', 'first_impression_title');
    let subtitle = nestedGet(page, 'meta', 'first_impression_subtitle');

    let _style = Object.assign({}, style._);
    _style[this.context.media.m ? 'height': 'minHeight'] = '100vh';

    let featuredZoneStyle = style.featuredZone;

    return (
      <ViewportContainer className="Home-firstImpression" style={_style}>
        <section style={style.helloZone} className="Home-firstImpression-helloZone">
          <div style={style.helloZoneContent}>
            <SiteContainer>
              <div style={style.helloZoneText}>
                {title && <Header level={3}>{title}</Header>}
                {subtitle && <Header level={4}>{subtitle}</Header>}
              </div>
            </SiteContainer>
          </div>
        </section>
        { this.featuredZone() }
      </ViewportContainer>
    );
  }

});

export default HomeFirstImpression;
