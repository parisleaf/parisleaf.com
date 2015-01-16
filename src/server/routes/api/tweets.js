'use strict';

import T from './Twitter';

export default function(app) {
  app.get('/api/tweets', function *() {
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
