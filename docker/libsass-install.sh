cd /usr/local/lib/

git clone https://github.com/sass/sassc.git
git clone https://github.com/sass/libsass.git

# Initialize and update the submodule sass2scss…
cd libsass/
git submodule update –-init

export SASS_LIBSASS_PATH=/usr/local/lib/libsass

cd /usr/local/lib/sassc/
make

cd /usr/local/bin/
ln -s ../lib/sassc/bin/sassc sassc
