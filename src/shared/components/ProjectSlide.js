'use strict';

import React from 'react';
import Header from './Header';
import Button from './Button';
import AppLink from './AppLink';
import SiteContainer from './SiteContainer';
import { nestedGet } from '../utils/ImmutableUtils';
import VerticalCenter from './VerticalCenter';
import { rhythm } from '../theme';

let style = {
  slider: {
    color: '#fff',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    minHeight: rhythm(20),
  },

  content: {
    paddingTop: rhythm(2.5),
    overflow: 'hidden',
  },

  footer: {
    paddingBottom: rhythm(2.5),
  },

  buttonWrapper: {
    padding: `${rhythm(1/2)} 0`,
  },
};

let ProjectSlide = React.createClass({
  render() {

    let tagline = nestedGet(this.props.project, 'meta', 'tagline');
    let backgroundImage = nestedGet(this.props.project, 'featured_image', 'source');
    let url = nestedGet(this.props.project, 'link');

    let sliderStyle = Object.assign({
      backgroundImage: `url(${backgroundImage})`,
    }, style.slider, this.props.style);

    return(
      <div style={sliderStyle} className="ProjectSlide">
        <div />
        <section className="ProjectSlide-content" style={style.content}>
          <SiteContainer>
            <Header level={1} style={{ marginBottom: rhythm(2) }}>
              {tagline}
            </Header>
          </SiteContainer>
        </section>
        <footer className="ProjectSlide-footer" style={style.footer}>
          <SiteContainer>
            <div className="ProjectSlide-buttonContainer">
              <div style={style.buttonWrapper}>
                <Button
                  component={AppLink}
                  to={url}
                  primaryLight
                  style={style.primaryButton}
                >
                  Read the case study
                </Button>
              </div>
              <div style={style.buttonWrapper}>
                <Button
                  component={AppLink}
                  to={url}
                  secondaryLight
                  style={style.secondaryButton}
                >
                  See All Work
                </Button>
              </div>
            </div>
          </SiteContainer>
        </footer>
      </div>
    );
  }
});

export default ProjectSlide;
