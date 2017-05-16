FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# zone js bug: https://github.com/angular/zone.js/issues/746
RUN npm install zone.js@0.8.7 > install-pkgs.zonejs.log

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]
