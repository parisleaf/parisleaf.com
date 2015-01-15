'use strict';

import Immutable from 'immutable';
import Flux from 'flummox';
import '../../constants/TwitterConstants';
import '../../actions/TwitterActions';
import '../TwitterStore';

describe('TwitterStore', () => {

  let TwitterConstants, TwitterStore, TwitterActions;

  beforeEach(() => {
    TwitterConstants = Flux.getConstants('TwitterConstants');
    TwitterStore = Flux.getStore('TwitterStore');
    TwitterActions = Flux.getActions('TwitterActions');
  });

  afterEach(() => {
    Flux.reset();
  });

  describe('#getTweets', () => {
    it('returns a list of tweets', () => {
      let tweets = Immutable.fromJS({
        foo: {
          id_str: 'foo',
        },
        bar: {
          id_str: 'bar',
        },
      });

      TwitterStore.tweets = tweets;

      expect(TwitterStore.getTweets().toJS()).to.deep.equal([ 
        { id_str: 'foo' },
        { id_str: 'bar' },
      ]);
    });
  });

  describe('#getTweetById', () => {
    it('returns a tweet', () => {
       let tweets = Immutable.fromJS({
        foo: {
          id_str: 'foo',
        },
        bar: {
          id_str: 'bar',
        },
      });

      TwitterStore.tweets = tweets;
      
      expect(TwitterStore.getTweetById('foo').toJS()).to.deep.equal({ id_str: 'foo' });
      expect(TwitterStore.getTweetById('bar').toJS()).to.deep.equal({ id_str: 'bar' });
      expect(TwitterStore.getTweetById('foobar')).to.be.undefined;
    });
  });
});
