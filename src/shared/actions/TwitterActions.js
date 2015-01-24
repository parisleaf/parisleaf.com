'use strict';

import Flux from 'flummox';
import TwitterService from '../services/TwitterService';

let TwitterConstants = Flux.getConstants('TwitterConstants');

Flux.createActions({

  name: 'TwitterActions',

  serviceActions: {
    getTweets: [TwitterConstants.TWITTER_GET_TWEETS, function(...args) {
      return TwitterService.getTweets(...args);
    }],

    getTweetById: [TwitterConstants.TWITTER_GET_TWEET_BY_ID, function(...args) {
      return TwitterService.getTweetById(...args);
    }],
  },

});
