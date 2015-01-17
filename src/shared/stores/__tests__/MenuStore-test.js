'use strict';

import Immutable from 'immutable';
import Flux from 'flummox';
import '../../constants/MenuConstants';
import '../../actions/MenuActions';
import '../MenuStore';

describe('MenuStore', () => {

  let MenuConstants, MenuStore, MenuActions;

  beforeEach(() => {
    MenuConstants = Flux.getConstants('MenuConstants');
    MenuStore = Flux.getStore('MenuStore');
    MenuActions = Flux.getActions('MenuActions');
  });

  afterEach(() => {
    Flux.reset();
  });

  describe('#getMenus()', () => {
    it('returns a list of menus', () => {
      let menus = Immutable.fromJS({
        foo: {
          slug: 'foo',
        },
        bar: {
          slug: 'bar',
        },
        baz: {
          slug: 'baz',
        },
      });

      MenuStore.menus = menus;

      expect(MenuStore.getMenus().toJS()).to.deep.equal([
        { slug: 'foo' },
        { slug: 'bar' },
        { slug: 'baz' },
      ]);
    });
  });
  describe('responds to Flux action', () => {
    it('MENU_GET_MENUS', () => {
      expect(MenuStore.getMenus().toJS()).to.deep.equal([]);

      Flux.dispatch({
        actionType: 'MENU_GET_MENUS_SUCCESS',
        body: [
          { slug: 'foo' },
          { slug: 'bar' },
          { slug: 'baz' },
        ],
      });

      expect(MenuStore.getMenus().toJS()).to.deep.equal([
        { slug: 'foo' },
        { slug: 'bar' },
        { slug: 'baz' },
      ]);
    });
  });
});
