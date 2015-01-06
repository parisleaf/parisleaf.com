# Based on https://github.com/sass/libsass/wiki/Building-with-autotools

# Install dependencies
# Commented out because we're doing this in Dockerfile
# apt-get install automake libtool

# Fetch sources
git clone https://github.com/sass/libsass.git
git clone https://github.com/sass/sassc.git libsass/sassc

# Create configure script
cd libsass
autoreconf --force --install
cd ..

# Create custom makefiles for **shared library**, for more info read:
# 'Difference between static and shared libraries?' before installing libsass  http://stackoverflow.com/q/2649334/802365
cd libsass
autoreconf --force --install
./configure \
  --disable-tests \
  --enable-shared \
  --prefix=/usr
cd ..

# Build the library
make -C libsass -j5

# Install the library
sudo make -C libsass -j5 install
