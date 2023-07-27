FROM httpd:latest
EXPOSE 80
RUN DEBIAN_FRONTEND=noninteractive apt-get -qq update && DEBIAN_FRONTEND=noninteractive apt-get -q -y install git npm
RUN sed -i 's/\# Controls who can get stuff from this server./FallbackResource \/index.html/g' /usr/local/apache2/conf/httpd.conf
WORKDIR /srv/
ENV VERSION = RANDOM_NUM
RUN git clone https://github.com/EvanComiciotto-lschs/Vuetfy-Server-Project.git
WORKDIR /srv/Vuetfy-Server-Project/vuetify-front-end-main/
RUN npm install && npm install axios && npm install vue-router@4 && npm install vue-router && npm run build
RUN mv /srv/Vuetfy-Server-Project/vuetify-front-end-main/dist/* /usr/local/apache2/htdocs/
WORKDIR /usr/local/apache2/htdocs/