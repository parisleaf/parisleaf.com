'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import ViewportContainer from 'react-viewport';
import Header from './Header'
import Button from './Button';
import AppLink from './AppLink';
import { color, rhythm, fontFamily, fontSize, navBarRhythmHeight } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

let style = {
  _: {
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
    background: '#fff',
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

  contextTypes: {
    media: React.PropTypes.object,
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

    if (projectFeaturedImage) {
      featuredZoneStyle = Object.assign({
        backgroundImage: `url(${projectFeaturedImage})`,
      }, featuredZoneStyle);
    }

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
          <div style={style.featuredZoneContent}>
            <SiteContainer>
              {projectTagline && <Header level={2}>{projectTagline}</Header>}
              <Button component={AppLink} to={projectUrl} callToAction>
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
