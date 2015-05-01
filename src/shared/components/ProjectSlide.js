import React from 'react';
import Header from './Header';
import Button from './Button';
import ProjectCard from './ProjectCard';
import AppLink from './AppLink';
import SiteContainer from './SiteContainer';
import { nestedGet } from '../utils/ImmutableUtils';
import VerticalCenter from './VerticalCenter';
import { rhythm, color } from '../theme';
import MediaMixin from 'react-media-mixin';

let style = {
  slide: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  content: {
    position: 'relative',
    paddingTop: rhythm(2.5),
    overflow: 'hidden',
  },

  footer: {
    color: '#fff',
    paddingBottom: rhythm(2.5),
  },

  buttonWrapper: {
    margin: `${rhythm(1.5)} 0`,
  },
};

let ProjectSlide = React.createClass({
  mixins: [MediaMixin],

  render() {

    let backgroundImage = nestedGet(this.props.project, 'featured_image', 'source');

    let slideStyle = Object.assign({
      backgroundImage: `url(${backgroundImage})`,
      minHeight: !this.state.media.s ? rhythm(12) : rhythm(20),
    }, style.slide, this.props.style);

    if (!this.state.media.s) {
      slideStyle.paddingTop = rhythm(2);
    }

    return(
      <div style={slideStyle} className="ProjectSlide">
        <div style={style.overlay} />
        <section className="ProjectSlide-content" style={style.content}>
          <SiteContainer className="ProjectSlide-cardContainer">
            <ProjectCard className="ProjectSlide-card" project={this.props.project} />
          </SiteContainer>
        </section>
        {this.footer()}
      </div>
    );
  },

  footer() {
    if (!this.state.media.s) return <span />;

    let url = nestedGet(this.props.project, 'link');

    return (
      <footer className="ProjectSlide-footer" style={style.footer}>
        <SiteContainer>
          <div className="ProjectSlide-buttonContainer">
            <div style={style.buttonWrapper}>
              <Button
                component={AppLink}
                to={url}
                primaryLight
              >
                Check it out
              </Button>
            </div>
            <div style={style.buttonWrapper}>
              <Button
                component={AppLink}
                to="/work"
                secondaryLight
                style={style.secondaryButton}
              >
                See All Work
              </Button>
            </div>
          </div>
        </SiteContainer>
      </footer>
    );
  }
});

export default ProjectSlide;
