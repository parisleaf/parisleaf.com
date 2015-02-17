BABEL_CMD = node_modules/.bin/babel
MOCHA_CMD = node_modules/.bin/mocha
WEBPACK_CMD = node_modules/.bin/webpack
SASS_CMD = sassc
WATCH_CMD = node_modules/.bin/watch
AUTOPREFIXER_CMD = node_modules/.bin/autoprefixer
SVG_SPRITE_CMD = svg-sprite
CLEANCSS_CMD = node_modules/.bin/cleancss
JSON_SASS_CMD = node_modules/.bin/json-sass

BABEL_ARGS = --experimental --external-helpers --source-maps-inline --blacklist regenerator,es6.blockScoping --optional asyncToGenerator
BROWSERIFY_ARGS = -t [ babelify $(BABEL_ARGS) ] -t envify

SRC_JS = $(shell find src -name "*.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

# Build application
build: build-dev minify-css

build-dev: js webpack css

# Test
test: js
	@NODE_ENV=test $(MOCHA_CMD) --harmony --require lib/test-init.js lib/{server,shared}/**/__tests__/*-test.js

# Build application quickly
# Faster on first build, but not after that
fast-build: fast-js build

# Watch for changes
watch: minify-css
	@NODE_ENV=development $(MAKE) -j3 dev-server watch-css watch-js

dev-server:
	node ./lib/server/watch

# Clean up
clean:
	rm -rf lib
	rm -rf public/js/
	rm -rf public/css/
	rm -f sass/_theme.scss

browserify: public/js/app.js

webpack: public/js/app.js

public/js/app.js: $(SRC_JS)
	$(WEBPACK_CMD)

styleguide: public/js/styleguide.js

public/js/styleguide.js: $(SRC_JS)
	@NODE_ENV=production mkdir -p $(dir $@) && $(BROWSERIFY_CMD) src/client/styleguide.js -o $@ $(BROWSERIFY_ARGS)

# Transpile JavaScript using Babel
js: $(LIB_JS)

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@) && $(BABEL_CMD) $< -o $@ $(BABEL_ARGS)

fast-js:
	$(BABEL_CMD) src -d lib $(BABEL_ARGS)

watch-js:
	$(BABEL_CMD) src -d lib $(BABEL_ARGS) -w

# Compile Sass
css: public/css/app.css

minify-css: css public/css/app.min.css

public/css/app.css: sass/app.sass theme
	mkdir -p $(dir $@) && $(SASS_CMD) -m $< | $(AUTOPREFIXER_CMD) > $@

public/css/app.min.css: public/css/app.css
	$(CLEANCSS_CMD) $< > $@

watch-css:
	$(WATCH_CMD) "mkdir -p public/css && $(SASS_CMD) -m sass/app.sass | $(AUTOPREFIXER_CMD) > public/css/app.css" sass

theme: sass/dependencies/_theme.scss

sass/dependencies/_theme.scss: lib/shared/theme.js
	mkdir -p $(dir $@) && $(JSON_SASS_CMD) -i $< \
	| sed '1s/^/$$theme: /' \
	> $@

icons: views/icon-sprite.svg

ICON_SVGS = $(shell find icons -name "*.svg")
views/icon-sprite.svg: $(ICON_SVGS)
	$(SVG_SPRITE_CMD) --symbol --symbol-inline --symbol-dest=views --symbol-prefix="icon-" --symbol-sprite="./icon-sprite.svg" icons/*.svg

.PHONY: build build-dev fast-build test watch clean browserify watchify js
.PHONY: fast-js watch-js uglify-js css minify-css watch-css theme browser-sync
.PHONY: icons
