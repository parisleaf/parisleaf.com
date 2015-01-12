'use strict';

import posts from './posts';
import menus from './menus';

export default function(app) {
  posts(app);
  menus(app);
}
