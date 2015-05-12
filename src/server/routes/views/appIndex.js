'use strict';

let initialMediaState = {};

import MediaMixin from 'react-media-mixin';
MediaMixin.getInitialState = function () {
  return { media: initialMediaState };
};

import React from 'react';
import Router from 'react-router';
import routes from '../../../shared/routes';

import DocumentTitle from 'react-document-title';

import performRouteHandlerLifecyleMethod from '../../../shared/performRouteHandlerLifecyleMethod';

import userAgentToMediaState from '../../userAgentToMediaState';

import FluxComponent from 'flummox/component';
import Flux from '../../../shared/Flux';

import NavBarColor from '../../../shared/components/NavBarColor';

import { nestedGet } from '../../../shared/utils/ImmutableUtils';
import url from 'url';

export default function(app) {
  app.get(/.*/, function *() {

  const router = Router.create({
    routes: routes,
    location: this.url,
    onError: error => {
      throw error;
    },
    onAbort: abortReason => {
      const error = new Error();

      if (abortReason.constructor.name === 'Redirect') {
        const { to, params, query } = abortReason;
        const url = router.makePath(to, params, query);
        error.redirect = url;
      }

      throw error;
    }
  });

    let runResult;

    try {
      runResult = yield new Promise((resolve, reject) => {
        router.run((Handler, state) => resolve({ Handler, state }));
      });

    } catch (error) {
      if (error.redirect) {
        return this.redirect(error.redirect);
      }

      throw error;
    }

    const { Handler, state } = runResult;

    let flux = new Flux();
    let RouterActions = flux.getActions('router');
    state.flux = flux;

    RouterActions.routerWillRun(state);
    yield performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', { state, flux });

    const posts = yield performRouteHandlerLifecyleMethod(state.routes, 'getPost', { state, flux });
    let post;

    for (let key in Object.keys(posts).reverse()) {
      const p = posts[key];

      if (p) {
        post = p;
        break;
      }
    }

    // Use useragent to override react-media-mixin's initial state
    initialMediaState = userAgentToMediaState(this.headers['user-agent']);

    let appString;

    appString = React.renderToString(
      <FluxComponent flux={flux}>
        <Handler />
      </FluxComponent>
    );

    let title = DocumentTitle.rewind();
    NavBarColor.dispose();

    let initialAppState = flux.serialize();

    yield this.render('app', {
      title: nestedGet(post, 'meta', 'yoast_wpseo_title') || title,
      description: nestedGet(post, 'meta', 'yoast_wpseo_metadesc'),
      image: nestedGet(post, 'featured_image', 'guid'),
      canonicalUrl: url.resolve(this.host, this.url),
      author: nestedGet(post, 'author', 'name'),
      keywords: nestedGet(post, 'meta', 'yoast_wpseo_metakeywords'),
      publishedTime: nestedGet(post, 'date_gmt'),
      modifiedTime: nestedGet(post, 'modified_gmt'),
      appString,
      env: process.env,
      initialAppState,
      initialMediaState: JSON.stringify(initialMediaState),
    });

    initialMediaState = {};
  });
}
