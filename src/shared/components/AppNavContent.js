'use strict'

import React from 'react';
import SiteContainer from './SiteContainer';
import Tweet from './Tweet';

import { color, rhythm, navBarRhythmHeight } from '../theme';

let style = {
  _: {
    backgroundColor: color('gray'),
    overflow: 'auto',
  }
};

let AppNavContent = React.createClass({

  contextTypes: {
    media: React.PropTypes.object,
  },

  render() {

    let _style = style._;

    if (this.context.media.l) {
      _style = Object.assign({
        paddingTop: rhythm(navBarRhythmHeight),
        marginTop: rhythm(navBarRhythmHeight * -1),
      }, _style);
    }

    return (
      <section className="AppNavDrawer-content" style={_style}>
        <SiteContainer>
          <Tweet id={this.props.tweets.get(0).get('id_str')} />
          <Tweet id={this.props.tweets.get(1).get('id_str')} />
        </SiteContainer>
      </section>
    );
  }

});

export default AppNavContent;
