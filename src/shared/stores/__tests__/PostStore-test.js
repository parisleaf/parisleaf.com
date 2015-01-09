'use strict';

import Flux from 'flummox';
import '../../constants/PostConstants';
import '../../actions/PostActions';
import '../PostStore';

describe('PostStore', () => {

  let PostConstants, PostStore, PostActions;

  beforeEach(() => {
    PostConstants = Flux.getConstants('PostConstants');
    PostStore = Flux.getStore('PostStore');
    PostActions = Flux.getActions('PostActions');
  });

  afterEach(() => {
    Flux.reset();
  })

  it('responds to POST_GET_POSTS action', () => {
    expect(PostStore.getPosts()).to.deep.equal({});

    Flux.dispatch({
      actionType: 'POST_GET_POSTS_SUCCESS',
      body: [
        {id: 1},
        {id: 2},
        {id: 3},
      ],
    });

    expect(PostStore.getPosts()).to.deep.equal({
      '1': {
        id: 1,
      },
      '2': {
        id: 2,
      },
      '3': {
        id: 3,
      },
    });
  });

  it('responds to POST_GET_POST_BY_SLUG action', () => {
    expect(PostStore.getPosts()).to.deep.equal({});

    Flux.dispatch({
      actionType: 'POST_GET_POST_BY_SLUG_SUCCESS',
      body: {id: 1},
    });

    expect(PostStore.getPosts()).to.deep.equal({
      '1': {
        id: 1,
      },
    });
  });
});
