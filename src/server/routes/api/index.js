'use strict';

import posts from './posts';
import pages from './pages';
import menus from './menus';

export default function(app) {
  posts(app);
  pages(app);
  menus(app);
}
