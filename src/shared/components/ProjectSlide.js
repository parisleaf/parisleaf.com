'use strict';

import React from 'react';
import Header from './Header';
import Button from './Button';
import AppLink from './AppLink';
import SiteContainer from './SiteContainer';
import { nestedGet } from '../utils/ImmutableUtils';
import VerticalCenter from './VerticalCenter';
import theme from '../theme';

let style = {
  _: {
    background: 'black',
    backgroundSize: 'cover',

  },
  
  container: {
    height: '100%', // for VerticalCenter
  },

  header: {
    marginTop: theme.rhythm(-2),
  }
};

// Need the background image as prop, the tagline, url to the project
// Just pass in a project

let ProjectSlide = React.createClass({ 
  render() {

    let tagline = nestedGet(this.props.project, 'meta', 'tagline');
    let backgroundImage = nestedGet(this.props.project, 'featured_image', 'source');
    let url = nestedGet(this.props.project, 'link');

    if(backgroundImage) {
      style._ = Object.assign(
        style._,
        { backgroundImage: `url(${backgroundImage})`}
      );
    }

    return(
      <div className="ProjectSlide" style={style._}>
        <SiteContainer style={style.container}>
          <VerticalCenter style={style.container}>
            <div className="ProjectSlide-header" style={style.header}>
              <Header level={1}>{tagline}</Header>
            </div>
          </VerticalCenter>
          <div className="ProjectSlide-buttonContainer">
            <div className="ProjectSlide-buttonContainer-project">
              <Button component={AppLink} to={url} primaryLight>
                Read the Case Study
              </Button>
            </div>
            <div className="ProjectSlide-buttonContainer-all">
              <Button component={AppLink} to={'/work'} secondaryLight>
                See All Work
              </Button>
            </div>
          </div>
        </SiteContainer>
      </div>
    );
  } 
});

export default ProjectSlide;
