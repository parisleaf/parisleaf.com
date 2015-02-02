'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

export default class TweetStore extends Store {

  constructor(flux) {
    super();

    this.state = {
      tweets: Immutable.Map(),
    };

    let tweetActionIds = flux.getActionIds('tweets');

    this.register(tweetActionIds.getTweets, this.handleGetTweets);
    this.register(tweetActionIds.getTweetById, this.handleGetSingleTweet);
  }

  handleGetTweets(newTweets) {
    newTweets = newTweets.reduce((result, tweet) => {
      if (tweet) {
        result[tweet.id_str] = tweet;
      }

      return result;
    }, {});

    this.setState({
      tweets: this.state.tweets.merge(newTweets),
    });
  }

  handleGetSingleTweet(newTweet) {
    if (!newTweet) return;

    newTweet = Immutable.fromJS(newTweet);

    this.setState({
      tweets: this.state.tweets.set(newTweet.get('id_str'), newTweet),
    });
  }

  getTweets() {
    return this.state.tweets.toList();
  }

  getTweetById(id) {
    return this.state.tweets.get(id);
  }
}
