'use strict';

import React from 'react';
import Flux from 'flummox/component';
import Helmet from 'react-helmet';

import PostFirstImpression from './PostFirstImpression';
import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';

import { nestedGet } from '../utils/ImmutableUtils';

const AboutHandler = React.createClass({
  statics: {
    routerWillRun({ flux }) {
      const PageActions = flux.getActions('pages');
      return PageActions.getPageBySlug('about');
    },

    routerDidRun({ state, flux }) {
      const NavActions = flux.getActions('nav');
      NavActions.setColor({ text: '#fff', background: 'rgba(0,0,0,0)' });
    }
  },

  render() {
    return (
      <Flux connectToStores={{
        pages: store => ({
          page: store.getPageBySlug('about')
        })
      }}>
        <AboutPage />
      </Flux>
    );
  }
});

const AboutPage = React.createClass({
  render() {
    const { page } = this.props;

    if (!page) return <span />;

    let titleTag = nestedGet(page, 'meta', 'yoast_wpseo_title') || nestedGet(page, 'title');
    titleTag += " | Parisleaf, A Florida Branding & Digital Agency";

    return (
      <div>
        <Helmet
          title={titleTag}
          meta={[
            {"name": "description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"name": "keywords", "content": nestedGet(page, 'meta', 'yoast_wpseo_metakeywords')},
            {"property": "og:description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"property": "og:image", "content": nestedGet(page, 'featured_image', 'source') || ""},
            {"property": "og:title", "content": titleTag},
            {"property": "og:type", "content": "article"},
            {"property": "og:url", "content": "https://parisleaf.com/about"},
            {"property": "article:author", "content": ""},
            {"property": "article:published_time", "content": ""},
            {"property": "article:modified_time", "content": ""},
          ]}
          link={[
            {"rel": "canonical", "href": "https://parisleaf.com/about"},
          ]} />
        <PostFirstImpression
          post={page}
          title="Separated, we’re raw talent."
          subtitle="Together, we’re a force."
          noMeta />
        <SiteContainer>
          <HTMLContentArea html={page.get('content')} />
        </SiteContainer>
      </div>
    );
  }
});

export default AboutHandler;
