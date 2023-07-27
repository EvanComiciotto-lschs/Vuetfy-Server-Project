# Choose the Image which has Node installed already
FROM node:latest
EXPOSE 3000
RUN apt-get -qq update && apt-get -q -y install git npm
WORKDIR /srv/
ENV VERSION = 669500808 2.8
RUN git clone https://github.com/EvanComiciotto-lschs/Vuetfy-Server-Project.git
WORKDIR /srv/Vuetfy-Server-Project/Backend-main/src
COPY package.json ./
RUN npm install cors --save
RUN npm install jsonwebtoken --save
RUN npm install express --save
RUN npm install  
CMD ["node", "testServer.js"]

