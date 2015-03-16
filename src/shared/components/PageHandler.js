'use strict';

import React from 'react';
import { State } from 'react-router';
import Flux from 'flummox/component'

import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

import { nestedGet } from '../utils/ImmutableUtils';

let PageHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun(state) {
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
      return <div>Page not found</div>;
    }

    let title = page.get('title');
    let subtitle = nestedGet(page, 'meta', 'subtitle');

    return (
      <article>
        <PageHeader
          title={title}
          subtitle={subtitle}
        />
        <SiteContainer>
          <HTMLContentArea html={page.get('content')} />
        </SiteContainer>
      </article>
    );
  }
});

export default PageHandler;
