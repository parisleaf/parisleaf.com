'use strict';

import WP from 'wordpress-rest-api';

let wp = new WP({
  endpoint: process.env.WP_ENDPOINT,
  username: process.env.WP_USER,
  password: process.env.WP_PASSWORD,
});

export default wp;
