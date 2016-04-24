// ACF options route
'use strict';

import { wpRequest } from './WP';
import wp from './WP';
import request from 'superagent';


export default function(app) {
  app.get('/api/options', function *() {
    this.set('Cache-Control', 'max-age=604800');
    this.set('Vary', 'Accept-Encoding');

    let options = yield wpRequest('/acf/options').exec();

    // go fetch actual post data iff post_type == post
    options = options.body;
    let processedOptions = yield Object.keys(options).map(async function(key) {
      if(options[key].post_type === 'post') {
        let slug = options[key].post_name;
        let post = await wp.posts().slug(slug).get(); // fetch correct formatted version of data
        return {[key] : post[0]};
      } else {
        return options[key];
      }
    });
    this.body = processedOptions;
  });
}
