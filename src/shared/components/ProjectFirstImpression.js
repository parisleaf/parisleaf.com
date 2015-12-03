'use strict';

import React from 'react';
import ViewportContainer from 'react-viewport';
import { List } from 'immutable';

import Header from './Header';
import SiteContainer from './SiteContainer';
import SvgIcon from './SvgIcon';

import { nestedGet } from '../utils/ImmutableUtils';
import { getServices } from '../utils/ProjectUtils';
import { getTermSlugs } from '../utils/PostUtils';
import { color, rhythm, fontFamily } from '../theme';

let ProjectFirstImpression = React.createClass({

  render() {
    let { project } = this.props;

    let projectMeta = nestedGet(project, 'meta');
    let heroImageUrl = nestedGet(projectMeta, 'hero_image', 'sizes', 'large')
      || nestedGet(projectMeta, 'hero_image', 'url');

    return (
      <ViewportContainer className="FirstImpressionCover">
        <div className="FirstImpressionCover-header" style={{backgroundImage: `url(${heroImageUrl})`}}>
          <SiteContainer breakAll padAll>
            <Header level={1} headline bold noMargin dangerouslySetInnerHTML={{__html: project.get('title')}} />
            <Header level={2} vollkorn noMargin dangerouslySetInnerHTML={{__html: nestedGet(projectMeta, 'tagline')}} />
          </SiteContainer>
        </div>
        <div className="FirstImpressionCover-footer">
          <SiteContainer breakAll padAll>
            {this.serviceMeta()}
          </SiteContainer>
        </div>
      </ViewportContainer>
    );
  },

  serviceMeta() {
    const { project } = this.props;
    const services = nestedGet(project, 'terms', 'project_service') || new List();

    const icons = services.map(
      (service, count) => <ProjectServiceIcon key={count} service={service}  />
    );

    return (
      <div className="FirstImpressionCover-iconWrap" style={{
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
  'print-design': 'print_design',
};

const ProjectServiceIcon = React.createClass({
  render() {
    const { service } = this.props;
    const slug = service.get('slug');
    const iconName = iconMapping[slug];
    const fillColor = color('gray');

    if (!iconName) return false;

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
