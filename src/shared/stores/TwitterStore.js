'use strict';

import Flux from 'flummox';
import Immutable from 'immutable';
let TwitterConstants = Flux.getConstants('TwitterConstants');

Flux.createStore({
  name: 'TwitterStore',

  initialize() {
    this.tweets = Immutable.Map();
  },

  actions: [
    [TwitterConstants.TWITTER_GET_TWEETS_SUCCESS, function(tweets) {
      tweets = tweets.reduce((result, tweet) => {
        if (tweet.id_str) {
          result[tweet.id_str] = tweet;
        }

        return result;
      }, {});

      this.tweets = this.tweets.merge(tweets);
      this.emit('change');
    }],

    [TwitterConstants.TWITTER_GET_TWEET_BY_ID_SUCCESS, function(tweet) {
      if(tweet.id_str) {
        tweet = Immutable.fromJS(tweet);
        this.tweets = this.tweets.set(tweet.get('id_str'), tweet);
      }

      this.emit('change');
    }],
  ],

  getTweets() {
    return this.tweets.toList();
  },

  getTweetById(id) {
    return this.tweets.get(id);
  }
});
