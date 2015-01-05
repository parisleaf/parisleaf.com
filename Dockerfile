FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y build-essential curl git

RUN git clone https://github.com/creationix/nvm.git /.nvm
RUN /bin/bash -c "source /.nvm/nvm.sh && nvm install 0.11.14 && \
    nvm default 0.11.14 && \
    ln -s /.nvm/v0.11.14/bin/node /usr/bin/node && \
    ln -s /.nvm/v0.11.14/bin/npm /usr/bin/npm"

WORKDIR /app
ADD . /app

RUN npm install

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE $PORT

CMD npm start
