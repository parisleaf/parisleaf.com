'use strict';

import React from 'react';
import Flux from 'flummox/component'
import { State } from 'react-router';
import { nestedGet } from '../utils/ImmutableUtils';
import Helmet from 'react-helmet';

import HTMLContentArea from './HTMLContentArea';
import NotFoundHandler from './NotFoundHandler';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import SiteContainer from './SiteContainer';
import TitleSection from './TitleSection';

import { color } from '../theme';

let PageHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun({ state }) {
      let { flux, params } = state;
      let PageActions = flux.getActions('pages');

      return PageActions.getPageBySlug(params.slug);
    }
  },

  render() {
    let { slug } = this.getParams();

    return (
      <Flux key={slug} connectToStores={{
        pages: store => ({
          page: store.getPageBySlug(slug)
        })
      }}>
        <SinglePage pathname={this.getPathname()} />
      </Flux>
    );
  },

});

let SinglePage = React.createClass({
  render() {
    let { page, pathname } = this.props;

    // TODO: better not-found message
    if (!page) {
      return (
        <NotFoundHandler navColor={color('text')} />
      );
    }

    let titleTag = nestedGet(page, 'meta', 'yoast_wpseo_title') || nestedGet(page, 'title');
    titleTag += " | Parisleaf, A Florida Branding & Digital Agency";
    let title = page.get('title');
    let subtitle = nestedGet(page, 'meta', 'subtitle');

    return (
      <article>
        <Helmet
          title={titleTag}
          meta={[
            {"name": "description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"name": "keywords", "content": nestedGet(page, 'meta', 'yoast_wpseo_metakeywords')},
            {"property": "og:description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"property": "og:image", "content": nestedGet(page, 'featured_image', 'source') || ""},
            {"property": "og:title", "content": titleTag},
            {"property": "og:type", "content": "article"},
            {"property": "og:url", "content": "https://parisleaf.com"+pathname},
            {"property": "article:author", "content": ""},
            {"property": "article:published_time", "content": ""},
            {"property": "article:modified_time", "content": ""},
          ]} />
        <TitleSection title={title} subtitle={subtitle} />
        <SiteContainer breakAll padAll>
          <HTMLContentArea html={page.get('content')} />
        </SiteContainer>
      </article>
    );
  }
});

export default PageHandler;
