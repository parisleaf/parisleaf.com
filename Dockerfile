FROM parisleaf/parisleaf.com-base-image:latest

WORKDIR /app
ADD . /app

RUN npm install

ENV NODE_ENV production
ENV PORT 8080
EXPOSE $PORT

CMD npm start
