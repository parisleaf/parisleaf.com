'use strict';

import Flux from 'flummox';

Flux.createConstants({ 
  name: 'TwitterConstants',

  serviceActionTypes: [
    'TWITTER_GET_TWEETS',
    'TWITTER_GET_TWEET_BY_ID',
  ],
});
