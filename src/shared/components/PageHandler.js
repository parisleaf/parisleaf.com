'use strict';

import React from 'react';
import { State } from 'react-router';

import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';
import PageHeader from './PageHeader';

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

  contextTypes: {
    flux: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    let pageStore = this.context.flux.getStore('pages');

    return {
      page: pageStore.getPageBySlug(this.getParams().slug),
    };
  },

  componentDidMount() {
    let pageStore = this.context.flux.getStore('pages');

    pageStore.addListener('change', this.pageStoreDidChange);
  },

  componentWillUnmount() {
    let pageStore = this.context.flux.getStore('pages');

    pageStore.removeListener('change', this.pageStoreDidChange);
  },

  pageStoreDidChange() {
    let pageStore = this.context.flux.getStore('pages');

    this.setState({
      page: pageStore.getPageBySlug(this.getParams().slug),
    });
  },

  render() {
    // TODO: better not-found message
    let { page } = this.state;

    if (!page) {
      return <div>Page not found</div>;
    }

    let title = page.get('title');
    let subtitle = nestedGet(page, 'meta', 'subtitle');

    return (
      <div>
        <PageHeader
          title={title}
          subtitle={subtitle}
        />
        <article>
          <SiteContainer>
            <HTMLContentArea html={page.get('content')} />
          </SiteContainer>
        </article>
      </div>
    );
  },

});

export default PageHandler;
