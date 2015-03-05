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
import PageHeader from './PageHeader';

let { assign } = Object;

let style = {
  firstImpression: {
    position: 'relative',
    background: '#fff',
  },

  helloZone: {
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
  },

  helloZoneContent: {
    width: '100%',
  },
};

let HomeFirstImpression = React.createClass({

  render() {
    let { page } = this.props;
    let title = nestedGet(page, 'meta', 'first_impression_title');
    let subtitle = nestedGet(page, 'meta', 'first_impression_subtitle');

    return (
      <div className="Home-firstImpression" style={style.firstImpression}>
        <section style={style.helloZone} className="Home-firstImpression-helloZone">
          <div style={style.helloZoneContent}>
            <PageHeader title={title} subtitle={subtitle} noBorder />
          </div>
        </section>
        <HomeProjectSlider projects={this.props.projects} />
      </div>
    );
  }

});

let HomeProjectSlider = React.createClass({

  render() {
    let slides = this.props.projects.map(project => {
      return <ProjectSlide project={project} />;
    });

    return (
      <Slider
        className="Home-firstImpression-slider"
        ref="projectSlider"
        autoplay={5000}
      >
        {slides}
      </Slider>
    );
  }

});

export default HomeFirstImpression;
