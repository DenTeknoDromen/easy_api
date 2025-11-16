FROM node:latest

WORKDIR /usr/app

COPY . $WORKDIR

RUN npm install

CMD [npm, start] 

EXPOSE 4000