import React from 'react';

import Header from './Header';

import { nestedGet } from '../utils/ImmutableUtils';
import { rhythm, fontFamily } from '../theme';

const { assign } = Object;

const style = {
  card: {
    border: `${rhythm(3/4)} solid #fff`,
  }
};

const ProjectCard = React.createClass({
  render() {
    const { project, className, ...props } = this.props;

    if (!project) return null;

    const tagline = nestedGet(project, 'meta', 'tagline');

    const cardStyle = assign({}, style.card, props.style);

    const classes = [
      'ProjectCard',
      'FlexContainer',
    ];
    if (className) classes.push(className);

    return (
      <div {...props} className={classes.join(' ')} style={cardStyle}>
        <h2 style={{
          fontFamily: fontFamily('vollkorn'),
          fontStyle: 'italic',
          fontWeight: 'normal',
          fontSize: '1.2rem',
          margin: 0,
        }}>
          {project.get('title')}
        </h2>
        <div/>
        <Header level={1}
          className="ProjectCard-tagline"
          style={{
            fontSize: '1.5rem',
          }}
        >
          {tagline}
        </Header>
      </div>
    );
  }
});

export default ProjectCard;
