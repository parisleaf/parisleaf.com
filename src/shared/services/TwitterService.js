'use strict';

import { ensureIsomorphicUrl } from '../utils/LinkUtils';
import request from 'superagent';

export async function getTweets(query = {}) {
  let tweets = await request.get(ensureIsomorphicUrl('/api/tweets')).query(query).exec();
  return tweets.body;
}


export async function getTweetById(id, query = {}) {
  if (typeof id !== 'string') {
    throw new Error('id must be a string');
  }

  let tweets = await request.get(ensureIsomorphicUrl(`/api/tweets/${id}`)).query(query).exec();
  return tweets.body;
}
