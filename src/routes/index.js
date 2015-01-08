'use strict';

import middleware from './middleware';
import api from './api';
import appIndex from './views/appIndex';

export default function(app) {
  middleware(app);
  api(app);
  appIndex(app);
}
