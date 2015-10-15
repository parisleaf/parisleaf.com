'use strict';

import React from 'react';
import Flux from 'flummox/component'
import DocumentTitle from 'react-document-title';
import { State } from 'react-router';
import { nestedGet } from '../utils/ImmutableUtils';

import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import NotFoundHandler from './NotFoundHandler';

import { color } from '../theme';

let PageHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun({ state }) {
      let { flux, params } = state;
      let PageActions = flux.getActions('pages');

      return PageActions.getPageBySlug(params.slug);
    },
  },

  render() {
    let { slug } = this.getParams();

    return (
      <Flux key={slug} connectToStores={{
        pages: store => ({
          page: store.getPageBySlug(slug)
        })
      }}>
        <SinglePage />
      </Flux>
    );
  },

});

let SinglePage = React.createClass({
  render() {
    let { page } = this.props;

    // TODO: better not-found message
    if (!page) {
      return (
        <NotFoundHandler navColor={color('text')} />
      );
    }

    let title = page.get('title');
    let subtitle = nestedGet(page, 'meta', 'subtitle');

    return (
      <article>
        <TitleSection title={title} subtitle={subtitle} />
        <SiteContainer breakAll padAll>
          <HTMLContentArea html={page.get('content')} />
        </SiteContainer>
      </article>
    );
  }
});

export default PageHandler;
