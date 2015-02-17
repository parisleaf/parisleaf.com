'use strict';

import userAgentToMediaState from '../userAgentToMediaState';

describe('userAgentToMediaState', () => {

  it('works for iPhone 4', () => {
    let ua = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5';

    expect(userAgentToMediaState(ua)).to.deep.equal({
      s: false,
      m: false,
      l: false,
      xl: false,
    });
  });

  it('works for iPhone 6', () => {
    let ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';

    expect(userAgentToMediaState(ua)).to.deep.equal({
      s: false,
      m: false,
      l: false,
      xl: false,
    });
  });

  it('works for iPhone', () => {
    let ua = 'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36';

    expect(userAgentToMediaState(ua)).to.deep.equal({
      s: false,
      m: false,
      l: false,
      xl: false,
    });
  });

  it('works for iPad', () => {
    let ua = 'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5';

    expect(userAgentToMediaState(ua)).to.deep.equal({
      s: true,
      m: true,
      l: false,
      xl: false,
    });
  });

  it('works for Mac', () => {
    let ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36 1';

    expect(userAgentToMediaState(ua)).to.deep.equal({
      s: true,
      m: true,
      l: true,
      xl: false,
    });
  });

  it('works for Windows', () => {
    let ua = 'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.12 Safari/535.11';

    expect(userAgentToMediaState(ua)).to.deep.equal({
      s: true,
      m: true,
      l: true,
      xl: false,
    });
  });

  it('returns empty object by default', () => {
    expect(userAgentToMediaState('')).to.deep.equal({});
  });

});
