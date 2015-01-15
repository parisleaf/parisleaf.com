'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import ViewportContainer from 'react-viewport';
import Header from './Header'
import Button from './Button';
import { Link } from 'react-router';
import { color, rhythm, fontFamily, fontSize, navBarRhythmHeight } from '../theme';

let style = {
  _: {
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
    background: '#fff',
    minHeight: '100vh',
  },

  helloZone: {
    padding: `${rhythm(2)} 0`,
  },

  helloZoneContent: {
    width: '100%',
  },

  featuredZone: {
    padding: `${rhythm(2)} 0`,
    backgroundColor: color('lightBlue'),
    color: '#fff',
    textAlign: 'center',
  },

  featuredZoneContent: {
    width: `100%`,
  },

  helloZoneText: {
    // Yellow line
    borderLeft: `${rhythm(1/4)} solid ${color('yellow')}`,
    paddingLeft: `${rhythm(1)}`,
  },

};

let HomeFirstImpression = React.createClass({

  render() {
    let title, subtitle;

    if (this.props.page) {
      let meta = this.props.page.get('meta');
      title = meta.get('first_impression_title');
      subtitle = meta.get('first_impression_subtitle');
    }

    return (
      <ViewportContainer className="Home-firstImpression" style={style._}>
        <section style={style.helloZone} className="Home-firstImpression-helloZone">
          <div style={style.helloZoneContent}>
            <SiteContainer>
              <div style={style.helloZoneText}>
                {title && <Header level={1}>{title}</Header>}
                {subtitle && <Header level={2}>{subtitle}</Header>}
              </div>
            </SiteContainer>
          </div>
        </section>
        <section style={style.featuredZone} className="Home-firstImpression-featuredZone">
          <div style={style.featuredZoneContent}>
            <SiteContainer>
              <Header level={2}>We helped Scality make the transition from human to cyborg mecha-horse all in the span of two weeks.</Header>
              <Button component={Link} to="/blog/hello-world" callToAction>
                Find out more
              </Button>
            </SiteContainer>
          </div>
        </section>
      </ViewportContainer>
    );
  }

});

export default HomeFirstImpression;
