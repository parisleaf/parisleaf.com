'use strict';

import posts from './posts';
import pages from './pages';
import menus from './menus';
import tweets from './tweets';

export default function(app) {
  posts(app);
  pages(app);
  menus(app);
  tweets(app);
}
