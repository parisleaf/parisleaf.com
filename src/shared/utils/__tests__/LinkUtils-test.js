'use strict';
import isNode from 'detect-node';
import url from 'url';

describe('LinkUtils', () => {

  describe('.ensureIsomorphicUrl()', () => {
    import { ensureIsomorphicUrl } from '../LinkUtils';

    let initialPort;

    before(() => {
      initialPort = process.env.PORT;
      process.env.PORT = 1234;
    });

    after(() => {
      if (initialPort) process.env.PORT = initialPort;
    });

    if (isNode) {
      it('uses localhost as hostname, if none given', () => {
        expect(ensureIsomorphicUrl('/foo/bar')).to.equal('http://localhost:1234/foo/bar');
        expect(ensureIsomorphicUrl('http://baz.com/foo/bar')).to.equal('http://baz.com/foo/bar');
      });

      it('uses `process.env.PORT` as port', () => {
        expect(url.parse(ensureIsomorphicUrl('/foo/bar')).port).to.equal('1234');
      });
    } else {
      it('returns url as is', () => {
        expect(ensureIsomorphicUrl('/foo/bar')).to.equal('/foo/bar');
        expect(ensureIsomorphicUrl('http://baz.com/foo/bar')).to.equal('http://baz.com/foo/bar');
      });
    }
  });

  describe('.rootUrl()', () => {
    import { rootUrl } from '../LinkUtils';

    if (isNode) {
      it('uses localhost and port to form url', () => {
        let initialPort = process.env.PORT;
        process.env.PORT = 1234;

        expect(rootUrl()).to.equal('http://localhost:1234');

        if (initialPort) process.env.PORT = initialPort;
      });

      it('omits port if `process.env.PORT` is not set', () => {
        let initialPort = process.env.PORT;
        delete process.env.PORT;

        expect(rootUrl()).to.equal('http://localhost');

        if (initialPort) process.env.PORT = initialPort;
      });
    }
  });

  describe('.isLocalUrl()', () => {
    import { isLocalUrl } from '../LinkUtils';

    it('returns true if url does not contain a host', () => {
      expect(isLocalUrl('/foo/bar')).to.be.true;
      expect(isLocalUrl('../foo/bar')).to.be.true;
      expect(isLocalUrl('foo/bar')).to.be.true;
      expect(isLocalUrl('//google.com')).to.be.false;
    });

    it('returns true if host matches rootUrl', () => {
      import { rootUrl } from '../LinkUtils';
      import { rootUrl } from '../LinkUtils';

      expect(isLocalUrl(`${rootUrl()}/foo/bar`)).to.be.true;
      expect(isLocalUrl(`http://${url.parse(rootUrl()).host}/foo/bar`)).to.be.true;
      expect(isLocalUrl('https://google.com')).to.be.false;
    });

  });

  describe('.isWPUrl()', () => {
    import { isWPUrl } from '../LinkUtils';

    it('returns true if host matches `process.env.WP_ENDPOINT`', () => {
      expect(isWPUrl('/foo/bar')).to.be.false;
      expect(isWPUrl(`${process.env.WP_ENDPOINT}/foo/bar`)).to.be.true;
      expect(isWPUrl(`http://${url.parse(process.env.WP_ENDPOINT).host}`)).to.be.true;
      expect(isWPUrl(`http://${url.parse(process.env.WP_ENDPOINT).host}/foo/bar`)).to.be.true;
      expect(isWPUrl('https://google.com')).to.be.false;
    });

    it('returns false if process.env.WP_ENDPOINT is undefined', () => {
      let initialEndpoint = process.env.WP_ENDPOINT;
      process.env.WP_ENDPOINT = undefined;

      expect(isWPUrl('/foo/bar')).to.be.false;

      process.env.WP_ENDPOINT = initialEndpoint;
    });

    it('returns false if url is inside `wp-content`', () => {
      expect(isWPUrl(`http://${url.parse(process.env.WP_ENDPOINT).host}/wp-content`)).to.be.false;
      expect(isWPUrl(`http://${url.parse(process.env.WP_ENDPOINT).host}/foo/bar/wp-content`)).to.be.true;
    });

  });

  describe('.removeHost()', () => {
    import { removeHost } from '../LinkUtils';

    it('removes host from url', () => {
      expect(removeHost('https://google.com/foo?bar=baz')).to.equal('/foo?bar=baz');
      expect(removeHost('//google.com/foo?bar=baz')).to.equal('/foo?bar=baz');
      expect(removeHost('/foo?bar=baz')).to.equal('/foo?bar=baz');
      expect(removeHost('foo?bar=baz')).to.equal('foo?bar=baz');
    });
  });

  describe('.removeTrailingSlash', () => {
    import { removeTrailingSlash } from '../LinkUtils';

    it('removes the trailing slash from the end of urls if it exists', () => {
      expect(removeTrailingSlash('https://google.com/work')).to.equal('https://google.com/work');
      expect(removeTrailingSlash('https://google.com/work/')).to.equal('https://google.com/work');
      expect(removeTrailingSlash('/foo?bar=baz')).to.equal('/foo?bar=baz');
      expect(removeTrailingSlash('/')).to.equal('/');

    });
  });

  describe('.normalizeUrl', () => {
    import { normalizeUrl, rootUrl } from '../LinkUtils';

    it('removes host from local urls', () => {
      expect(normalizeUrl(`${rootUrl()}/foo/bar`)).to.equal('/foo/bar');
    });

    it('removes host from WP urls', () => {
      expect(normalizeUrl(`http://${url.parse(process.env.WP_ENDPOINT).host}/foo/bar`)).to.equal('/foo/bar');
    });

    it('does nothing to external, non-WP urls', () => {
      expect(normalizeUrl('http://google.com/foo/bar')).to.equal('http://google.com/foo/bar');
    });

    it('ensures local links have no trailing slash', () => {
      expect(normalizeUrl('/foo/bar')).to.equal('/foo/bar');
      expect(normalizeUrl(`${rootUrl()}/foo/bar/`)).to.equal('/foo/bar');
      expect(normalizeUrl('http://google.com/')).to.equal('http://google.com/');
    });
  });

});
