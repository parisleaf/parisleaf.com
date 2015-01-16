'use strict';

/**
 * Interface to the Twitter API
 */

import Twit from 'twit';

let T;

if (
  process.env.TWIT_CONSUMER_KEY
  && process.env.TWIT_CONSUMER_SECRET
  && process.env.TWIT_ACCESS_TOKEN
  && process.env.TWIT_ACCESS_TOKEN_SECRET
) {
  T = new Twit({
     consumer_key: process.env.TWIT_CONSUMER_KEY,
     consumer_secret: process.env.TWIT_CONSUMER_SECRET,
     access_token: process.env.TWIT_ACCESS_TOKEN,
     access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET,
  });
}

export default T;
