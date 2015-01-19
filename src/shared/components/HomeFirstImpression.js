'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import ViewportContainer from 'react-viewport';
import Header from './Header'
import Button from './Button';
import AppLink from './AppLink';
import { color, rhythm, fontFamily, fontSize, navBarRhythmHeight } from '../theme';

let style = {
  _: {
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
    background: '#fff',
    minHeight: '100vh',
  },

  helloZone: {
    padding: `${rhythm(2)} 0`,
  },

  helloZoneContent: {
    width: '100%',
  },

  featuredZone: {
    padding: `${rhythm(2)} 0`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
  },

  featuredZoneContent: {
    width: `100%`,
    color: '#fff',
    textAlign: 'center',
  },

  helloZoneText: {
    // Yellow line
    borderLeft: `${rhythm(1/4)} solid ${color('yellow')}`,
    paddingLeft: `${rhythm(1)}`,
  },

};

let HomeFirstImpression = React.createClass({

  render() {
    let { page, project } = this.props;

    let title, subtitle;

    if (page) {
      let meta = page.get('meta');
      title = meta.get('first_impression_title');
      subtitle = meta.get('first_impression_subtitle');
    }

    let projectTagline, projectFeaturedImage;

    if (project) {
      if (project.get('meta')) {
        projectTagline = project.get('meta').get('tagline');
      }

      if (project.get('featured_image')) {
        projectFeaturedImage = project.get('featured_image').get('source');
      }
    }

    let featuredZoneStyle = style.featuredZone;

    if (projectFeaturedImage) {
      featuredZoneStyle = Object.assign({
        backgroundImage: `url(${projectFeaturedImage})`,
      }, featuredZoneStyle);
    }

    return (
      <ViewportContainer className="Home-firstImpression" style={style._}>
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
          <div style={style.featuredZoneContent}>
            <SiteContainer>
              {projectTagline && <Header level={2}>{projectTagline}</Header>}
              <Button component={AppLink} to="/blog/hello-world" callToAction>
                Find out more
              </Button>
            </SiteContainer>
          </div>
        </section>
      </ViewportContainer>
    );
  }

});

export default HomeFirstImpression;
