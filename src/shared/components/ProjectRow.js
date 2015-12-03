'use strict';

import React from 'react';

import AppLink from './AppLink';
import Button from './Button';
import Header from './Header';

import { nestedGet } from '../utils/ImmutableUtils';

let ProjectRow = React.createClass({

  render() {
    let { project, ...props } = this.props;

    let tagline = nestedGet(project, 'meta', 'tagline');
    let featuredImageUrl = nestedGet(project, 'featured_image', 'source');

    if (!project) return <span />;

    return (
      <div className="ProjectRow ProjectRow--thin ProjectRow--spaced">
        <div className="ProjectRow-inner">
          <Button className="ProjectRow-link" component={AppLink} href={project.get('link')} />
          <div className="ProjectRow-content">
            <Header level={3} className="ProjectRow-title" dangerouslySetInnerHTML={{__html: project.get('title')}} />
            <Button
              className="ProjectRow-button"
              component={AppLink}
              to={nestedGet(this.props.project, 'link')}
              secondaryLight
            >
              See this project
            </Button>
            <div className="ProjectRow-taglineContainer">
              <Header level={2} className="ProjectRow-tagline">
                {tagline}
              </Header>
            </div>
          </div>
          <div className="ProjectRow-overlay" />
          <div className="ProjectRow-image" style={{backgroundImage: `url(${featuredImageUrl})`}} />
        </div>
      </div>
    );
  }

});

export default ProjectRow;
