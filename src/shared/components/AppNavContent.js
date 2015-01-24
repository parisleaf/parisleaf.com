'use strict'

import React from 'react';
import SiteContainer from './SiteContainer';
import Tweet from './Tweet';

import { color, rhythm, navBarRhythmHeight } from '../theme';

let style = {
  _: {
    overflow: 'auto',
  }
};

let AppNavContent = React.createClass({

  render() {

    let { visibility } = this.props;

    let _style = Object.assign({
      opacity: visibility,
    }, style._);

    return (
      <section className="AppNavDrawer-content" style={_style}>
        <SiteContainer>
          <Tweet tweet={this.props.tweets.get(0)} />
          <Tweet tweet={this.props.tweets.get(1)} />
        </SiteContainer>
      </section>
    );
  }

});

export default AppNavContent;
