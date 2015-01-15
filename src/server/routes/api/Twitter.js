'use strict';

import Twit from 'twit';

/* Twitter interface to the api */
let T = new Twit({ 
   consumer_key: process.env.TWIT_CONSUMER_KEY,
   consumer_secret: process.env.TWIT_CONSUMER_SECRET,
   access_token: process.env.TWIT_ACCESS_TOKEN,
   access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
   }); 
export default T;
