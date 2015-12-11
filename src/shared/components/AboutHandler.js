'use strict';

import React from 'react';
import Flux from 'flummox/component';
import Helmet from 'react-helmet';

import ContactSection from './ContactSection';
import HTMLContentArea from './HTMLContentArea';
import SiteContainer from './SiteContainer';
import TitleSection from './TitleSection';

import { nestedGet } from '../utils/ImmutableUtils';

const AboutHandler = React.createClass({
  statics: {
    routerWillRun({ flux }) {
      const PageActions = flux.getActions('pages');
      return PageActions.getPageBySlug('about');
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
          ]} />
        <SiteContainer>
          <HTMLContentArea html={page.get('content')} />
        </SiteContainer>
        <ContactSection invertBottomMargin />
      </div>
    );
  }
});

export default AboutHandler;
