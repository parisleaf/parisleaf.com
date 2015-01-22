'use strict';

import React from 'react';
import ViewportContainer from 'react-viewport';
import SiteContainer from './SiteContainer';
import Header from './Header';
import Metadata from './Metadata';
import { nestedGet } from '../utils/ImmutableUtils';
import { getServices } from '../utils/ProjectUtils';
import { color, rhythm, navBarRhythmHeight, fontFamily } from '../theme';

let style = {
  _: {
    minHeight: '100vh',
    marginTop: rhythm(-1 * navBarRhythmHeight),
  },

  hero: {
    paddingTop: rhythm(navBarRhythmHeight),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
  },

  heroContent: {
    width: '100%',
  },

  services: {
    fontFamily: fontFamily('alrightBlack'),
    marginLeft: '0.5em',
  },

  footer: {
    padding: `${rhythm(1.5)} 0`,
    textAlign: 'center',
    backgroundColor: color('lightGray'),
  },
};

let ProjectFirstImpression = React.createClass({

  render() {
    let { project } = this.props;

    let projectMeta = nestedGet(project, 'meta');
    let heroImageUrl = nestedGet(projectMeta, 'hero_image', 'sizes', 'large')
      || nestedGet(projectMeta, 'hero_image', 'url');

    let heroStyle = Object.assign({
      backgroundImage: `url(${heroImageUrl})`,
    }, style.hero);

    let heroHeaderContainerStyle = {
      borderLeftColor: color('pink'),
    };

    return (
      <ViewportContainer style={style._} className="ProjectFirstImpression">
        <div style={heroStyle} className="ProjectFirstImpression-hero">
          <SiteContainer style={style.heroContent}>
            <header className="BorderContainer" style={heroHeaderContainerStyle}>
              <Header level={1}>{project.get('title')}</Header>
              <Header level={2}>{nestedGet(projectMeta, 'tagline')}</Header>
            </header>
          </SiteContainer>
        </div>
        <div style={style.footer} className="ProjectFirstImpression-footer">
          <SiteContainer>
            {this.serviceMeta()}
          </SiteContainer>
        </div>
      </ViewportContainer>
    );
  },

  serviceMeta() {
    let { project } = this.props;
    let services = getServices(project);

    if (!services.length) return null;

    return (
      <p>
        <Metadata>Services: </Metadata>
        <span style={style.services}>{services.join(', ')}</span>
      </p>
    );
  }

});

export default ProjectFirstImpression;
