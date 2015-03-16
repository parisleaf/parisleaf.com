'use strict';

import React from 'react';
import ViewportContainer from 'react-viewport';
import SiteContainer from './SiteContainer';
import Header from './Header';
import Metadata from './Metadata';
import SvgIcon from './SvgIcon';
import { nestedGet } from '../utils/ImmutableUtils';
import { getServices, getPrimaryColor } from '../utils/ProjectUtils';
import { getTermSlugs } from '../utils/PostUtils';
import { color, rhythm, navBarRhythmHeight, fontFamily } from '../theme';

let style = {
  _: {
    height: '100vh',
    marginTop: rhythm(-1 * navBarRhythmHeight),
  },

  hero: {
    paddingTop: rhythm(navBarRhythmHeight),
    backgroundColor: color('darkGray'),
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
    padding: `${rhythm(1)} 0`,
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
    let primaryColor = getPrimaryColor(project);

    let heroStyle = Object.assign({
      backgroundImage: `url(${heroImageUrl})`,
    }, style.hero);

    let heroHeaderContainerStyle = {
      borderLeftColor: primaryColor,
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
    const { project } = this.props;
    const services = nestedGet(project, 'terms', 'project_service');

    const icons = services
      .map(
        service => <ProjectServiceIcon service={service} />
      )
      .toJS();

    return (
      <div className="ProjectServiceIconContainer" style={{
        width: '100%',
      }}>
        {icons}
      </div>
    )
  }

});

const iconMapping = {
  copy: 'copy_writing',
  development: 'development',
  discovery: 'discovery',
  motion: 'motion',
  photography: 'photography',
  uiux: 'ui_ux',
  video: 'video',
  identity: 'visual_identity',
  'web-design': 'web_design',
};

const ProjectServiceIcon = React.createClass({
  render() {
    const { service } = this.props;
    const slug = service.get('slug');

    const iconName = iconMapping[slug];

    if (!iconName) return null;

    const fillColor = color('gray');

    return (
      <div className="ProjectServiceIcon" style={{
        textAlign: 'center',
        padding: `0 ${rhythm(1/2)}`,
      }}>
        <SvgIcon name={iconName} style={{
          height: rhythm(1),
          width: rhythm(1),
          margin: `${rhythm(1/2)} 0`,
          fill: fillColor,
        }}/>
        <p style={{
          margin: 0,
          color: fillColor,
          fontFamily: fontFamily('vollkorn'),
          fontStyle: 'italic',
        }}>{service.get('name')}</p>
      </div>
    )
  }
});

export default ProjectFirstImpression;
