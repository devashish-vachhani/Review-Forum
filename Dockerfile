FROM node@sha256:8b2c008211854f4ee9ca328910d1c6bff8f30fc9fdf834b48f7ea40992a2079a

RUN apt-get update
RUN apt-get -y install wget gnupg2

WORKDIR /app/chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get -y install ./google-chrome-stable_current_amd64.deb

WORKDIR /app/cypress
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

COPY angular.json karma.conf.js tsconfig.app.json tsconfig.json tsconfig.spec.json firebase.json cypress.config.ts .nycrc .firebaserc .badge-config .babelrc README.md ./

COPY src ./src/
COPY cypress ./cypress/

CMD npm run start:ci