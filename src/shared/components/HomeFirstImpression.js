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
import Slider from './Slider2';
import ProjectSlide from './ProjectSlide';

let style = {
  _: {
    background: '#fff',
  },

  helloZone: {
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
    height: '33vh',
  },

  featuredZone: {
    height: '67vh',
  },

  helloZoneText: {
    // Yellow line
    borderLeft: `${rhythm(1/4)} solid ${color('yellow')}`,
    paddingLeft: `${rhythm(1)}`,
  },

};

let HomeFirstImpression = React.createClass({

  render() {
    let { page } = this.props;
    let title = nestedGet(page, 'meta', 'first_impression_title');
    let subtitle = nestedGet(page, 'meta', 'first_impression_subtitle');

    return (
      <div className="Home-firstImpression" style={style._}>
        <ViewportContainer style={style.helloZone} className="Home-firstImpression-helloZone">
          <div style={style.helloZoneContent}>
            <SiteContainer>
              <div style={style.helloZoneText}>
                {title && <Header level={3}>{title}</Header>}
                {subtitle && <Header level={4}>{subtitle}</Header>}
              </div>
            </SiteContainer>
          </div>
        </ViewportContainer>
        <HomeProjectSlider projects={this.props.projects} />
      </div>
    );
  }

});

let HomeProjectSlider = React.createClass({

  render() {
    let slides = this.props.projects.map(project => {
      return <ProjectSlide project={project} style={{ position: 'absolute', height: '100%', width: '100%' }}/>;
    });

    return (
      <ViewportContainer style={style.featuredZone} className="Home-firstImpression-featuredZone">
        <Slider className="ProjectSlider" ref="projectSlider" style={{ height: '100%' }}>
          {slides}
        </Slider>
      </ViewportContainer>
    );
  }

});

export default HomeFirstImpression;
