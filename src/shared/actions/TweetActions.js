'use strict';

import { Actions } from 'flummox2';
import TwitterService from '../services/TwitterService';

export default class TweetActions extends Actions {

  async getTweets(...args) {
    return await TwitterService.getTweets(...args);
  }

  async getTweetById(...args) {
    return await TwitterService.getTweetById(...args);
  }

}
