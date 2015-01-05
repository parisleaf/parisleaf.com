[![build status](https://img.shields.io/travis/parisleaf/parisleaf.com.svg?style=flat-square)](https://travis-ci.org/parisleaf/parisleaf.com)

# parisleaf.com

The new parisleaf.com, currently at beta.parisleaf.com.

## Architecture

The front-end is a [koa](https://github.com/koajs/koa) app running on node v0.11, with the harmony flag enabled.

Content is fetched from an external WordPress application using [WP-API](http://wp-api.org/). That project can be found at [parisleaf/wp.parisleaf.com](https://github.com/parisleaf/wp.parisleaf.com).


### React

[React](https://github.com/facebook/react) is compiled server-side and then resumed on the client.


### browserify (CommonJS)

JavaScript is organized into CommonJS modules and bundled with [browserify](http://browserify.org/) for the browser.

### react-router

Routing is handled with react-router. Combined with Browserify and server-side rendering, this enables us to write isomorphic JavaScript. Learn more about [isomorphic JavaScript applications](http://isomorphic.net/).

### 6to5

JavaScript files in `src` are compiled with 6to5. This lets us use ES6 features like arrow functions and class syntax in today's JavaScript environments. 6to5 also handles React JSX transformation.

### libsass

Stylesheets are compiled using node-sass, a wrapper around the libsass project. There is a bug with the latest versions of node-sass on node v0.11+, which is unsupported due to it being a preview release. Because the stable v0.12 release is imminent, we will continue to use an older version of node-sass until then.

## Building

Run `make build` (or just `make`) to build the application. Running make again will cause only files with updated dependencies to rebuild.

Run `make watch` to watch for changes and rebuild.

If it's the first build, you can run `make fast-build`. This will build the application more quickly, but it won't check for changes — it runs every time. On subsequent builds, use `make build`.

## Deployment
