'use strict';

import Flummox from 'flummox2';

import PostActions from './actions/PostActions';
import PostStore from './stores/PostStore';

import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';

export default class Flux extends Flummox {

  constructor() {
    super();

    this.createActions('posts', PostActions);
    this.createStore('posts', PostStore, this);

    this.createActions('app', AppActions);
    this.createStore('app', AppStore, this);
  }

}
