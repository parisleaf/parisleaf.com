import React from 'react';
// import MediaMixin from 'react-media-mixin';

import AppLink from './AppLink';
import Button from './Button';
import Header from './Header';
import SiteContainer from './SiteContainer';
import VerticalCenter from './VerticalCenter';

import { rhythm, color } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

let ProjectSlide = React.createClass({
  // mixins: [MediaMixin],

  // getInitialState: function() {
  //   return { isHovered: false };
  // },
  //
  // slideMouseEnter() {
  //   this.setState({ isHovered: true });
  // },
  //
  // slideMouseLeave() {
  //   this.setState({ isHovered: false });
  // },

  render() {
    let slidesClasses = ['ProjectRow'];
    let backgroundImage = nestedGet(this.props.project, 'featured_image', 'source');
    let tagline = nestedGet(this.props.project, 'meta', 'tagline');
    let slideImageStyle = Object.assign({
      backgroundImage: `url(${backgroundImage})`,
      // minHeight: !this.state.media.s ? rhythm(12) : rhythm(20),
    });
    let projectLink = nestedGet(this.props.project, 'link');

    // if (!this.state.media.s) {
    //   slidesStyle.paddingTop = rhythm(2);
    // }

    // if (this.state.isHovered) {
    //   slidesClasses.push('isHovered');
    // } else {
    //   slidesClasses.filter(function(item) { return item !== 'isHovered' });
    // }

    return(
      <div className={slidesClasses.join(' ')}>
        <div className="ProjectRow-inner">
          <Button className="ProjectRow-link" component={AppLink} href={projectLink} />
          <div className="ProjectRow-content">
            <Header level={3} className="ProjectRow-title">
              {nestedGet(this.props.project, 'title')}
            </Header>
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
          <div className="ProjectRow-image" style={slideImageStyle} />
        </div>
      </div>
    );
  }
});

export default ProjectSlide;
