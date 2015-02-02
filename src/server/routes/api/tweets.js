'use strict';

import T from './Twitter';

export default function(app) {
  app.get('/api/tweets', function *() {
    this.set('Cache-Control', 'max-age=30');

    if (typeof T === 'undefined') {
      throw new Error('Twitter authentication error');
    }

    let tweets = yield new Promise((resolve, reject) => {
      T.get('statuses/user_timeline', {count: '5'},  function (err, data, response) {
        resolve(data);
      });
    });
    this.body = tweets;
  });


  app.get('/api/tweets/:id', function *() {
    this.set('Cache-Control', 'max-age=2400');

    if (typeof T === 'undefined') {
      throw new Error('Twitter authentication error');
    }

    let tweets = yield new Promise((resolve, reject) => {
      T.get('statuses/show/:id', { id: this.params.id }, function(err, data, response) {
        resolve(data);
      });
    });

    this.body = tweets;
  });
}
