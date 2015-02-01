'use strict';

import Flummox from 'flummox2';

import PostActions from './actions/PostActions';
import PostStore from './stores/PostStore';

export default class Flux extends Flummox {

  constructor() {
    super();

    this.createActions('posts', PostActions);
    this.createStore('posts', PostStore, this);
  }

}
